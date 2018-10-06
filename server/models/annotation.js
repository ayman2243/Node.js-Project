//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var { Folder } = require('./folder');
var mongoosePaginate = require('mongoose-paginate');

var AnnotationSchema = new mongoose.Schema({

    type: {
        type: String,
        minlength: 1,
        trim: true,
        enum: ['public', 'private'],
        required: true
    },

    privateType: {
        type: String,
        trim: true,
        enum: ['instructions', 'comments']
    },

    publicNumber: {
        type: Number,
        minlength: 1,
        trim: true,
        unique: function () {
            return this.type === 'public';
        }
    },

    pageNumber: {
        type: Number,
        minlength: 1,
        trim: true,
        required: true
    },

    body: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },

    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        required: true,
        validate: {
            isAsync: true,
            validator: function (value) {
                return Folder.findOne({ _id: value })
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
            message: '{VALUE} - لا يوجد مجلد يحمل هذا التعريف'
        }
    }

}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });


AnnotationSchema.plugin(mongoosePaginate);

AnnotationSchema.index({ "body": 'text' });

AnnotationSchema.pre('find', autoPopulation);

AnnotationSchema.pre('findOne', autoPopulation);

function autoPopulation(next) {
    this.populate('folder');
    next();
}

var Annotation = mongoose.model('Annotation', AnnotationSchema);

module.exports = { Annotation };


