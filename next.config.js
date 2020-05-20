module.exports = {
    env: {
        BASE_URL: 'http://localhost:3000',
        MONGO_URL: 'mongodb+srv://zmanim:Oni5xsqBqbSWzoGN@cluster0-0lu1d.gcp.mongodb.net/test?retryWrites=true&w=majority',
        FETCH_CITIES_API: 'https://sjzd2jbt17.execute-api.eu-west-2.amazonaws.com/default/fetch-cities',
        CURRENT_ENV: 'development',
        startDate: '2020-05-20',
        endDate: '2020-05-22',
    },
    // webpackDevMiddleware: config => {
    //     config.watchOptions = {
    //         poll: 1000,
    //         aggregateTimeout: 300,
    //     }

    //     return config
    // },
}