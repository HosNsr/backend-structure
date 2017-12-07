import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const { LOCAL_DB, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const mongoOptions = {
	useMongoClient: true,
};

if(LOCAL_DB) {
	const uri = `mongodb://${DB_HOST}/${DB_NAME}`;
	mongoose.connect(uri, mongoOptions);
}
else {
	const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
	mongoose.connect(uri, mongoOptions);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to mongo server.'));