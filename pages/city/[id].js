const { format } = require('date-fns');
const axios = require('axios');

import { NextSeo } from 'next-seo';

import { getCitiesPath } from '../../lib/data/cities';
import { getFlagPathByCountryCode, generateJsonLdScript } from '../../lib/utils';
import { addFetchedDataToTable } from '../../lib/addFetchedDataToTable';

import Head from 'next/head'
import styles from './[id].module.css';

import HomeLayout from '../../components/layout'
import MyCity from '../../components/myCity';

export default function City({ tableData, countryName, flagPath, cityName, countryCode, error, date, jsonLdScript }) {
    if (error) {
        return (<p>SOME ERROR...</p>)
    }
    return (
        <HomeLayout className={styles.Card} home={false} siteTitle={countryName}>
            <Head>
                <title>{`${cityName} Jewish Times ${date}`}</title>
            </Head>
            <NextSeo />
            <MyCity countryCode={countryCode} tableData={tableData} countryName={countryName} flagPath={flagPath} cityName={cityName} date={[new Date().getFullYear(), new Date().getMonth(), new Date().getDate()].join('-')} />

            {jsonLdScript.map((event) => {
                if (!event) return;
                return (
                    <script
                        key={`eventJSON-${event.name}-${event.startDate}`}
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }}
                    />
                )
            })}
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
    let tableData, countryName, flagPath, cityName, countryCode, date;
    const splitedParams = params.id.split('-');

    const res = await axios.get(encodeURI(process.env.FETCH_CITIES_API + '?customTitle=' + params.id));

    if (res.data.res.length === 0 || res.data.error || res.data.res.error) {
        return {
            props: {
                error: 'yes'
            }
        }
        throw new Error('some fetching error');
    }

    countryName = res.data.res[0].location.country;
    cityName = res.data.res[0].location.city;
    countryCode = splitedParams[0];
    date = splitedParams.slice(splitedParams.length - 3).join('-');
    date = format(new Date(date), 'do MMM R');
    flagPath = getFlagPathByCountryCode(countryCode);

    const events = res.data.res[0].items.filter((item) => {
        return item.category !== 'parashat'
    });

    tableData = addFetchedDataToTable(events);
    let jsonLdScript = generateJsonLdScript(events, res.data.res[0].location);

    const props = {
        countryName,
        cityName,
        countryCode,
        flagPath,
        tableData,
        date,
        jsonLdScript
    };

    return {
        props
    }

}
