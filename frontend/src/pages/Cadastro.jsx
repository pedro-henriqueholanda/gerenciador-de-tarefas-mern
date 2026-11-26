import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { cadastrar } from "../services/authService";
import { mensagemDeErro, validarCadastro } from "../utils/format";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errosCampos, setErrosCampos] = useState({});
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  if (token) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    const erros = validarCadastro({ name, email, password, confirmarSenha });
    setErrosCampos(erros);
    if (Object.keys(erros).length > 0) return;

    setCarregando(true);
    try {
      await cadastrar({ name: name.trim(), email: email.trim(), password });
      navigate("/login", { state: { cadastrado: true } });
    } catch (err) {
      setErro(mensagemDeErro(err, "Erro ao cadastrar. Tente novamente."));
      setCarregando(false);
    }
  }

  return (
    <AuthLayout
      titulo="Crie sua conta"
      subtitulo="Leva menos de um minuto para começar a organizar suas finanças."
      rodape={
        <>
          Já tem uma conta? <Link to="/login">Fazer login</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="auth-form">
        {erro && (
          <p className="form-error" role="alert">
            {erro}
          </p>
        )}
        <FormField
          label="Nome"
          placeholder="Como devemos te chamar?"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          erro={errosCampos.name}
        />
        <FormField
          label="E-mail"
          type="email"
          placeholder="voce@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          erro={errosCampos.email}
        />
        <FormField
          label="Senha"
          type="password"
          placeholder="Mínimo de 6 caracteres"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          erro={errosCampos.password}
        />
        <FormField
          label="Confirmar senha"
          type="password"
          placeholder="Repita a senha"
          autoComplete="new-password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          erro={errosCampos.confirmarSenha}
        />
        <button type="submit" className="button button-primary auth-submit" disabled={carregando}>
          {carregando ? "Cadastrando..." : "Criar conta"}
        </button>
      </form>
    </AuthLayout>
  );
}
