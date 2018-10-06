//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var { Topic } = require('./topic');

var DocumentationExplanationSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
        unique: true
    },

    type: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
        enum: ['type1', 'type2', 'type3', 'type4', 'type5']
        // type 1 : كتب التفسير الميسندة المطبوعة
        // type 2 : كنب التفسير المسندة المفقودة وما في حكمها
        // type 3 : كتب علوم القرآن المسندة
        // type 4 : كتب الحديث المسندة
        // type 5 : ما سوي ذلك من كتب الفقة و اللغة والادب و التراجم المسندة
    },

    description: {
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
            message: '{VALUE} - لا توجد موضوع يحمل هذا الاسم'
        }
    }
}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

DocumentationExplanationSchema.virtual('information', {
    ref: 'Topic',
    localField: 'description',
    foreignField: 'headline',
    justOne: true
});

DocumentationExplanationSchema.plugin(mongoosePaginate);

DocumentationExplanationSchema.index({ '$**': 'text' });

DocumentationExplanationSchema.pre('find', autoPopulation);

DocumentationExplanationSchema.pre('findOne', autoPopulation);

function autoPopulation(next) {
    this.populate('information');
    next();
}

var DocumentationExplanation = mongoose.model('DocumentationExplanation', DocumentationExplanationSchema);

module.exports = { DocumentationExplanation };