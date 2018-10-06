//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {Point} = require('../models/point');

exports.point_create = function(req, res) {
    var body = _.pick(req.body, ["pointNumber", "text", "annotation", "documents", "folder_id", "typeOfTafser", "interpreters", "timeline_id", "resources", "aya_id", "surah_id", "pageNumber", "title_id"]);
    var point = new Point(body);
    point.save().then(doc => res.send(doc))
                        .catch(e => {
                        res.status(400);
                        res.send(e);
                    });
};

exports.point_list = function(req, res) {
    let page = 1;
    if(req.query.page)
        page = Number(req.query.page);
    Point.paginate({}, { page, limit: 10 }).then( doc => res.send(doc))
                    .catch( e => {
                    res.status(400);
                    res.send(e);
                });
};

exports.point_view = function(req, res) {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Point.findOne({ _id: id})
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

exports.point_update = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ["pointNumber", "text", "annotation", "documents", "folder_id", "typeOfTafser", "interpreters", "timeline_id", "resources", "aya_id", "surah_id", "pageNumber", "title_id"]);

    Point.findOneAndUpdate({_id: id}, {$set: body}, {new: true})
    .then(doc => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    })
    .catch(e => res.status(404).send() );
}

exports.point_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Point.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}

