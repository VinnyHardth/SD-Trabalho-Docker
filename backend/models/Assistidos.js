const mongoose = require('mongoose');
const {assistidosDB} = require("../db2");

const Assistidos = assistidosDB.model('Assistidos', new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }
}));

module.exports = Assistidos; 