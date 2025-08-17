const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Placeholder: obter perfil do usuário
router.get("/profile", authMiddleware, (req, res) => {
  // Aqui você pode buscar dados do usuário autenticado (req.user)
  res.json({ message: "Perfil do usuário", user: req.user });
});

// Placeholder: atualizar preferências do usuário
router.put("/preferences", authMiddleware, (req, res) => {
  // Aqui você pode atualizar preferências do usuário
  res.json({ message: "Preferências atualizadas" });
});

module.exports = router;
