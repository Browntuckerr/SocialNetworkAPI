const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
    reactionId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal)=> moveMessagePortToContext(createdAtVal).format("MM DD, YYYY [at] hh:mm")
    }
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
)
module.exports = reactionSchema;