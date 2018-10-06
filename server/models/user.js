//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid Email'
    }
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isConfirmed: {
    type: Boolean,
    required: true,
    default: false
  },
  signupDate: {
    type: Date,
    default: Date.now
  },
  age: {
    type: Number,
    required: true
  },
  isSuspended: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    trim: true,
    minlength: 10,
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  roles: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  }],
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
}, {
    usePushEach: true
  });

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'fullName', 'email', 'phone', 'isBlocked', 'isConfirmed', 'signupDate', 'age', 'isSuspended', 'address', 'roles']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var userInfo = _.pick(user.toObject(), ['fullName', 'email']);
  var token = jwt.sign({ _id: user._id.toHexString(), access, userInfo }, process.env.JWT_SECRET).toString();
  user.tokens.push({ access, token });
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;
  return user.update({
    $pull: {
      tokens: { token }
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.pre('findOneAndUpdate', function (next) {
  if (this._update['$set']['password'] !== undefined) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this._update['$set']['password'], salt, (err, hash) => {
        this.findOneAndUpdate({ _id: this._conditions._id }, { $set: { password: hash } });
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.plugin(mongoosePaginate);
UserSchema.index({ "email": "text" });
var User = mongoose.model("User", UserSchema);

module.exports = { User }
