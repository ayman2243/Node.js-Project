//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
const validator = require('validator');
var mongoosePaginate = require('mongoose-paginate');

var FeedbackSchema=new mongoose.Schema({
     message:{
         type:String,
         trim:true,
         minlength:10,
         required:true
     },
     email:{
        type:String,
        trim:true,
        minlength:6,
        required:true ,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);  
            },
            message:'{VALUE} is not a valid Email'
        }
     },
     state:{
         type:String,
         enum:['Seen','Replied','NotReplied'], 
         default:'NotReplied',
        
     },
     subject:{
          type:String,
          trim:true,
          minlength:7,
          required:true,
     }


}, { toJSON: { virtuals: true } });

FeedbackSchema.plugin(mongoosePaginate);
FeedbackSchema.index({'$**':'text'});

var Feedback = mongoose.model('Feedback',FeedbackSchema);

module.exports = {Feedback};