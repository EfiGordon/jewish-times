
import { getCitiesPath } from '../../lib/data/cities';
import HomeLayout from '../../components/layout'
import axios from 'axios';
import styles from './[id].module.css';
import MyCity from '../../components/myCity';
import { addFetchedDataToTable } from '../../lib/addFetchedDataToTable';
import { getFlagPathByCountryCode } from '../../lib/utils';


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

const connect = async (params, city) => {
    console.log('b')
    return new Promise((resolve, reject) => {
        console.log('c')
        const MongoClient = require('mongodb').MongoClient;
        const mongo_url = process.env.MONGO_URL;
        const dbName = 'test';

        const client = new MongoClient(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });// Create a new MongoClient
        console.log('d')
        client.connect(async (err) => {
            console.log('e')
            console.log("Connected successfully to mongo server");
            const db = client.db(dbName);
            const collection = db.collection('cities'); // Get the documents collection

            collection.findOne({
                customTitle: params.id
            })
                .then((res) => {
                    if (res) {
                        let tableData = addFetchedDataToTable(res);
                        let countryName = res.location.country;
                        let countryCode = city.split('-')[0];
                        let flagPath = getFlagPathByCountryCode(countryCode);
                        let cityName = res.location.city;

                        resolve({
                            tableData: tableData,
                            countryName: countryName,
                            flagPath: flagPath,
                            cityName: cityName,
                            countryCode: countryCode
                        });

                    } else {
                        throw new Error('No such documemt at collection :: ' + params.id)
                    }


                })
                .catch(err => {
                    console.log({
                        err: err
                    })
                })
        });
    })

}


export async function getStaticProps({ params }) {
    const [city, date] = params.id.split('-on-');
    console.log('a')
    const props = await connect(params, city);
    return {
        props
    }

}
