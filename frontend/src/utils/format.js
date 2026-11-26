export function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// O backend guarda a data à meia-noite UTC. Formatar em UTC evita exibir o dia anterior
// em fusos a oeste de Greenwich (como o de Brasília, UTC-3).
export function formatarData(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

// <input type="date"> espera "aaaa-mm-dd"; o backend devolve ISO completo.
export function paraInputData(iso) {
  return iso ? String(iso).slice(0, 10) : "";
}

// Data de hoje no fuso local, no formato do <input type="date">.
export function hojeParaInput() {
  const agora = new Date();
  return [
    agora.getFullYear(),
    String(agora.getMonth() + 1).padStart(2, "0"),
    String(agora.getDate()).padStart(2, "0"),
  ].join("-");
}

// Traduz um erro do axios na mensagem mostrada ao usuário.
// O backend responde { message } ou { message, errors: [...] } (validação do Mongoose).
export function mensagemDeErro(err, padrao = "Algo deu errado. Tente novamente.") {
  if (!err.response) {
    return "Não foi possível conectar ao servidor. Verifique se a API está no ar.";
  }

  const { message, errors } = err.response.data ?? {};

  if (Array.isArray(errors) && errors.length > 0) {
    return errors.join(" ");
  }

  return message || padrao;
}

export const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Validações dos formulários de autenticação: retornam { campo: "mensagem" }.
export function validarLogin({ email, password }) {
  const erros = {};
  if (!email.trim()) erros.email = "Informe seu e-mail.";
  else if (!EMAIL_VALIDO.test(email.trim())) erros.email = "Digite um e-mail válido.";
  if (!password) erros.password = "Informe sua senha.";
  return erros;
}

export function validarCadastro({ name, email, password, confirmarSenha }) {
  const erros = {};
  if (name.trim().length < 2) erros.name = "Informe seu nome (mínimo 2 letras).";
  if (!email.trim()) erros.email = "Informe seu e-mail.";
  else if (!EMAIL_VALIDO.test(email.trim())) erros.email = "Digite um e-mail válido.";
  if (password.length < 6) erros.password = "A senha deve ter pelo menos 6 caracteres.";
  if (!confirmarSenha) erros.confirmarSenha = "Repita a senha.";
  else if (confirmarSenha !== password) erros.confirmarSenha = "As senhas não coincidem.";
  return erros;
}
