//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {Resource} = require('../models/resource');

exports.resource_create = function(req, res) {
    var body = _.pick(req.body, ["name", "information"]);
    var resource = new Resource(body);
    resource.save().then(doc => res.send(doc))
                        .catch(e => {
                        res.status(400);
                        res.send(e);
                    });
};

exports.resource_list = function(req, res) {
    let page = 1;
    if(req.query.page)
        page = Number(req.query.page);
    Resource.paginate({}, { page, limit: 10 }).then( doc => res.send(doc))
                    .catch( e => {
                    res.status(400);
                    res.send(e);
                });
};

exports.resource_view = function(req, res) {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Resource.findOne({ _id: id})
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


exports.resource_update = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ["name", "information"]);

    Resource.findOneAndUpdate({_id: id}, {$set: body}, {new: true, runValidators: true})
    .then(doc => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    })
    .catch(e => res.status(400).send(e) )
}

exports.resource_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Resource.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}