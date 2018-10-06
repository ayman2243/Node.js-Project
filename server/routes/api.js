//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var {authenticate} = require('../middleware/authenticate');
const routerApi = require('express').Router();

var user_controller = require('../controllers/userController');
var folder_controller = require('../controllers/folderController');
var annotation_controller = require('../controllers/annotationController');
var interpreter_controller = require('../controllers/interpreterController');
var resource_controller = require('../controllers/resourceController');
var topic_controller = require('../controllers/topicController');
var surah_controller = require('../controllers/surahController');
var aya_controller = require('../controllers/ayaController');
var title_controller = require('../controllers/titleController');
var point_controller = require('../controllers/pointController');
var symbol_controller = require('../controllers/symbolController');
var privateAnnotation_controller = require('../controllers/privateAnnotationController');
var publicAnnotation_controller = require('../controllers/publicAnnotationController');
var subjectIndex_controller = require('../controllers/subjectIndexController');
var search_controller = require('../controllers/searchController');
var role_controller = require('../controllers/roleController');
var permission_controller = require('../controllers/permissionController');
var sendFeedBack_controller=require('../controllers/sendFeedBackController');
var websiteSetting_controller=require('../controllers/websiteSettingcontroller');
var researchteam_controller = require('../controllers/researchTeamController');
var anonymoususer_controller = require('../controllers/anonymousUserController');
var timeline_controller = require('../controllers/timelineController');
var documentationExplanation_controller = require('../controllers/documentationExplanationController')

// Auth Routes
routerApi.post('/auth/register', user_controller.register);
routerApi.post('/auth/login', user_controller.login);
routerApi.get('/auth/me', authenticate, user_controller.myProfile);
routerApi.patch('/auth/update-profile', authenticate, user_controller.updateProfile);
routerApi.delete('/auth/logout', authenticate, user_controller.logout);

// Users Routes
routerApi.get('/users/all', authenticate, user_controller.viewAllUsers);
routerApi.get('/user/:id', authenticate, user_controller.userView);
routerApi.post('/user', authenticate, user_controller.userCreate);
routerApi.patch('/user/:id', authenticate, user_controller.userUpdate);
routerApi.delete('/user/:id', authenticate, user_controller.userDelete);

// Search Route
routerApi.get('/search/:searchString/:searchCriteria',search_controller.Search);
routerApi.get('/usersearch/:searchString',search_controller.searchUser);
routerApi.get('/timesearch/:searchString',search_controller.timelineSearch);

// Roles Routes
routerApi.get('/roles', role_controller.role_list);
routerApi.get('/role/:id', role_controller.role_view);
routerApi.post('/role', authenticate, role_controller.role_create);
routerApi.patch('/role/:id', authenticate, role_controller.role_update);
routerApi.delete('/role/:id', authenticate, role_controller.role_delete);

// Permissions Routes
routerApi.get('/permissions', permission_controller.permission_list);
routerApi.get('/permission/:id', permission_controller.permission_view);
routerApi.patch('/permission/:id', authenticate, permission_controller.permission_update);
routerApi.delete('/permission/:id', authenticate, permission_controller.permission_delete);
routerApi.post('/permission', authenticate, permission_controller.permission_create);

// Folders Routes
routerApi.get('/folders/noPagination', folder_controller.folder_list_without_pagination);
routerApi.get('/folders', folder_controller.folder_list);
routerApi.get('/folder/:id', folder_controller.folder_view);
routerApi.post('/folder', authenticate, folder_controller.folder_create);
routerApi.patch('/folder/:id', authenticate, folder_controller.folder_update);
routerApi.delete('/folder/:id', authenticate, folder_controller.folder_delete);


// Annotation Routes
routerApi.get('/annotation', annotation_controller.annotation_list);
routerApi.get('/annotation/:id', annotation_controller.annotation_view);
routerApi.post('/annotation', authenticate, annotation_controller.annotation_create);
routerApi.patch('/annotation/:id', authenticate, annotation_controller.annotation_update);
routerApi.delete('/annotation/:id', authenticate, annotation_controller.annotation_delete);

// Interpreters Routes
routerApi.get('/interpreters', interpreter_controller.interpreter_list);
routerApi.get('/interpreter/:id', interpreter_controller.interpreter_view);
routerApi.post('/interpreter', authenticate, interpreter_controller.interpreter_create);
routerApi.patch('/interpreter/:id', authenticate, interpreter_controller.interpreter_update);
routerApi.delete('/interpreter/:id', authenticate, interpreter_controller.interpreter_delete);

// Resources Routes
routerApi.get('/resources', resource_controller.resource_list);
routerApi.get('/resource/:id', resource_controller.resource_view);
routerApi.post('/resource', authenticate, resource_controller.resource_create);
routerApi.patch('/resource/:id', authenticate, resource_controller.resource_update);
routerApi.delete('/resource/:id', authenticate, resource_controller.resource_delete);

// Topics Routes
routerApi.get('/topics', topic_controller.topic_list);
routerApi.get('/topic/:id', topic_controller.topic_view);
routerApi.post('/topic', authenticate, topic_controller.topic_create);
routerApi.patch('/topic/:id', authenticate, topic_controller.topic_update);
routerApi.delete('/topic/:id', authenticate, topic_controller.topic_delete);

// Sowar Routes
routerApi.get('/surah', surah_controller.surah_list);
routerApi.get('/surah/:id', surah_controller.surah_view);
routerApi.post('/surah', authenticate, surah_controller.surah_create);
routerApi.patch('/surah/:id', authenticate, surah_controller.surah_update);
routerApi.delete('/surah/:id', authenticate, surah_controller.surah_delete);

// Ayat Routes
routerApi.get('/aya', aya_controller.aya_list);
routerApi.get('/aya/:id', aya_controller.aya_view);
routerApi.post('/aya', authenticate, aya_controller.aya_create);
routerApi.patch('/aya/:id', authenticate, aya_controller.aya_update);
routerApi.delete('/aya/:id', authenticate, aya_controller.aya_delete);

// Titles Routes
routerApi.get('/titles', title_controller.title_list);
routerApi.get('/title/:id', title_controller.title_view);
routerApi.post('/title', authenticate, title_controller.title_create);
routerApi.patch('/title/:id', authenticate, title_controller.title_update);
routerApi.delete('/title/:id', authenticate,title_controller.title_delete);

// Points Routes
routerApi.get('/point', point_controller.point_list);
routerApi.get('/point/:id', point_controller.point_view);
routerApi.post('/point', authenticate, point_controller.point_create);
routerApi.patch('/point/:id', authenticate, point_controller.point_update);
routerApi.delete('/point/:id', authenticate, point_controller.point_delete);

// Symbols Routes
routerApi.get('/symbol', symbol_controller.symbol_list);
routerApi.get('/symbol/:id', symbol_controller.symbol_view);
routerApi.post('/symbol', authenticate, symbol_controller.symbol_create);
routerApi.patch('/symbol/:id', authenticate, symbol_controller.symbol_update);
routerApi.delete('/symbol/:id', authenticate, symbol_controller.symbol_delete);

// privateAnnotation Routes
routerApi.get('/privateAnnotation', privateAnnotation_controller.privateAnnotation_list);
routerApi.get('/privateAnnotation/:id', privateAnnotation_controller.privateAnnotation_view);
routerApi.post('/privateAnnotation', authenticate, privateAnnotation_controller.privateAnnotation_creat);
routerApi.patch('/privateAnnotation/:id', authenticate, privateAnnotation_controller.privateAnnotation_update);
routerApi.delete('/privateAnnotation/:id', authenticate, privateAnnotation_controller.privateAnnotation_delete);

// publicAnnotation Routes
routerApi.get('/publicAnnotation', publicAnnotation_controller.publicAnnotation_list);
routerApi.get('/publicAnnotation/:id', publicAnnotation_controller.publicAnnotation_view);
routerApi.post('/publicAnnotation', authenticate, publicAnnotation_controller.publicAnnotation_creat);
routerApi.patch('/publicAnnotation/:id', authenticate, publicAnnotation_controller.publicAnnotation_update);
routerApi.delete('/publicAnnotation/:id', authenticate, publicAnnotation_controller.publicAnnotation_delete);

// subjectIndex Routes
routerApi.get('/subjectIndexs', subjectIndex_controller.subjectindex_list);
routerApi.get('/subjectIndex/:id', subjectIndex_controller.subjectindex_view);
routerApi.post('/subjectIndex', authenticate, subjectIndex_controller.subjectindex_creat);
routerApi.patch('/subjectIndex/:id',authenticate, subjectIndex_controller.subjectindex_update);
routerApi.delete('/subjectIndex/:id', authenticate, subjectIndex_controller.subjectindex_delete);

// Feedback Routes
routerApi.get('/feedbacks', authenticate, sendFeedBack_controller.feedback_list);
routerApi.get('/feedback/:id', authenticate, sendFeedBack_controller.feedback_view);
routerApi.post('/sendFeedBack', sendFeedBack_controller.feedBack_create);
routerApi.post('/replyfeedback', authenticate, sendFeedBack_controller.feedback_Reply);
routerApi.delete('/feedback/:id', authenticate, sendFeedBack_controller.feedback_delete);

// WebSite Settings Routes
routerApi.get('/websitesettings', authenticate, websiteSetting_controller.websitesetting_list);
routerApi.patch('/websiteSettings', authenticate, websiteSetting_controller.websitesetting_update);


// Research Team Routes 
routerApi.get('/researchteam', researchteam_controller.researchTeam_list);
routerApi.get('/researchteam/:id', researchteam_controller.researchTeam_view);
routerApi.post('/researchteam', authenticate, researchteam_controller.researchTeam_create);
routerApi.patch('/researchteam/:id', authenticate, researchteam_controller.researchTeam_update);
routerApi.delete('/researchteam/:id', authenticate, researchteam_controller.researchTeam_delete );

// Anonymous User Routes
routerApi.get('/anonymoususer', authenticate, anonymoususer_controller.anonymous_list);
routerApi.get('/anonymoususer/:id', authenticate, anonymoususer_controller.anonymous_view);
routerApi.post('/anonymoususer', authenticate, anonymoususer_controller.anonymous_create);
routerApi.patch('/anonymoususer/:id', authenticate, anonymoususer_controller.anonymous_update);
routerApi.delete('/anonymoususer/:id', authenticate, anonymoususer_controller.anonymous_delete);

// Timeline Routes
routerApi.get('/timelines', timeline_controller.timeline_list);
routerApi.get('/timeline/:id', timeline_controller.timeline_view);
routerApi.post('/timeline', authenticate, timeline_controller.timeline_create);
routerApi.patch('/timeline/:id', authenticate, timeline_controller.timeline_update);
routerApi.delete('/timeline/:id', authenticate, timeline_controller.timeline_delete);


// Documentation Explanation Routes 
routerApi.get('/documentationexplanation', documentationExplanation_controller.documentationExplanation_list);
routerApi.get('/documentationexplanation/:id', documentationExplanation_controller.documentationExplanation_view);
routerApi.post('/documentationexplanation',  authenticate, documentationExplanation_controller.documentationExplanation_creat);
routerApi.patch('/documentationexplanation/:id',  authenticate, documentationExplanation_controller.documentationExplanation_update);
routerApi.delete('/documentationexplanation/:id',  authenticate,documentationExplanation_controller.documentationExplanation_delete);

routerApi.get('*', (req, res) => {
    res.status(404);
    res.send({message: 'Invalid URL!'});
});

module.exports = { routerApi };