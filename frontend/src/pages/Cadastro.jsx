import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/registro", { name, email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setErro("E-mail ou senha inválidos");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Entrar</button>
    </form>
  );
}