const mongoose = require("mongoose")
const { moveMessagePortToContext } = require("worker_threads")
const Schema = mongoose.Schema

const thoughtSchema = new Schema({
    thoughtText:{
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moveMessagePortToContext(createdAtVal).format("MM DD, YYYY [at] hh:mm")
    },
    
    username: {
        type: String,
        required: true
    },
    reactions: [
        {
            type: Schema.Types.ObjectId, 
            ref: "reactionSchema"
        }
    ]
    
    
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
)
userSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
}) 
const thought = model("Thought", userSchema);
module.exports = thought;