//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test' || env === 'production') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}