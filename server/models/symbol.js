//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var SymbolSchema = new mongoose.Schema({
    refersTo: {
        type:  String,
        required: true,
    },
    color: {
        type:  String,
        required: true,
    },
    bookSection: {
        type:  String,
    },
   symbolType:{
       type: String, enum: ['Header', 'Footer'] ,
       required: true 
   },
   pageNumber:{
       type: Number,
       required: true
   }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

SymbolSchema.plugin(mongoosePaginate);

SymbolSchema.index({"$**": 'text'});

var Symbol = mongoose.model('Symbol', SymbolSchema);

module.exports = { Symbol };
