module.exports = {
    env: {
        BASE_URL: 'http://localhost:3000',
        FETCH_CITIES_API_OLD: 'https://us-central1-zmanim-pid.cloudfunctions.net/getFromDB',
        FETCH_CITIES_API: 'https://www.hebcal.com/shabbat?cfg=json',
        CURRENT_ENV: 'development',
        startDate: '2020-08-10',
        endDate: '2020-08-12',
    },
    // webpackDevMiddleware: config => {
    //     config.watchOptions = {
    //         poll: 1000,
    //         aggregateTimeout: 300,
    //     }

    //     return config
    // },
}