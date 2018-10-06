//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var publicAnnotationSchema = new mongoose.Schema({
       text:{
               type: String,
               required: true
       },
       resource_id:{
               type:mongoose.Schema.Types.ObjectId,
       },
       pageNumber:{
              type:Number,
              required:true,

       },
       folder_id:{
              type:mongoose.Schema.Types.ObjectId,
       },
       symbol_id:{
           type:mongoose.Schema.Types.ObjectId,
       }
});
publicAnnotationSchema.plugin(mongoosePaginate);
publicAnnotationSchema.index({'$**':'text'});

var publicAnnotation=mongoose.model('publicAnnotation',publicAnnotationSchema);

module.exports={publicAnnotation};