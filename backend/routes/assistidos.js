const express = require("express");
const validateId = require("../middleware/validateId");
const Assistidos = require("../models/Assistidos");

const router = express.Router();

router.get("/", async (req, res) => {
  const assistidos = await Assistidos.find().sort("title");
  res.send(assistidos);
});

router.get("/:id", validateId, async (req, res) => {
  const assistidos = await Assistidos.findById(req.params.id);
  if (!assistidos) return res.status(404).send();
  res.send(assistidos);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("O título é obrigatório.");

  const assistidos = new Assistidos({ title: req.body.title });
  await assistidos.save();
  res.status(201).send(assistidos);
});

router.delete("/:id", async (req, res) => {
  const assistidos = await Assistidos.findByIdAndDelete(req.params.id);

  if (!assistidos)
    return res.status(404).send("O filme assistido com o ID fornecido não foi encontrada.");

  res.status(204).send();
});

module.exports = router;
