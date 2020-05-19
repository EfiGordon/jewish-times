const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://zmanim:Oni5xsqBqbSWzoGN@cluster0-0lu1d.gcp.mongodb.net/production?retryWrites=true&w=majority';// Connection URL
const dbName = 'production';// Database Name
const axios = require('axios');
const { cities, getDates } = require('./data/citiesNodeSyntax');
const keys = require('../config/keys');

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});// Create a new MongoClient


const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const getInChunk = async function (items, chunkSize) {

    client.connect(async (err) => {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('cities'); // Get the documents collection


        let results = [];
        let errors = [];
        let chunkPromises = [];
        let chunkResults = [];
        for (let index = 0; index < items.length; index++) {
            if (index % chunkSize === 0) {
                console.log('---------------');
                console.log({
                    chunkResults: chunkResults
                })
                //chunkResults.push(await Promise.all(chunkPromises));
                try {
                    const result = await Promise.all(chunkPromises);

                    console.log({
                        msg: 'resolved chunkPromises, index: ' + index,
                        chunkPromises: chunkPromises,
                        result: result
                    })
                } catch (err) {
                    console.log({
                        msg: 'errror....',
                        err: err
                    })
                    errors.push(err)
                }
                chunkPromises = [];
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
                        }).catch(err => {
                            //TODO:: Write to logs file.
                            console.log(err);
                        });
                    })
                );
            }
        }
        // last chunk
        if (chunkPromises.length) {
            chunkResults.push(await Promise.all(chunkPromises));
        }
        // flatten 
        chunkResults.forEach(chunk => {
            results = results.concat(chunk)
        })
        console.log({
            msg: 'finished. closing connections',
            errorsOcurredDuringFetching: errors
        })
    });// Use connect method to connect to the Server
};


const generateCitiesObject = (startDate = keys.startDate, endDate = keys.endDate, cities) => {
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

const citiesWithDatesList = generateCitiesObject(undefined, undefined, cities);
getInChunk(citiesWithDatesList, 6);