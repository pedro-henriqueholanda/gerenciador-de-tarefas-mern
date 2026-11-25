import { transacoesMock } from "../data/transacoesMock";

// Implementação em memória da mesma interface do transactionService.
// Os dados voltam ao estado inicial quando a página é recarregada.
let banco = transacoesMock.map((transacao) => ({ ...transacao }));

const ATRASO_MS = 150;
const esperar = () => new Promise((resolve) => setTimeout(resolve, ATRASO_MS));

function paraIso(dataInput) {
  return `${dataInput}T00:00:00.000Z`;
}

export async function listar() {
  await esperar();
  return banco.map((transacao) => ({ ...transacao }));
}

export async function criar(dados) {
  await esperar();
  const nova = { ...dados, _id: crypto.randomUUID(), date: paraIso(dados.date) };
  banco = [nova, ...banco];
  return { ...nova };
}

export async function atualizar(id, dados) {
  await esperar();
  const atualizada = { ...dados, _id: id, date: paraIso(dados.date) };
  banco = banco.map((transacao) => (transacao._id === id ? atualizada : transacao));
  return { ...atualizada };
}

export async function excluir(id) {
  await esperar();
  banco = banco.filter((transacao) => transacao._id !== id);
}
