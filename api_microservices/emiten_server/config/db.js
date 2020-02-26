const mongoose = require('mongoose');

function con(){
	mongoose.Promise = global.Promise;

	mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,{ useNewUrlParser: true });

	mongoose.connection
		.once('open', () => console.log('MongoDB running and connected'))
		.on('error', err => console.error(err));
}

module.exports.con = con;