//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ResearchTeamSchema = new mongoose.Schema({
    name: {
        type:  String,
        required: true,
    },
    scientificDegree:{
        type: String ,
        required: true
    },
    role:{
        type:String ,
        required: true
    },
    committee:{
        type: String ,
        required: true
    }
}, { toJSON: { virtuals: true } });

ResearchTeamSchema.plugin(mongoosePaginate);

ResearchTeamSchema.index({"$**": 'text'});

var ResearchTeam = mongoose.model('ResearchTeam', ResearchTeamSchema);

module.exports = { ResearchTeam };
