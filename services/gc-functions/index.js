
require('dotenv').config();
const { MongoClient } = require('mongodb');
let client = new MongoClient();

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.helloGET = (req, res) => {
    res.send('Hello World!');
};


exports.getFromDB = async (req, res) => {
    await connectToClientIfDropped()
        .catch(error => {
            res.status(500).end(error.message);

        })
    const docs = await client.db('production').collection('cities').findOne();
    res.send(JSON.stringify(docs));
}


const connectToClientIfDropped = async () => {
    if (client && client.isConnected()) {
        return;
    }

    try {
        client = await MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-0lu1d.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });
    } catch (e) {
        throw new CustomError('failed to connect to mongo client', e);
    }
};

