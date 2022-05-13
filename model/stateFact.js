const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateFactSchema = new Schema({
    stateCode: {
        type: String,
        required: true,
        unique: true
    },
    funfacts: {
        type: [String],
    },
})

module.exports = mongoose.model('stateFact', stateFactSchema);