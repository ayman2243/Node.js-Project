//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var AnonymousUserSchema = new mongoose.Schema({
    ip: {
        type:  String,
                
    },
    date:{
        type:Date ,
        default: Date.now()
    },
    path:{
        type:String
    }
} , { toJSON: { virtuals: true } });

AnonymousUserSchema.plugin(mongoosePaginate);

var AnonymousUser = mongoose.model('AnonymousUser', AnonymousUserSchema);

module.exports = {AnonymousUser};


