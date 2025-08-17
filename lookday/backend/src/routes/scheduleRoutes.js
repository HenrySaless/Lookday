const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Placeholder: gerar look para agenda
router.post("/generate", authMiddleware, (req, res) => {
  // Aqui você pode implementar a lógica de geração de look
  res.json({ message: "Look gerado para a agenda" });
});

// Placeholder: confirmar look
router.post("/confirm", authMiddleware, (req, res) => {
  // Aqui você pode implementar a confirmação do look
  res.json({ message: "Look confirmado" });
});

module.exports = router;
