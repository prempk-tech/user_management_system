const mongoose = require('mongoose');

const Registeruser = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    user_token: {
        type: String,
        required: true
    },
    user_timestamp: {
        type: String,
        required: true
    }

})
const  user = mongoose.model('Reguser', Registeruser)

module.exports = user