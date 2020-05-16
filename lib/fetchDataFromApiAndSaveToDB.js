const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://zmanim:Oni5xsqBqbSWzoGN@cluster0-0lu1d.gcp.mongodb.net/test?retryWrites=true&w=majority';// Connection URL
const dbName = 'test';// Database Name
const axios = require('axios');
const { cities, getDates } = require('./data/citiesNodeSyntax');

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});// Create a new MongoClient


const delay = (ms = 1) => new Promise((r) => setTimeout(r, ms));

const getTodosSeries = async function (items) {
    client.connect(async (err) => {
        console.log("Connected successfully to server");
        const db = client.db(dbName);

        const collection = db.collection('cities'); // Get the documents collection
        let results = [];
        let i = 0;
        for (let item of items) {
            await delay();
            i++;

            const res = await axios.get(
                `https://www.hebcal.com/shabbat/?cfg=json&geo=city&city=${item.city}&gy=${item.gy}&gm=${item.gm}&gd=${item.gd}`
            );
            collection.insertOne({
                ...res.data,
                customTitle: item.city + '-on-' + item.gy + '-' + item.gm + '-' + item.gd
            }).then(response => {
                console.log(i + '/' + items.length + '  ' + response.ops[0].customTitle);
            }).catch(err => {
                console.log(err);
            });
        }
        client.close();
    });// Use connect method to connect to the Server
};



const generateCitiesObject = (startDate = '2020-05-16', endDate = '2020-05-20', cities) => {
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
getTodosSeries(citiesWithDatesList);