const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
       match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Email Error"]
        
    },
    thoughts: [
    {
        type: Schema.Types.ObjectId, 
        ref: "Thought"
    }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
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
userSchema.virtual("friendCount").get(function(){
    return this.friends.length
}) 
const User = mongoose.model("User", userSchema)
module.exports = User