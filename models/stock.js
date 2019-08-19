const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name: String,
    ticker: String
});

module.exports = mongoose.model('Stock', stockSchema);