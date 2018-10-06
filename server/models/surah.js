//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var { Folder } = require('./folder');

var SurahSchema = new mongoose.Schema({
    surahName: {
        type:  String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    surahNumber: {
        type:  Number,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    numberOfAyat:{
        type: Number,
        required: true,
        trim: true,
        minlength: 1 
    },

    folder_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
        trim: true,
        minlength: 1,
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

    pageNumber:{
        type: Number,
        required: true,
        trim: true,
        minlength: 1 
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

SurahSchema.plugin(mongoosePaginate);

SurahSchema.index({"$**": 'text'});

SurahSchema.pre('find', autoPopulation);

SurahSchema.pre('findOne', autoPopulation);

function autoPopulation(next) {
    this.populate("folder_id");
    next();
}

var Surah = mongoose.model('Surah', SurahSchema);

module.exports = { Surah };
