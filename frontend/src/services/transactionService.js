import api from "./api";
import * as mock from "./transactionMock";

// Com VITE_USE_MOCK=true o frontend funciona sem backend, usando dados simulados.
const usarMock = import.meta.env.VITE_USE_MOCK === "true";

// O campo "value" é Decimal128 no MongoDB e o JSON chega como { $numberDecimal: "1500.00" }.
// Converte para número para que somas e formatação funcionem.
function paraNumero(valor) {
  if (valor && typeof valor === "object" && "$numberDecimal" in valor) {
    return Number(valor.$numberDecimal);
  }
  return Number(valor);
}

export function normalizar(transacao) {
  return { ...transacao, value: paraNumero(transacao.value) };
}

// Monta o corpo exatamente como o backend espera.
function montarPayload({ type, value, category, description, date }) {
  return {
    type,
    value: Number(value),
    category: category.trim(),
    description: description.trim(),
    date,
  };
}

export async function listar() {
  if (usarMock) return (await mock.listar()).map(normalizar);
  const res = await api.get("/transactions");
  return res.data.map(normalizar);
}

export async function criar(dados) {
  const payload = montarPayload(dados);
  if (usarMock) return normalizar(await mock.criar(payload));
  const res = await api.post("/transactions", payload);
  return normalizar(res.data);
}

export async function atualizar(id, dados) {
  const payload = montarPayload(dados);
  if (usarMock) return normalizar(await mock.atualizar(id, payload));
  const res = await api.put(`/transactions/${id}`, payload);
  return normalizar(res.data);
}

export async function excluir(id) {
  if (usarMock) return mock.excluir(id);
  await api.delete(`/transactions/${id}`);
}

export const modoDemonstracao = usarMock;
