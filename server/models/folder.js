//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 6,
        required: true,
        trim: true,
        unique: true
    },
    number: {
        type: Number,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        minlength: 6,
        trim: true
    }
}, { toJSON: { virtuals: true } });

FolderSchema.plugin(mongoosePaginate);

FolderSchema.index({ "name": 'text' });

var Folder = mongoose.model('Folder', FolderSchema);

module.exports = { Folder };


