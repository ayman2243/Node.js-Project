//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {User} = require('../models/user');

exports.register = function(req, res) {
    var body = _.pick(req.body, ['fullName','email', 'phone', 'age', 'address', 'password']);
    user = new User( body );

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('access-token', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
};

exports.login = function(req, res){
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
        res.status(201).header('access-token', token).send({user, token});
        });
    }).catch((e) => {
        res.status(400).send();
    });
};

exports.myProfile = function(req, res){
    res.send(req.user);
};

exports.updateProfile = function(req, res){
        var id = req.user._id;
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        var body = _.pick(req.body, ['fullName', 'password', 'email', 'phone', 'isBlocked', 'isConfirmed', 'age', 'isSuspended', 'address','roles']);
    
        User.findOneAndUpdate({_id: id}, {$set: body}, {new: true, runValidators: true})
        .then(doc => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        })
        .catch(e => res.status(400).send(e) );
};

exports.viewAllUsers =  function(req, res){
    let page = 1;
    if(req.query.page) page = Number(req.query.page);
    User.paginate({}, { select: 'email fullName roles', page, limit: 10 }).then( doc => res.send(doc))
                  .catch( e => {
                        res.status(400);
                        res.send(e);
                  });
}

exports.userView = function(req, res) {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findOne({ _id: id})
        .select('fullName email phone isBlocked isConfirmed age isSuspended address roles')
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

exports.userDelete = function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    User.findOneAndRemove({_id: id}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
}

exports.userCreate =  function(req, res){
    var body = _.pick(req.body, ['fullName','email', 'password', 'phone', 'age', 'address', 'roles']);
    var user = new User(body);
    user.save().then(doc => res.send(doc))
                        .catch(e => {
                        res.status(400);
                        res.send(e);
                    });
}

exports.userUpdate =  function(req, res){
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ['fullName','email', 'password', 'phone', 'age', 'address', 'roles']);

    User.findOneAndUpdate({_id: id}, {$set: body}, {new: true})
    .then(doc => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    })
    .catch(e => res.status(404).send() );
}

exports.logout = function(req, res){
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
};



