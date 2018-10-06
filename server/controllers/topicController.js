//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const { ObjectID } = require('mongodb');
var { Topic } = require('../models/topic');

exports.topic_create = function (req, res) {
    var body = _.pick(req.body, ['folder', 'pageNumber', 'headline', 'body', 'annotationTitle', 'tags', 'annotation']);
    topic = new Topic(body);
    topic.save().then(doc => res.send(doc))
        .catch(e => {
            res.status(400);
            res.send(e);
        });
};

exports.topic_list = function (req, res) {
    let page = 1;
    if (req.query.page) page = Number(req.query.page);
    Topic.paginate({}, { page, limit: 10 }).then(doc => res.send(doc))
        .catch(e => {
            res.status(400);
            res.send(e);
        });
};


exports.topic_view = function (req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Topic.findOne({ _id: id })
        .then(doc => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        }).catch(e => {
            res.status(404);
            res.send(e);
        });

};


exports.topic_update = function (req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ['folder', 'pageNumber', 'headline', 'body', 'annotationTitle', 'tags', 'annotation']);

    Topic.findOneAndUpdate({ _id: id }, { $set: body }, { new: true, runValidators: true })
        .then(doc => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        })
        .catch(e => res.status(400).send(e))
}

exports.topic_delete = function (req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Topic.findOneAndRemove({ _id: id }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }

        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}



