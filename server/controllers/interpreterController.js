//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {Interpreter} = require('../models/interpreter');

exports.interpreter_create = function(req, res) {
    var body = _.pick(req.body, ["name", "type", "rank", "subRank", "dateDeath", "numbersExplanation", "information"]);
    var interpreter = new Interpreter(body);
    interpreter.save().then(doc => res.send(doc))
                        .catch(e => {
                        res.status(400);
                        res.send(e);
                    });
};

exports.interpreter_list = function(req, res) {
    let page = 1;
    if(req.query.page)
        page = Number(req.query.page);
    Interpreter.paginate({}, { page, limit: 10 }).then( doc => res.send(doc))
                    .catch( e => {
                    res.status(400);
                    res.send(e);
                } );
};

exports.interpreter_view = function(req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Interpreter.findOne({ _id: id})
        .then( doc => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        })
        .catch(e => {
            res.status(404);
            res.send(e);
        });
};

exports.interpreter_update = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ["name", "type", "rank", "subRank", "dateDeath", "numbersExplanation", "information"]);

    Interpreter.findOneAndUpdate({_id: id}, {$set: body}, {new: true, runValidators: true})
    .then(doc => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    })
    .catch(e => res.status(400).send(e) )
}

exports.interpreter_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Interpreter.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}