//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var privateAnnotationSchema=new mongoose.Schema({
    text:{
        type: String,
        required:true,
        
    },
    folder_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    pageNumber:{
        type:Number,
        required:true,
    },
   type:{
        type:String,
        required:true
    },
    resource_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    symbol_id:{
        type:mongoose.Schema.Types.ObjectId,
    }


});
privateAnnotationSchema.plugin(mongoosePaginate);
privateAnnotationSchema.index({'$**':'text'});

var privateAnnotation=mongoose.model('privateAnnotation',privateAnnotationSchema);

module.exports={privateAnnotation};