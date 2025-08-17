const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Cadastro de usuário
async function signup(req, res) {
  const { username, password } = req.body;
  try {
    // Verifica se usuário já existe
    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Usuário já existe" });
    }
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);
    // Salva usuário
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);
    return res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro no servidor", error: err.message });
  }
}

// Login de usuário
async function login(req, res) {
  const { username, password } = req.body;
  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = userResult.rows[0];
    if (!user) {
      return res.status(400).json({ message: "Usuário ou senha inválidos" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Usuário ou senha inválidos" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.json({ token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro no servidor", error: err.message });
  }
}

module.exports = { signup, login };
