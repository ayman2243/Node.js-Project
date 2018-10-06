//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {AnonymousUser} = require('../models/anonymousUser');

exports.anonymous_create = function(req, res) {
    var body = _.pick(req.body, ['text', 'interpreters', 'annotation', 'pageNumber']);
    var anonymousUser = new AnonymousUser(body);
    anonymousUser.save().then(doc => res.send(doc))
                        .catch(e => {
                        res.status(400);
                        res.send(e);
                    });
};

exports.anonymous_list = function(req, res) {
    let page = 1;
    if(req.query.page)
        page = Number(req.query.page);
    AnonymousUser.paginate({}, { page, limit: 10 }).then( doc => res.send(doc))
                    .catch( e => {
                    res.status(400);
                    res.send(e);
                });
};

exports.anonymous_view = function(req, res) {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    AnonymousUser.findOne({ _id: id})
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

exports.anonymous_update = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ['text', 'interpreters', 'annotation', 'pageNumber']);

    AnonymousUser.findOneAndUpdate({_id: id}, {$set: body}, {new: true, runValidators: true})
    .then(doc => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    })
    .catch(e => res.status(404).send() );
}

exports.anonymous_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    AnonymousUser.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}

