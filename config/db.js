const mongoose= require("mongoose");
const mongoDBConnection = mongoose.connect('mongodb+srv://Imesa:Imesa121@cluster0.cb366gq.mongodb.net/Quest')

module.exports = mongoDBConnection;