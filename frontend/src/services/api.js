import axios from "axios";

// Evento disparado quando a API recusa o token (expirado ou inválido).
// O AuthContext escuta e encerra a sessão, e a rota protegida volta ao login.
export const SESSAO_EXPIRADA = "auth:sessao-expirada";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// injeta o token JWT automaticamente em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    const url = erro.config?.url ?? "";
    // 401 em /auth/* é senha errada no login, não sessão expirada.
    const rotaDeAutenticacao = url.startsWith("/auth/");

    if (
      erro.response?.status === 401 &&
      !rotaDeAutenticacao &&
      localStorage.getItem("token")
    ) {
      window.dispatchEvent(new Event(SESSAO_EXPIRADA));
    }

    return Promise.reject(erro);
  },
);

export default api;
