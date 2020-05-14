
import { getCitiesPath } from '../../lib/data/cities';
import HomeLayout from '../../components/layout'
import axios from 'axios';
import styles from './[id].module.css';
import MyCity from '../../components/myCity';
import { addFetchedDataToTable } from '../../lib/addFetchedDataToTable';

export default function City({ tableData, countryName, flagPath, cityName, countryCode }) {
    return (
        <HomeLayout className={styles.Card} home={false} titleName='Temp Title Name'>
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
    const [city, date] = params.id.split('-on-');
    const dateArray = date.split('-');
    const res = await axios.get(`https://www.hebcal.com/shabbat/?cfg=json&geo=city&city=${city}&gy=${dateArray[0]}&gm=${dateArray[1]}&gd=${dateArray[2]}`)//${params.id} //e.g //params.id
    const tableData = addFetchedDataToTable(res);
    const countryName = res.data.location.country;
    const flagPath = `/images/country-flags/${countryName.split(' ').join('-').toLowerCase()}.svg`;
    const cityName = res.data.location.city;
    const countryCode = city.split('-')[0];
    return {
        props: {
            tableData,
            countryName,
            flagPath,
            cityName,
            countryCode
        }
    }

}
