const path = require("path");
const fs = require("fs");

// Pasta onde as imagens serão salvas
const LOOKS_DIR = path.join(__dirname, "../../uploads");

// Garante que a pasta existe
if (!fs.existsSync(LOOKS_DIR)) {
  fs.mkdirSync(LOOKS_DIR, { recursive: true });
}

// Função para upload de look (imagem)
function uploadLook(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "Nenhum arquivo enviado" });
  }
  // Aqui você pode salvar informações do look no banco, se desejar
  res
    .status(201)
    .json({ message: "Look enviado com sucesso", filename: req.file.filename });
}

// Função para listar looks (apenas nomes dos arquivos por enquanto)
function listLooks(req, res) {
  fs.readdir(LOOKS_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao listar looks" });
    }
    res.json({ looks: files });
  });
}

module.exports = { uploadLook, listLooks };
