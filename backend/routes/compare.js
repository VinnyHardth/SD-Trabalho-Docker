const express = require("express");
const ParaAssistir = require("../models/ParaAssistir");
const Assistidos = require("../models/Assistidos");

const router = express.Router();

router.get("/:title", async (req, res) => {
  const {title} = req.params;
  const paraAssistir = await ParaAssistir.findOne({title: title});
  const assistido = await Assistidos.findOne({title: title});

  res.send({
    paraAssistir,
    assistido
  });
});


module.exports = router;