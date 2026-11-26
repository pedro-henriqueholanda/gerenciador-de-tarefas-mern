import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { entrar } from "../services/authService";
import { mensagemDeErro, validarLogin } from "../utils/format";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errosCampos, setErrosCampos] = useState({});
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { token, login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  if (token) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    const erros = validarLogin({ email, password });
    setErrosCampos(erros);
    if (Object.keys(erros).length > 0) return;

    setCarregando(true);
    try {
      login(await entrar(email.trim(), password));
      navigate("/dashboard");
    } catch (err) {
      setErro(mensagemDeErro(err, "E-mail ou senha inválidos"));
      setCarregando(false);
    }
  }

  return (
    <AuthLayout
      titulo="Bem-vindo de volta"
      subtitulo="Entre para acompanhar suas entradas e saídas."
      rodape={
        <>
          Ainda não tem uma conta? <Link to="/cadastro">Criar conta</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="auth-form">
        {state?.cadastrado && !erro && (
          <p className="form-success" role="status">
            Conta criada com sucesso! Entre com seus dados.
          </p>
        )}
        {erro && (
          <p className="form-error" role="alert">
            {erro}
          </p>
        )}
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
          placeholder="Sua senha"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          erro={errosCampos.password}
        />
        <button type="submit" className="button button-primary auth-submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </AuthLayout>
  );
}
