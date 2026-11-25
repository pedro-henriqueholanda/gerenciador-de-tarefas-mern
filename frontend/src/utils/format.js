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
