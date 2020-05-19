
import { getCitiesPath } from '../../lib/data/cities';
import HomeLayout from '../../components/layout'
import styles from './[id].module.css';
import MyCity from '../../components/myCity';
import { addFetchedDataToTable } from '../../lib/addFetchedDataToTable';
import { getFlagPathByCountryCode } from '../../lib/utils';
import Head from 'next/head'
const axios = require('axios');

export default function City({ tableData, countryName, flagPath, cityName, countryCode, error }) {
    if (error) {
        return (<p>SOME ERROR...</p>)
    }
    return (
        <HomeLayout className={styles.Card} home={false}>
            <Head>
                <title>{`${cityName} Jewish Times`}</title>
            </Head>
            <MyCity countryCode={countryCode} tableData={tableData} countryName={countryName} flagPath={flagPath} cityName={cityName} date={[new Date().getFullYear(), new Date().getMonth(), new Date().getDate()].join('-')} />
        </HomeLayout >
    )
}

export async function getStaticPaths() {
    const paths = getCitiesPath();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    let tableData, countryName, flagPath, cityName, countryCode;

    const res = await axios.get(encodeURI(process.env.FETCH_CITIES_API + '?customTitle=' + params.id));

    if (res.data.res.length === 0 || res.data.error) {
        return {
            props: {
                error: 'yes'
            }
        }
        throw new Error('some fetching error');
    }

    countryName = res.data.res[0].location.country;
    cityName = res.data.res[0].location.city;
    countryCode = params.id.split('-')[0];
    flagPath = getFlagPathByCountryCode(countryCode);
    tableData = addFetchedDataToTable(res.data.res[0]);


    return {
        props: {
            countryName,
            cityName,
            countryCode,
            flagPath,
            tableData
        }
    }

}
