//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _=require('lodash');
const {ObjectID}=require('mongodb');
var nodemailer = require('nodemailer');
var {FeedBack}=  require('../models/feedBack');

exports.feedBack_create=function(req,res){
    var body = _.pick(req.body,['message','email','state','subject']);
    var feed = new Feedback(body);
    feed.save().then(doc=>res.send(doc))
                   .catch(e=>{
                    res.status(400);
                    res.send(e);
                   });
};

exports.feedback_list=function(req,res){
    let page = 1;
    if(req.query.page) page = Number(req.query.page);
    Feedback.paginate({}, { page, limit: 10 }).then(doc=>res.send(doc))
                     .catch(e=>{
                      res.status(400);
                      res.send(e);
                     });
                      
};

exports.feedback_view = function(req,res){
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Feedback.findOne({_id:id})
    .then(doc=>{
        if(!doc){
            return res.status(404).send();
        }
        res.send(doc);
        var mail=doc.email;
    })
    .catch(e=>{
        res.status(404);
        res.send(e);
    });
};

exports.feedback_Reply = function(req,res){
   var ReplyEmail = "feedback-dont-reply@mawso3ah.com";
   var body=_.pick(req.body,['id','subject','message','email']);

   if(body.subject == undefined || body.message == undefined || body.email == undefined ){
        return res.status(400).send({ message: "please fill all required fields." });
   }
   
   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mawso3ah1@gmail.com',
      pass: 'U@mm5QmP#"7%8D$q'
    }
  });
  
  var mailOptions = {
    from:'mawso3ah1@gmail.com' ,
    to: body.email,
    subject: body.subject,
    text: body.message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) 
        return res.status(400).send(error);
        
    res.status(200).send({message: "your message has been sent"});
  });
}

exports.feedback_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Feedback.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
};


