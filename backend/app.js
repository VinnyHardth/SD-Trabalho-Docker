const express = require("express");
const cors = require("cors");
const homeRoutes = require("./routes/index");
const paraAssistirRoutes = require("./routes/paraAssistir");
const assistidosRoutes = require("./routes/assistidos");
const compareRoutes = require("./routes/compare");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/", homeRoutes);
app.use("/api/paraAssistir", paraAssistirRoutes);
app.use("/api/assistidos", assistidosRoutes);
app.use("/api/compare", compareRoutes);

module.exports = app;
