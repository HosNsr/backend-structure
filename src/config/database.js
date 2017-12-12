import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
require('dotenv').config()

const mongoOptions = {
	useMongoClient: true,
};

const uri = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose.connect(uri, mongoOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to mongo server.'));