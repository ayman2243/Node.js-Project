//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var { Permission } = require('./permission');

var RoleSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true,
        minlength: 1,
        unique: true
    },
    permissions:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Permission",
            validate: {
                isAsync: true,
                validator: function (value) {
                    return Permission.findOne({ _id: value })
                        .then(doc => {
                            if (!doc) {
                                return false;
                            }
                            return true;
                        })
                        .catch(e => {
                            return false;
                        });
                },
                message: '{VALUE} - لا توجد تصريح يحمل هذا التعريف'
            }
        }
    }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

RoleSchema.plugin(mongoosePaginate);

RoleSchema.index({"$**": 'text'});

RoleSchema.pre('find', autoPopulation);

RoleSchema.pre('findOne', autoPopulation);

function autoPopulation(next) {
    this.populate('permissions._id');
    next();
}

var Role = mongoose.model('Role', RoleSchema);

module.exports = { Role };


