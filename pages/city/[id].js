const { format } = require('date-fns');
const axios = require('axios');

import { NextSeo } from 'next-seo';

import { getCitiesPath } from '../../lib/data/cities';
import { getFlagPathByCountryCode, generateJsonLdScript, extractPageTitleToObject } from '../../lib/utils';
import { addFetchedDataToTable } from '../../lib/addFetchedDataToTable';

import Head from 'next/head'
import styles from './[id].module.css';

import HomeLayout from '../../components/layout'
import MyCity from '../../components/myCity';

export default function City({ tableData, countryName, flagPath, cityName, countryCode, date, jsonLdScript }) {
    if (!tableData || !jsonLdScript) {
        return (
            <HomeLayout className={styles.Card} home={false} siteTitle={countryName}>
                <NextSeo />
                <p>Loading Data...</p>
            </HomeLayout >
        )
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
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    let tableData, countryName, flagPath, cityName, countryCode, date;
    const splitedParams = params.id.split('-');

    const title = extractPageTitleToObject(params.id);

    const res = await axios.get(encodeURI(`https://www.hebcal.com/shabbat/?cfg=json&geo=city&city=${title.city}&gy=${title.gy}&gm=${title.gm}&gd=${title.gd}`));


    countryName = res.data.location.country;
    cityName = res.data.location.city;
    countryCode = title.city.split('-')[0];
    date = splitedParams.slice(splitedParams.length - 3).join('-');
    date = format(new Date(date), 'do MMM R');
    flagPath = getFlagPathByCountryCode(countryCode);

    // const events = res.data.items.filter((item) => {
    //     return item.category !== 'parashat'
    // });
    const events = res.data.items;
    tableData = addFetchedDataToTable(events);

    let jsonLdScript = generateJsonLdScript(events, res.data.location);
    const error = true;
    const props = {
        countryName,
        cityName,
        countryCode,
        flagPath,
        tableData,
        date,
        jsonLdScript,
        error
    };

    return {
        props
    }

}
