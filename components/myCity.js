
import { DatePicker, PageHeader } from 'antd';
import MyTable from './myTable';
import { useState } from 'react';

import { useRouter } from 'next/router'

const MyCity = (props) => {
    const [date, setDate] = useState('');
    const router = useRouter()

    const handleClick = (e, href) => {
        e.preventDefault()
        router.push(href)
    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setDate(dateString);
        console.log({
            routerAsPath: router.asPath,
            router: router
        });

        const href = router.asPath.slice(0, router.asPath.length - '0000-00-00'.length) + dateString;
        handleClick(event, href);
    }



    const getDay = () => {
        const path = router.asPath;

    }

    return (
        <div>
            <PageHeader
                onBack={() => {
                    if (router.asPath.includes('/city')) {
                        router.push('/country', '/country?countryCode=' + props.countryCode);
                    } else {
                        router.push('/');
                    }
                }}
                title={`${props.cityName}, ${props.countryName}`}
                subTitle={""}
                avatar={{
                    src: props.flagPath,
                    alt: `${props.countryName} Flag`,
                    onError: () => {
                        console.log('avatar error - not the movie');
                    }
                }}

            />

            <style jsx>
                {`  
                .Space {
                    padding: 5px;
                    margin-bottom: 5px;
                    margin-top:5px;
                }
                `}
            </style>
            <div>
                <DatePicker onChange={onChange} className='Space' />
                <MyTable
                    config=
                    {
                        {
                            data: props.tableData,
                            pagination: false,
                            isTableLoading: props.isTableLoading
                        }
                    }
                />
            </div>
        </div>
    )
}

export default MyCity;