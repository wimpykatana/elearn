const mongoose = require('mongoose');

function con(){
	mongoose.Promise = global.Promise;

	if(process.env.NODE_ENV === 'production') {
		mongoose.connect(`mongodb://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{ useNewUrlParser: true });
	}
	else {
		mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{ useNewUrlParser: true });
	}
	
	mongoose.connection
		.once('open', () => console.log('MongoDB running and connected'))
		.on('error', err => console.error(err));
}

module.exports.con = con;