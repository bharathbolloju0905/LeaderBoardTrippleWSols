const mongoose = require('mongoose');


const userSchema =  mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    img:{
        type: String,
        default: "https://avatar.iran.liara.run/public/34"
    },
    points:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("User", userSchema);