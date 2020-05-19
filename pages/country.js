import HomeLayout from '../components/layout'
import styles from './country.module.css';
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col, Typography, PageHeader } from 'antd';
const { Title } = Typography;
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { getCitiesByCountryCode } from '../lib/data/cities';
import { getCountryNameByCountryCode } from '../lib/data/countries';
import { getFlagPathByCountryCode } from '../lib/utils';
function Country() {
    const [countryCode, setCountryCode] = useState();
    const [countryName, setCountryName] = useState();
    const [cities, setCities] = useState([]);
    const [flagPath, setFlagPath] = useState('');
    const dateString = new Date().toISOString().slice(0, 10);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setCountryCode(router.asPath.split('=')[1]);
    }, [])

    useEffect(() => {
        if (!countryCode) return;
        setCities(getCitiesByCountryCode(countryCode))
        setFlagPath(getFlagPathByCountryCode(countryCode))

    }, [countryCode])

    useEffect(() => {
        if (countryCode) setCountryName(getCountryNameByCountryCode(countryCode))
    }, [cities])


    const style = {
        background: '#fafafa',
        padding: '8px 0',
        textAlign: 'center',
        color: 'red'
    };

    return (
        <HomeLayout className={styles.Card} home={false} titleName={countryName}>
            <Head>
                <title>{`${countryName} Jewish Times`}</title>
            </Head>
            {isLoading && <h3>LOADING...</h3>}
            <PageHeader
                onBack={() => {
                    if (router.asPath.includes('/city')) {
                        router.push('/country', '/country?countryCode=' + countryCode);
                    } else {
                        router.push('/');
                    }
                }}
                title={countryName + " Jewish times"}
                subTitle={"Please select your nearest city"}
                avatar={{
                    src: flagPath,
                    alt: "Please select your nearest city",
                    onError: () => {
                        console.log('avatar error - not the movie');
                    }
                }}

            />
            <Row gutter={[16, 16]}>
                {
                    cities.map(city => {
                        return (
                            <Col span={12} key={city}>
                                <div style={style}>
                                    <Title level={3}>
                                        <Link href={`/city/${city}-on-${dateString}`}>
                                            <a>
                                                {city}
                                            </a>
                                        </Link>
                                    </Title>
                                </div> </Col>
                        )
                    })
                }
            </Row>
        </HomeLayout >
    )
}

export default Country;