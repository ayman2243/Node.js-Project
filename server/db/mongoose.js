//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

mongoose.plugin(schema => { schema.options.usePushEach = true });

module.exports = { mongoose };
