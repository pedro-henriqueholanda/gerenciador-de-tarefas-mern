// Dados simulados (JSON mock) usados no modo demonstração (VITE_USE_MOCK=true).
// Mesmo formato que a API devolve: _id, type, value, category, description, date.
export const transacoesMock = [
  { _id: "mock-01", type: "entrada", value: 4850, category: "Salário", description: "Pagamento mensal", date: "2026-11-05T00:00:00.000Z" },
  { _id: "mock-02", type: "saida", value: 1250, category: "Moradia", description: "Aluguel do apartamento", date: "2026-11-06T00:00:00.000Z" },
  { _id: "mock-03", type: "saida", value: 348.9, category: "Alimentação", description: "Compras do mês no mercado", date: "2026-11-09T00:00:00.000Z" },
  { _id: "mock-04", type: "entrada", value: 900, category: "Freelance", description: "Site para cliente local", date: "2026-11-12T00:00:00.000Z" },
  { _id: "mock-05", type: "saida", value: 189.5, category: "Transporte", description: "Combustível", date: "2026-11-14T00:00:00.000Z" },
  { _id: "mock-06", type: "saida", value: 59.9, category: "Lazer", description: "Assinatura de streaming", date: "2026-11-18T00:00:00.000Z" },
  { _id: "mock-07", type: "saida", value: 120, category: "Saúde", description: "Consulta de rotina", date: "2026-11-20T00:00:00.000Z" },
];
