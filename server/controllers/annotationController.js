//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {Annotation} = require('../models/annotation');

exports.annotation_create = function(req, res) {
    var body = _.pick(req.body, ["type", "privateType", "publicNumber", "pageNumber", "body", "folder"]);
    var annotation = new Annotation(body);
    annotation.save().then(doc => res.send(doc))
                        .catch(e => {
                        res.status(400);
                        res.send(e);
                    });
};

exports.annotation_list = function(req, res) {
    let page = 1;
    if(req.query.page)
        page = Number(req.query.page);
    Annotation.paginate({}, { page, limit: 10 })
                .then( 
                    doc => res.send(doc)
                ).catch( e => {
                    res.status(400);
                    res.send(e);
                });
};

exports.annotation_view = function(req, res) {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Annotation.findOne({ _id: id})
        .then( doc => {
            if (!doc) {
                return res.status(404).send();
            }
            
            res.send(doc);
        })
        
        .catch( e => {
            res.status(404);
            res.send(e);
        });
};


exports.annotation_update = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ["type", "privateType", "publicNumber", "pageNumber", "body", "folder"]);

    Annotation.findOneAndUpdate({_id: id}, {$set: body}, {new: true, runValidators: true})
    .then(doc => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    })
    .catch(e => res.status(400).send(e) );
}

exports.annotation_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Annotation.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}

