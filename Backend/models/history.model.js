const mongoose = require('mongoose');


const historySchema =  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    points: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("History", historySchema);