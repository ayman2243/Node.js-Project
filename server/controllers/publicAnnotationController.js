//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _=require('lodash');
const {ObjectID}=require('mongodb');
var {publicAnnotation}=require('../models/publicAnnotation');

exports.publicAnnotation_creat=function(req,res){
var body=_.pick(req.body,['text',' folder_id','pageNumber',' resource_id','symbol_id']);
var publicannotation=new publicAnnotation(body);
publicannotation.save().then(doc=>res.send(doc))
                           .catch(e=>{
                              res.status(400);
                              res.send(e);
                           });

};

exports.publicAnnotation_list=function(req,res){
    let page = 1;
    if(req.query.page)
        page = Number(req.query.page);
    publicAnnotation.paginate({}, { page, limit: 10 }).then(doc=>res.send(doc))
                         .catch(e=>{
                         res.status(400);
                         res.send(e);
                         });

};
exports.publicAnnotation_view=function(req,res){
   var id=req.params.id;
   if(!ObjectID.isValid(id))
   {
       return res.status(404).send();
   }
  publicAnnotation.findOne({_id:id})
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
exports.publicAnnotation_update=function(req,res){
  var id=req.params.id;
  if(!ObjectID.isValid(id))
  {
      res.status(404).send();
  }
  var body=_.pick(req.body,['text',' folder_id','pageNumber',' resource_id','symbol_id']);
 publicAnnotation.findOneAndUpdate({_id:id},{$set:body},{new:true, runValidators: true})
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
exports.publicAnnotation_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
   publicAnnotation.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
};
