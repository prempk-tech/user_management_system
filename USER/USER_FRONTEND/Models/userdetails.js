const mongoose = require('mongoose');

const userdetails = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    Firstname: {
        type: String,
        required: true
    },
    Lastname:{
        type: String,
        required: true
    },
    EmailAddress: {
        type: String,
        required: true
    },
    user_timestamp: {
        type: String,
        required: true
    }

})
const userdet = mongoose.model('userdetails', userdetails)

module.exports = userdet;