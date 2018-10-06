//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const _ = require('lodash');
var {Aya} = require('../models/aya');
var {Surah} = require('../models/surah');
var {Point} = require('../models/point');
var {Folder} = require('../models/folder');
var {Topic} = require('../models/topic');
var {Title} = require('../models/title');
var {DocumentationExplanation} = require('../models/documentationExplanation');
var {Interpreter} = require('../models/interpreter');
var {Annotation} = require('../models/annotation');
var {User} = require('../models/user');
var {Timeline} = require('../models/timeline');
const utf8_encoder = require('utf8');

//sent searchString Must Be URIEncoded To Pass Properly 

exports.Search= function(req, res) {
    
    var searchString = decodeURIComponent(req.params.searchString);
    var searchCriteria = req.params.searchCriteria;
    let page = 1;
    searchCriteria = _.toLower(searchCriteria);
    if(!searchString ==""){
switch (searchCriteria) {
    case "surah":
    
    if(req.query.page){
        page = Number(req.query.page);
    }
    Surah.paginate({$text: {$search: searchString}}, { page, limit: 10 }).then( doc => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    })
    .catch( e => {
        res.status(400);
        res.send(e);
    });
        break;

    case "aya":
    if(req.query.page){
        page = Number(req.query.page);
    }
    Aya.paginate({$text: {$search: searchString}}, { page, limit: 10 })
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
        break;
        
    case "point":
    if(req.query.page){ page = Number(req.query.page)};
    Point.paginate({$text: {$search: searchString}}, { page, limit: 10 })
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
    break;

    case "interpreter":
    if(req.query.page){ page = Number(req.query.page); };
    Interpreter.paginate({$text: {$search: searchString}}, { page, limit: 10 })
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
    break;

    case "folder":
    if(req.query.page){ page = Number(req.query.page); };
    Folder.paginate({$text: {$search: searchString}}, { page, limit: 10 })
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
    break;

    case "topic":
    if(req.query.page){ page = Number(req.query.page); };
    Topic.paginate({$text: {$search: searchString}}, { page, limit: 10 })
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
    break;

    case "title":
    if(req.query.page){ page = Number(req.query.page); };
    Title.paginate({$text: {$search: searchString}}, { page, limit: 10 })
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
    break;

    case "annotation":
    if(req.query.page){ page = Number(req.query.page); };
    Annotation.paginate({$text: {$search: searchString}}, { page, limit: 10 })
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
    break;

    case "document":
    if(req.query.page){ page = Number(req.query.page); };
    DocumentationExplanation.paginate({$text: {$search: searchString}}, { page, limit: 10 })
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
    break;
    // default:


    //     break;
}
} 
else {
    return res.status(404).send();
}
    

 
};

exports.searchUser= function(req,res) {
    var searchedUserEmail = req.params.searchString
    User.find({$text:{$search:searchedUserEmail}}).then(doc=>{

        if(!doc){
            return res.status(404).send();
        }
        res.send(doc);



    }).catch(e=>{
        res.status(404).send();
        res.send(e);


    })

};

exports.timelineSearch = function (req,res) {
    
    var searchedEra = req.params.searchString
    Timeline.find({$text:{$search:searchedEra}}).then(doc=>{

        if(!doc){
            return res.status(404).send();
        }
        
        Interpreter.findOne({"timeline_id":doc._id}).then(eraData =>{
         
            if(!eraData){
                return res.status(404).send();
            }
            
        res.send(eraData);

        }).catch(e=>{
            res.status(404).send();
            res.send(e);
    
    
        })



    }).catch(e=>{
        res.status(404).send();
        res.send(e);


    })

};
