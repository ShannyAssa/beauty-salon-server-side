const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    id: {type: String, required: true},
    gender: {type: String, required: true},
    birthday: {type: Date, required: true},
    email: {type: String, equired: true, unique: true},
    phoneNumber: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('Customers', customerSchema);