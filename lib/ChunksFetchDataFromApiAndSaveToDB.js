const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://zmanim:Oni5xsqBqbSWzoGN@cluster0-0lu1d.gcp.mongodb.net/prod?retryWrites=true&w=majority';// Connection URL
const dbName = 'prod';// Database Name
const axios = require('axios');
const { cities, getDates } = require('./data/citiesNodeSyntax');

const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'fetch-and-update-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});// Create a new MongoClient


const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

const getInChunk = async function (items, chunkSize) {
    client.connect(async (err) => {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('cities'); // Get the documents collection

        let errors = [];
        let chunkPromises = [];
        let chunkResults = [];
        for (let index = 0; index < items.length; index++) {
            if (index % chunkSize === 0) {
                try {
                    const result = await Promise.all(chunkPromises);
                    chunkPromises = [];
                    console.log({
                        msg: 'resolved chunkPromises, index: ' + index
                    })
                    logger.info('resolved chunkPromises, index: ', index);
                } catch (err) {
                    logger.log('Error resolving chunkPromises', {
                        chunkPromises: chunkPromises,
                        result: result,
                        errorMsg: err
                    });
                    errors.push(err)
                }
            } else {
                chunkPromises.push(
                    axios.get(
                        encodeURI(`https://www.hebcal.com/shabbat/?cfg=json&geo=city&city=${items[index].city}&gy=${items[index].gy}&gm=${items[index].gm}&gd=${items[index].gd}`)
                    ).then((res) => {
                        collection.insertOne({
                            ...res.data,
                            customTitle: items[index].city + '-on-' + items[index].gy + '-' + items[index].gm + '-' + items[index].gd
                        }).then(response => {
                            console.log(index + '/' + items.length + '  ' + response.ops[0].customTitle);
                            logger.info('saved in DB: ', index + '/' + items.length + '  ' + response.ops[0].customTitle);
                        }).catch(err => {
                            //TODO:: Write to logs file.
                            console.log(err);
                            logger.log('Error inserting to DB', {
                                errorMsg: err
                            });
                        });
                    }).catch(err => {
                        //TODO:: Write to logs file.
                        console.log(err);
                        logger.log('Error fetching data from hebcal', {
                            errorMsg: err
                        });
                    })
                );
            }
        }
        // last chunk
        if (chunkPromises.length) {
            chunkResults.push(await Promise.all(chunkPromises));
        }
        console.log({
            msg: 'finished. closing connections',
            errorsOcurredDuringFetching: errors
        })
    });// Use connect method to connect to the Server
};


const generateCitiesObject = (startDate, endDate, cities) => {
    const dates = getDates(startDate, endDate);
    const res = []
    for (let city of cities) {
        for (let date of dates) {
            res.push({
                city: city,
                gy: date.split('-')[0],
                gm: date.split('-')[1],
                gd: date.split('-')[2]
            })
        }
    }
    return res;
}

const citiesWithDatesList = generateCitiesObject('2020-06-01', '2020-08-01', cities);
//console.log('there are' + getDates('2020-06-01', '2020-08-01', cities).length + 'days and ' + cities.length + 'cities')
getInChunk(citiesWithDatesList, 6);