//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var { Annotation } = require('./annotation');
var { Folder } = require('./folder');

var TopicSchema = new mongoose.Schema({

    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
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
            message: '{VALUE} - لا توجد مجلد تحمل هذا التعريف'
        }
    },

    pageNumber: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },

    headline: {
        required: true,
        type: String,
        minlength: 1,
        trim: true,
        unique: true
    },

    body: {
        required: true,
        type: String,
        minlength: 1,
        trim: true
    },

    annotationTitle: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Annotation",
            validate: {
                isAsync: true,
                validator: function (value) {
                    return Annotation.findOne({ _id: value })
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
                message: '{VALUE} - لا توجد حاشية تحمل هذا التعريف'
            }
        },
        charLocation: {
            type: Number,
            minlength: 1,
            trim: true,
            required: true
        }
    }],

    tags: [{
        tag: {
            required: true,
            type: String,
            minlength: 1,
            trim: true
        }
    }],

    annotation: [{
        charLocation: {
            type: Number,
            minlength: 1,
            trim: true,
            required: true
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Annotation",
            validate: {
                isAsync: true,
                validator: function (value) {
                    return Annotation.findOne({ _id: value })
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
                message: '{VALUE} - لا توجد حاشية تحمل هذا التعريف'
            }
        }
    }]

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

TopicSchema.plugin(mongoosePaginate);

TopicSchema.index({ '$**': 'text' });

TopicSchema.pre('find', autoPopulation);

TopicSchema.pre('findOne', autoPopulation);

function autoPopulation(next) {
    this.populate("folder")
        .populate("annotation._id")
        .populate("annotationTitle._id");
    next();
}

var Topic = mongoose.model('Topic', TopicSchema);

module.exports = { Topic };


