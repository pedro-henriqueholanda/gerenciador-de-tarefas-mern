import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (password !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setCarregando(true);
    try {
      await api.post("/auth/registro", { name, email, password });
      // após cadastrar, redireciona para login
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Erro ao cadastrar. Tente novamente.";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        <button type="submit" disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p>
          Já tem uma conta? <Link to="/login">Fazer login</Link>
        </p>
      </form>
    </div>
  );
}