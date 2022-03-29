// const mongoose = require('mongoose')

// const imageSchema = new mongoose.Schema({
//     img:{
//         data: Buffer,
//         contentType: String
//     },
//     name: {
//         type: String
//     },
//     desc : {
//         type: String
//     },

//     productId:{
//         type: String
//     }
// })
// module.exports = new mongoose.model('Image', imageSchema);


// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	name: String,
	desc: String,
	postId:{
		type: String
	},
	img:
	{
		data: Buffer,
		contentType: String
	}
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Image', imageSchema);
