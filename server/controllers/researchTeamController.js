//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {ResearchTeam} = require('../models/researchTeam');

exports.researchTeam_create = function(req, res) {
    var body = _.pick(req.body, ['name', 'scientificDegree', 'role', 'committee']);
    var researchTeam = new ResearchTeam(body);
    researchTeam.save().then(doc => res.send(doc))
                        .catch(e => {
                        res.status(400);
                        res.send(e);
                    });
};

exports.researchTeam_list = function(req, res) {
    let page = 1;
    if(req.query.page)
        page = Number(req.query.page);
    ResearchTeam.paginate({}, { page, limit: 10 }).then( doc => res.send(doc))
                    .catch( e => {
                    res.status(400);
                    res.send(e);
                });
};

exports.researchTeam_view = function(req, res) {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    ResearchTeam.findOne({ _id: id})
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

exports.researchTeam_update = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body,['name', 'scientificDegree', 'role', 'committee']);

    ResearchTeam.findOneAndUpdate({_id: id}, {$set: body}, {new: true})
    .then(doc => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    })
    .catch(e => res.status(404).send() );
}

exports.researchTeam_delete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    ResearchTeam.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}

