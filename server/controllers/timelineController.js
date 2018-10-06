//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _=require('lodash');
const {ObjectID}=require('mongodb');
var {Timeline}=require('../models/timeline');

exports.timeline_create= function(req,res){
    var body=_.pick(req.body,["name", "date", "description"]);
    var timeline=new Timeline(body);
    timeline.save().then(doc=>res.send(doc))
                   .catch(e=>{
                    res.status(400);
                    res.send(e);
                   });
};

exports.timeline_list=function(req,res){
    let page = 1;
    if(req.query.page) page = Number(req.query.page);
    Timeline.paginate({}, { page, limit: 10 }).then(doc=>res.send(doc))
                      .catch(e=>{
                      res.status(400);
                      res.send(e);
                      });
};

exports.timeline_view=function(req,res){
    var id= req.params.id;
    if(!ObjectID.isValid(id))
    {
      return  res.status(404).send();
    }
    Timeline.findOne({_id:id})
    .then(doc=>{
        if(!doc){
            return res.status(404).send();
        }
        res.send(doc);
    }).catch(e=>{
        res.status(404);
        res.send(e);
    })
};

exports.timeline_update=function(req,res){
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }
    var body=_.pick(req.body,["name", "date", "description"]);
    Timeline.findOneAndUpdate({_id: id}, {$set: body}, {new: true, runValidators: true})
    .then(doc=>{
        if(!doc)
        {
            res.status(404).send()
        }
        res.send(doc);
    })
    .catch(e=>res.status(400).send(e));
}

exports.timeline_delete=function(req,res){
    var id= req.params.id;
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }
    Timeline.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });

}
