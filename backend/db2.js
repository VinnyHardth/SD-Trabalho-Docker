const mongoose = require("mongoose");

const dbUrl = "mongodb://db-assistidos/volume2";

const assistidosDB =  mongoose.createConnection(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("Conectado ao MongoDB-assistidos: " + dbUrl);


const close = () => assistidosDB.close();

module.exports = { assistidosDB, close, url: dbUrl };
