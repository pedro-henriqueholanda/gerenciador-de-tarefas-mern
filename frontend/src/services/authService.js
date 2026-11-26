import api from "./api";

// Com VITE_USE_MOCK=true o login e o cadastro funcionam sem backend (modo demonstração).
const usarMock = import.meta.env.VITE_USE_MOCK === "true";

export async function entrar(email, password) {
  if (usarMock) return "token-demonstracao";
  const res = await api.post("/auth/login", { email, password });
  return res.data.token;
}

export async function cadastrar({ name, email, password }) {
  if (usarMock) return;
  await api.post("/auth/register", { name, email, password });
}
