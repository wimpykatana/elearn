const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

function con(){
	mongoose.Promise = global.Promise;

	// if(process.env.NODE_ENV === 'production') {
	 	mongoose.connect('mongodb://admin:1234@localhost:27017/tell',{ useNewUrlParser: true });
	//}
	//else {
		// mongoose.connect(`mongodb://localhost:27017/tell-26jun`,{ useNewUrlParser: true });
		//mongoose.connect(`mongodb://localhost:27017/tell-ratings`,{ useNewUrlParser: true });
	// }
	
	mongoose.connection
		.once('open', () => console.log('MongoDB running and connected'))
		.on('error', err => console.error(err));
}

module.exports.con = con;