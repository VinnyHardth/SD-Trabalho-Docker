const express = require("express");
const validateId = require("../middleware/validateId");
const ParaAssistir = require("../models/ParaAssistir");

const router = express.Router();

router.get("/", async (req, res) => {
  const paraAssistir = await ParaAssistir.find().sort("title");
  res.send(paraAssistir);
});

router.get("/:id", validateId, async (req, res) => {
  const paraAssistir = await ParaAssistir.findById(req.params.id);
  if (!paraAssistir) return res.status(404).send();
  res.send(paraAssistir);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("O título é obrigatório.");

  const paraAssistir = new ParaAssistir({ title: req.body.title });
  await paraAssistir.save();
  res.status(201).send(paraAssistir);
});

router.delete("/:id", async (req, res) => {
  const paraAssistir = await ParaAssistir.findByIdAndDelete(req.params.id);

  if (!paraAssistir)
    return res.status(404).send("O filme para assistir com o ID informado não foi encontrado.");

  res.status(204).send();
});

module.exports = router;
