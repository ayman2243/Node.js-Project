//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var { Topic } = require('./topic');

var TimelineSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 1,
        required: true,
        unique: true
    },

    date: {
        type: String,
        required: true,
        minlength: 1,
        required: true
    },

    description: {
        type: String,
        minlength: 1,
        trim: true,
        required: true,
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

TimelineSchema.virtual('timelineInfo', {
    ref: "Topic",
    localField: 'description',
    foreignField: 'headline',
    justOne: true
});

TimelineSchema.plugin(mongoosePaginate);

TimelineSchema.index({ '$**': 'text' });

TimelineSchema.pre('find', autoPopulation);

TimelineSchema.pre('findOne', autoPopulation);

function autoPopulation(next) {
    this.populate("timelineInfo");
    next();
}

var Timeline = mongoose.model('Timeline', TimelineSchema);

module.exports = { Timeline };