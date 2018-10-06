//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var PermissionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    action:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
}, { toJSON: { virtuals: true } });

PermissionSchema.plugin(mongoosePaginate);

PermissionSchema.index({"$**": 'text'});

var Permission = mongoose.model('Permission', PermissionSchema);

module.exports = { Permission };


