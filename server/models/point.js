//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var { Annotation } = require('./annotation');
var { Folder } = require('./folder');
var { Resource } = require('./resource');
var { DocumentationExplanation } = require('./documentationExplanation');
var { Interpreter } = require('./interpreter');
var { Timeline } = require('./timeline');
var { Surah } = require('./surah');
var { Aya } = require('./aya');
var { Title } = require('./title');


var PointSchema = new mongoose.Schema({

    pointNumber: {
        type: Number,
        minlength: 1,
        trim: true,
        required: true,
        unique: true
    },

    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },

    annotation: [{
        charLocation: {
            type: Number,
            minlength: 1,
            trim: true,
            required: true
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Annotation",
            required: true,
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
    }],

    documents: [{
        _id: {
            required: true,
            type: String,
            minlength: 1,
            trim: true,
            validate: {
                isAsync: true,
                validator: function (value) {
                    return DocumentationExplanation.findOne({ name: value })
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
                message: '{VALUE} - لا توجد مسند تحمل هذا الاسم'
            }
        }
    }],

    folder_id: {
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

    typeOfTafser: {
        enum: ['Quran', 'Sunna', 'loga', 'information', 'israiliyat'],
        required: true,
        type: String,
        minlength: 1,
        trim: true
    },

    interpreters: [{
        _id: {
            required: true,
            type: String,
            minlength: 1,
            trim: true,
            validate: {
                isAsync: true,
                validator: function (value) {
                    return Interpreter.findOne({ name: value })
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
                message: '{VALUE} - لا توجد مفسر يحمل هذا الاسم'
            }
        }
    }],

    timeline_id: {
        required: true,
        type: String,
        minlength: 1,
        trim: true,
        validate: {
            isAsync: true,
            validator: function (value) {
                return Timeline.findOne({ name: value })
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
            message: '{VALUE} - لا توجد وقت زمني يحمل هذا الاسم'
        }
    },

    resources: [{
        _id: {
            required: true,
            type: String,
            minlength: 1,
            trim: true,
            validate: {
                isAsync: true,
                validator: function (value) {
                    return Resource.findOne({ name: value })
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
                message: '{VALUE} - لا توجد مصدر يحمل هذا الاسم'
            }
        }
    }],

    aya_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Aya",
        validate: {
            isAsync: true,
            validator: function (value) {
                return Aya.findOne({ _id: value })
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
            message: '{VALUE} - لا توجد آىة يحمل هذا التعريف'
        }
    },

    surah_id: {
        required: true,
        type: String,
        minlength: 1,
        trim: true,
        validate: {
            isAsync: true,
            validator: function (value) {
                return Surah.findOne({ surahName: value })
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
            message: '{VALUE} - لا توجد سورة يحمل هذا الاسم'
        }
    },

    pageNumber: {
        type: Number,
        minlength: 1,
        trim: true,
        required: true
    },

    title_id: {
        required: true,
        type: String,
        minlength: 1,
        trim: true,
        validate: {
            isAsync: true,
            validator: function (value) {
                return Title.findOne({ name: value })
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
            message: '{VALUE} - لا توجد عنوان يحمل هذا الاسم'
        }
    }

}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });


// surah_id -> surah / surahName
// documents._id -> documents / name - more than 1
// interpreters._id -> interpreters / name - more than 1
// timeline_id -> timeline / name
// resources._id -> resources / name - more than 1
// title_id -> title / name 

PointSchema.virtual('title', {
    ref: "Title",
    localField: 'title_id',
    foreignField: 'name',
    justOne: true
});

PointSchema.virtual('resourcesFull', {
    ref: "Resource",
    localField: 'resources._id',
    foreignField: 'name',
    justOne: false
});

PointSchema.virtual('timeline', {
    ref: "Timeline",
    localField: 'timeline_id',
    foreignField: 'name',
    justOne: true
});

PointSchema.virtual('interpretersFull', {
    ref: "Interpreter",
    localField: 'interpreters._id',
    foreignField: 'name',
    justOne: false
});

PointSchema.virtual('documentsFull', {
    ref: "DocumentationExplanation",
    localField: 'documents._id',
    foreignField: 'name',
    justOne: false
});

PointSchema.virtual('surah', {
    ref: 'Surah',
    localField: 'surah_id',
    foreignField: 'surahName',
    justOne: true
});

PointSchema.plugin(mongoosePaginate);

PointSchema.index({ "$**": 'text' });

PointSchema.pre('find', autoPopulation);

PointSchema.pre('findOne', autoPopulation);

// surah_id -> surah / surahName
// documents._id -> documents / name - more than 1
// interpreters._id -> interpreters / name - more than 1
// timeline_id -> timeline / name
// resources._id -> resources / name - more than 1
// title_id -> title / name

function autoPopulation(next) {
    this.populate('folder_id')
        .populate('surah')
        .populate('aya_id')
        .populate('interpreters')
        .populate('annotation._id')
        .populate('documents')
        .populate('resources')
        .populate('timeline')
        .populate('title');
    next();
}

var Point = mongoose.model('Point', PointSchema);

module.exports = { Point };
