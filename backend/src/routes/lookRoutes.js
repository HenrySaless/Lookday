const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Placeholder: upload de look
router.post("/upload", authMiddleware, (req, res) => {
  // Aqui você pode implementar o upload de look
  res.json({ message: "Look enviado com sucesso" });
});

// Placeholder: listagem de looks
router.get("/", authMiddleware, (req, res) => {
  // Aqui você pode listar os looks do usuário
  res.json({ message: "Lista de looks", looks: [] });
});

module.exports = router;
