// Login
const loginForm = document.getElementById("login-form");
const perfilInfo = document.getElementById("perfil-info");
let token = null;

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      token = data.token;
      perfilInfo.textContent = "Login realizado!";
    } else {
      perfilInfo.textContent = data.message || "Erro ao logar";
    }
  });
}

// Upload de looks
const uploadForm = document.getElementById("upload-form");
const uploadResult = document.getElementById("upload-result");

if (uploadForm) {
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!token) {
      uploadResult.textContent = "Faça login primeiro!";
      return;
    }
    const fileInput = document.getElementById("look-file");
    const formData = new FormData();
    formData.append("look", fileInput.files[0]);
    const res = await fetch("/api/looks/upload", {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      uploadResult.textContent = "Look enviado com sucesso!";
    } else {
      uploadResult.textContent = data.message || "Erro ao enviar look";
    }
  });
}
