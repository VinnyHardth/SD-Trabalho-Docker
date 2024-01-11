const mongoose = require("mongoose");

const dbUrl = "mongodb://db-paraAssistir/volume1";

const paraAssistirDB =  mongoose.createConnection(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("Conectado ao MongoDB-paraAssistir: " + dbUrl);


const close = () => paraAssistirDB.close();

module.exports = { paraAssistirDB, close, url: dbUrl };
