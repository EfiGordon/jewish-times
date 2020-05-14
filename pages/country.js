import HomeLayout from '../components/layout'
import styles from './country.module.css';
import Link from 'next/link'
import { Row, Col, Typography } from 'antd';
const { Title } = Typography;
import MyPageHeader from '../components/MyPageHeader';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { getCitiesByCountryCode } from '../lib/data/cities';
import { getCountryNameByCountryCode } from '../lib/data/countries';
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

    }, [countryCode])

    useEffect(() => {
        if (countryCode) setCountryName(getCountryNameByCountryCode(countryCode))
    }, [cities])

    useEffect(() => {
        if (!countryName) return;
        setFlagPath(`/images/country-flags/${countryName.split(' ').join('-').toLowerCase()}.svg`)
    }, [countryName])

    const style = {
        background: '#fafafa',
        padding: '8px 0',
        textAlign: 'center',
        color: 'red'
    };

    return (
        <HomeLayout className={styles.Card} home={false} titleName={countryName}>
            {isLoading && <h3>LOADING...</h3>}
            <MyPageHeader
                flagPath={flagPath}
                countryName={countryName}
                subTitle="Please select your nearest city"
                countryCode={countryCode} />
            <Row gutter={[16, 16]}>
                {
                    cities.map(city => {
                        return (
                            <Col span={12} key={city}>
                                <div style={style}>
                                    <Title level={3}>
                                        <Link href={`/city/${countryCode}-${city}-on-${dateString}`}>
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