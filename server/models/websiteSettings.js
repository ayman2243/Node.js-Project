//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
const validator = require('validator');
var mongoosePaginate = require('mongoose-paginate');

var websiteSettingSchema=new mongoose.Schema({
    maintenanceMode:{
        type:Boolean,
        default: false
    },
    feedbackmailServer:{
        type:String,
        trim:true,
        minlength:4,
        required: true
    },
    feedback_config:{
        type:String,
        trim:true,
        minlength:4,
        required: true
    },
    mailFeedbackAuth:{
        type:String,
        trim:true,
        minlength:4,
        required: true,
        validator: (value) => {
            return validator.isEmail(value);  
        },
        message:'{VALUE} is not a valid Email'
    },
    mailFeedbackPassword:{
        type:String,
        trim:true,
        minlength:1,
        required: true
    }
});

websiteSettingSchema.plugin(mongoosePaginate);
websiteSettingSchema.index({'$**':'text'});
var WebsiteSetting = mongoose.model('WebsiteSetting', websiteSettingSchema);
module.exports={ WebsiteSetting };

