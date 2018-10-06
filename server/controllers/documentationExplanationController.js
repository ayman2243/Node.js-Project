//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _=require('lodash');
const {ObjectID}=require('mongodb');
var {DocumentationExplanation}=require('../models/documentationExplanation');

exports.documentationExplanation_creat=function(req,res){
var body=_.pick(req.body,["name", "type", "description"]);
var documentationexplanation = new DocumentationExplanation(body);
documentationexplanation.save().then(doc=>res.send(doc))
                           .catch(e=>{
                              res.status(400);
                              res.send(e);
                           });

};

exports.documentationExplanation_list=function(req,res){
    let page = 1;
    if(req.query.page)
        page = Number(req.query.page);
    DocumentationExplanation.paginate({}, { page, limit: 10 }).then(doc=>res.send(doc))
                         .catch(e=>{
                         res.status(400);
                         res.send(e);
                         });

};
exports.documentationExplanation_view=function(req,res){
   var id=req.params.id;
   if(!ObjectID.isValid(id))
   {
       return res.status(404).send();
   }
   DocumentationExplanation.findOne({_id:id})
    .then(doc=>{
        if(!doc)
        {
            return res.status(404).send();
        }
        res.send(doc)
    
    }).catch(e=>{
       res.status(404);
       res.send(e);
    });
};
exports.documentationExplanation_update=function(req,res){
  var id=req.params.id;
  if(!ObjectID.isValid(id))
  {
      res.status(404).send();
  }
  var body=_.pick(req.body,["name", "type", "description"]);
  DocumentationExplanation.findOneAndUpdate({_id:id},{$set:body},{new:true, runValidators: true})
   .then(doc=>{
       if(!doc)
       {
           return res.status(404).send();
       }
       res.send(doc);
   }).catch(e=>
       res.status(400).send(e)
  );

};

exports.documentationExplanation_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    DocumentationExplanation.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
};
