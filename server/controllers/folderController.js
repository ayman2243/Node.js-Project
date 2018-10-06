//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const { ObjectID } = require('mongodb');
var { Folder } = require('../models/folder');

exports.folder_create = function (req, res) {
    var body = _.pick(req.body, ['name', 'number', 'description']);
    var folder = new Folder(body);
    folder.save().then(doc => res.send(doc))
        .catch(e => {
            res.status(400);
            res.send(e);
        });
};

exports.folder_list = function (req, res) {
    let page = 1;
    if (req.query.page)
        page = Number(req.query.page);
    Folder.paginate({}, { page, limit: 10 }).then(doc => res.send(doc))
        .catch(e => {
            res.status(400);
            res.send(e);
        });
};

exports.folder_list_without_pagination = function (req, res) {

    Folder.find({}).then(doc => res.send(doc))
        .catch(e => {
            res.status(400);
            res.send(e);
        });
};

exports.folder_view = function (req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Folder.findOne({ _id: id })
        .then(doc => {
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

exports.folder_update = function (req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ['name', 'number', 'description']);

    Folder.findOneAndUpdate({ _id: id }, { $set: body }, { new: true, runValidators: true })
        .then(doc => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        })
        .catch(e => res.status(400).send(e));
}

exports.folder_delete = function (req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Folder.findOneAndRemove({ _id: id }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }

        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}