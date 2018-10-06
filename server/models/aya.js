//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var { Folder } = require('./folder');
var { Surah } = require('./surah');
var AyaSchema = new mongoose.Schema({

    surah_id: {
        type: String,
        required: true,
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
            message: '{VALUE} - لا توجد سورة تحمل هذا الاسم'
        }
    },

    ayaNumber: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1
    },

    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },

    folder_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Folder",
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
    },

    pageNumber: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1
    }

}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

AyaSchema.virtual('surah', {
    ref: 'Surah',
    localField: 'surah_id',
    foreignField: 'surahName',
    justOne: true
});

AyaSchema.plugin(mongoosePaginate);

AyaSchema.index({ "$**": 'text' });

AyaSchema.pre('find', autoPopulation);

AyaSchema.pre('findOne', autoPopulation);

function autoPopulation(next) {
    this.populate('folder_id')
        .populate('surah');
    next();
}

var Aya = mongoose.model('Aya', AyaSchema);

module.exports = { Aya };
