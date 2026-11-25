import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { entrar } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { mensagemDeErro } from "../utils/format";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      login(await entrar(email, password));
      navigate("/dashboard");
    } catch (err) {
      setErro(mensagemDeErro(err, "E-mail ou senha inválidos"));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Entrar</button>
      <p>
        Ainda não tem uma conta? <a href="/cadastro">Criar conta</a>
      </p>
    </form>
  );
}