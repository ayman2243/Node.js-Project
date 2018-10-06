//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ResourceSchema = new mongoose.Schema({

    name: {
        type:  String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true
    },

    information: {
        type:  String,
        required: true,
        minlength: 5,
        trim: true
    }
    
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

ResourceSchema.plugin(mongoosePaginate);

ResourceSchema.index({"name": 'text'});

var Resource = mongoose.model('Resource', ResourceSchema);

module.exports = { Resource };


