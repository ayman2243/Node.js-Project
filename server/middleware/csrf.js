//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const csrf = require('csurf');

var csrf_Error_Handler = function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    res.status(403);
    res.send('Error, CSRF Token is not valid!');
};

module.exports = {csrf, csrf_Error_Handler}