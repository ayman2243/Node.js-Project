//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const {  ObjectID } = require('mongodb');
var { WebsiteSetting } = require('../models/websiteSettings');

async function setUpWebSiteSettings (){
    var checkDocs = await WebsiteSetting.find({});
    if(checkDocs.length === 0 || checkDocs == null){
        var setupDoc = await WebsiteSetting.insertMany([{
            "maintenanceMode":0,
            "feedback_config": "feedback email setup",
            "feedbackmailServer": "gmail.com",
            "mailFeedbackAuth": "mohamed@yahoo.com",
            "mailFeedbackPassword": "password"
            }]);

        return setupDoc[0]['_id'];
    }
    return checkDocs[0]['_id'];
}

exports.websitesetting_list=function(req,res){
    setUpWebSiteSettings().then(done =>{
        WebsiteSetting.find({})
        .then(doc=>res.send(doc[0]))
        .catch(e=>{
            res.status(400);
            res.send(e);
        });
    });
};


exports.websitesetting_update=function(req,res){
    setUpWebSiteSettings().then(done =>{
        console.log(done);
        var body=_.pick(req.body,['maintenancemode',' mailServer','mailFeedbackAuth','mailFeedbackPassword']);
        WebsiteSetting.findOneAndUpdate({_id: ObjectID(done)},{$set:body},{new:true, runValidators: true})
        .then(doc=>{
            if(!doc){ 
                return res.status(404).send();
            }
            res.send(doc);
        }).catch(e=>
            res.status(400).send(e)
        );
    });
};