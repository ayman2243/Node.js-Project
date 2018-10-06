//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var subjectIndexSchema = new mongoose.Schema({
       type:{
           type:String,
           required:true
       },
       text:{
          type:String,
          required:true
       },
       folderNumber:{
           type:Number,
           required:true,
       },
       aya_id:{
           type:mongoose.Schema.Types.ObjectId,
       },
       wordRoot:{
           type:String,
       },
       interpreter_id:{
           type:mongoose.Schema.Types.ObjectId,
           ref: "Interpreter"
       },
       agzAlbait:{
           type:String,
       },
       albaitEnd:{
           type:String,
       },
       poet:{
           type:String,
       },
       pageNumber:[{
           type:Number,
       }]	

}, { toJSON: { virtuals: true } });

subjectIndexSchema.plugin(mongoosePaginate);

subjectIndexSchema.index({'$**':'text'});

var subjectIndex = mongoose.model('subjectIndex',subjectIndexSchema);

module.exports={subjectIndex};