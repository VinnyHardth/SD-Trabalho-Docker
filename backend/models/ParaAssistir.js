const mongoose = require("mongoose")
const {paraAssistirDB} = require("../db1");

const paraAssistir = paraAssistirDB.model('paraAssistir', new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }
}));

module.exports = paraAssistir; 