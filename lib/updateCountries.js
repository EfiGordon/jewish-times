const { cities } = require('./data/citiesNodeSyntax');
const axios = require('axios');


const getCountryIdsMap = () => {
    const countriesIdMap = new Map();
    for (let city of cities) {
        countriesIdMap.set(city.split('-')[0], city)
    }
    //console.log(Array.from(countriesIdMap));
    return countriesIdMap;
}
const delay = (ms = 2000) => new Promise((r) => setTimeout(r, ms));



//axios.get(`https://www.hebcal.com/shabbat/?cfg=json&geo=city&city=${cityName}`)
const fetchFromApiAndStoreCountriesName = async () => {

    const countryIdsMap = getCountryIdsMap();
    const arr = [];
    countryIdsMap.forEach((cityName, countryCode) => {
        arr.push({
            cityName: cityName,
            countryCode: countryCode
        })
    })
    console.log(arr)
    const results = [];

    for (let o of arr) {
        await delay(2);
        try {
            let res = await axios.get(encodeURI(`https://www.hebcal.com/shabbat/?cfg=json&geo=city&city=${o.cityName}`))

            if (res.data.location.country) {
                let cntry = res.data.location.country;
                results.push({
                    countryCode: o.countryCode,
                    countryName: cntry
                });
                console.log(cntry + ' pushed')
            } else {
                console.log('ERROR::cityName:: ' + o.cityName)
            }
        }
        catch (err) {
            console.log(err);
            console.log({
                o: o
            })
        }






    }
    return results;
}


fetchFromApiAndStoreCountriesName()
    .then(res => {
        console.log('writing to file...');
        require('fs').writeFile(
            './countries.json',
            JSON.stringify(res),
            (err) => {
                if (err) {
                    console.error('Crap happens');
                }
            }
        );
    });