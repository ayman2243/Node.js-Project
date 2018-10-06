//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {Surah} = require('../models/surah');

exports.surah_create = function(req, res) {
    var body = _.pick(req.body, ["surahName", "surahNumber", "numberOfAyat", "folder_id", "pageNumber"]);
    var surah = new Surah(body);
    
    surah.save().then(doc => res.send(doc))
                        .catch(e => {
                        res.status(400);
                        res.send(e);
                    })
};

exports.surah_list = function(req, res) {
    let page = 1;
    if(req.query.page) page = Number(req.query.page);
    Surah.paginate({}, { page, limit: 10 }).then( doc => res.send(doc))
                    .catch( e => {
                    res.status(400);
                    res.send(e);
                });
};

exports.surah_view = function(req, res) {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Surah.findOne({ _id: id})
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

exports.surah_update = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ["surahName", "surahNumber", "numberOfAyat", "folder_id", "pageNumber"]);

    Surah.findOneAndUpdate({_id: id}, {$set: body}, {new: true})
    .then(doc => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    })
    .catch(e => res.status(404).send() );
}

exports.surah_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Surah.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}

