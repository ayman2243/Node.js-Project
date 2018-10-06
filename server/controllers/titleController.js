//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {Title} = require('../models/title');

exports.title_create = function(req, res) {
    var body = _.pick(req.body, ["name", "type", "surah", "aya" ]);
    var title = new Title(body);
    title.save().then(doc => res.send(doc))
                        .catch(e => {
                        res.status(400);
                        res.send(e);
                    });
};

exports.title_list = function(req, res) {
    let page = 1;
    if(req.query.page) page = Number(req.query.page);
    Title.paginate({}, { page, limit: 10 }).then( doc => res.send(doc))
                    .catch( e => {
                    res.status(400);
                    res.send(e);
                });
};

exports.title_view = function(req, res) {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Title.findOne({ _id: id})
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

exports.title_update = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ["name", "type", "surah", "aya" ]);

    Title.findOneAndUpdate({_id: id}, {$set: body}, {new: true})
    .then(doc => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    })
    .catch(e => res.status(404).send() );
}

exports.title_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Title.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}

