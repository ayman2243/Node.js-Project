//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _=require('lodash');
const {ObjectID}=require('mongodb');
var {subjectIndex}=require('../models/subjectIndex');

exports.subjectindex_creat=function(req,res){
var body=_.pick(req.body,['type','text','folderNumber','aya_id','wordRoot','interpreter_id','agzAlbait','albaitEnd','poet','pageNumber']);
var subjectindex=new subjectIndex(body);
subjectindex.save().then(doc=>res.send(doc))
                           .catch(e=>{
                              res.status(400);
                              res.send(e);
                           });

};

exports.subjectindex_list=function(req,res){
    let page = 1;
    if(req.query.page) page = Number(req.query.page);
    subjectIndex.paginate({}, { page, limit: 10 }).then(doc=>res.send(doc))
                         .catch(e=>{
                         res.status(400);
                         res.send(e);
                         });

};
exports.subjectindex_view=function(req,res){
   var id=req.params.id;
   if(!ObjectID.isValid(id))
   {
       return res.status(404).send();
   }
   subjectIndex.findOne({_id:id})
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
exports.subjectindex_update=function(req,res){
  var id=req.params.id;
  if(!ObjectID.isValid(id))
  {
      res.status(404).send();
  }
  var body=_.pick(req.body,['type','text','folderNumber','aya_id','wordRoot','interpreter_id','agzAlbait','albaitEnd','poet','pageNumber']);
  subjectIndex.findOneAndUpdate({_id:id},{$set:body},{new:true, runValidators: true})
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
exports.subjectindex_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    subjectIndex.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
};
