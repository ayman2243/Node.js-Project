//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var { Topic } = require('./topic');

var InterpreterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },

    type: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        enum: ['type1', 'type2', 'type3', 'type4']
        // type1: صحابي
        // type2: تابع
        // type3: أتباع التابعين
        // type4: ما بعد تابعي التابعين
    },

    rank: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        enum: ['rank1', 'rank2', 'rank3', 'rank4']
        // rank1: مكثرون
        // rank2: مقلون
        // rank3: أقل من ١٠٠ 
    },

    subRank: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        enum: [
            'rank1_1', 'rank1_2', 'rank1_3', 'rank1_4',
            'rank2_1', 'rank2_2', 'rank2_3', 'rank2_4',
            'rank3_1', 'rank3_2', 'rank3_3', 'rank3_4'
        ]
        // rank1_1: طبقة اولي
        // rank1_2: طبقة ثانية 
        // rank1_3: طبقة ثالثة
        // rank1_4: طبقة رابعة

        // rank2_1: 400 - 500
        // rank2_2: 300 - 400
        // rank2_3: 200 - 300
        // rank2_4: 100 - 200

        // rank3_1: أبي موسي
        // rank3_2: زيد بن ثابت
        // rank3_3: إبن عمرو
        // rank3_4: إبن الزبير
    },

    dateDeath: {
        type: String,
        trim: true
    },

    numbersExplanation: {
        type: Number,
        trim: true
    },

    information: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        validate: {
            isAsync: true,
            validator: function (value) {
                return Topic.findOne({ headline: value })
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
            message: '{VALUE} - لا يوجد موضوع يحمل هذا العنوان'
        }
    }

}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

InterpreterSchema.virtual('fullInfo', {
    ref: 'Topic',
    localField: 'information',
    foreignField: 'headline',
    type: String,
    justOne: true,
    required: true,
    minlength: 1,
    trim: true
});

InterpreterSchema.plugin(mongoosePaginate);

InterpreterSchema.index({ "$**": 'text' });

InterpreterSchema.pre('find', autoPopulation);

InterpreterSchema.pre('findOne', autoPopulation);

function autoPopulation(next) {
    this.populate('informations');
    next();
}

var Interpreter = mongoose.model('Interpreter', InterpreterSchema);

module.exports = { Interpreter };


