# Plano de sprints — Frontend

**Prazo:** apresentação (AP2) nas semanas de **02/12** e **09/12/2026**.
Meta: código congelado e testado até **01/12**; 02/12 é a primeira data possível de
apresentação e 09/12 fica como folga.

**Decisão de domínio:** o tema do projeto é **gerenciador de transações financeiras**
(entidade `Transaction`, relacionada ao `User`), alinhado ao backend. O tema "tarefas"
do material de referência foi substituído.

## Contrato da API usado pelo frontend

| Rota | Corpo / resposta |
|---|---|
| `POST /api/auth/register` | `{ name, email, password }` → `201 { message, userId }` |
| `POST /api/auth/login` | `{ email, password }` → `{ token }` |
| `GET /api/transactions` | lista do usuário, mais recentes primeiro |
| `POST /api/transactions` | `{ type, value, category, description, date }` |
| `PUT /api/transactions/:id` | mesmo corpo do POST |
| `DELETE /api/transactions/:id` | `{ message }` |

Regras do modelo: `type` ∈ `entrada | saida`; `value` > 0; `category` até 50 caracteres;
`description` até 100; `date` obrigatória. Todas as rotas de transações exigem
`Authorization: Bearer <token>`. Erros vêm como `{ message }` ou `{ message, errors[] }`.

> Atenção: `value` é `Decimal128` e o JSON chega como `{ "$numberDecimal": "1500.00" }`.
> O frontend normaliza para número em `services/transactionService.js`.

## Sprint 1 — Integração funcional (25/11 a 27/11)

Objetivo: o fluxo **cadastro → login → CRUD de transações** funciona de ponta a ponta
contra a API real.

- [x] Dashboard do PR #8 convertido de tarefas (dados de exemplo) para transações
- [x] Camada de serviço com listar, criar, editar e excluir (editar não existia)
- [x] Normalização do `Decimal128` e das datas (sem voltar um dia por fuso)
- [x] Mensagens de erro do backend exibidas ao usuário
- [x] Sessão expirada (401) encerra a sessão e volta ao login
- [x] Modo demonstração com dados simulados (`VITE_USE_MOCK=true`), sem backend
- [x] `.env.example` do frontend
- [ ] Merge dos PRs #8 (frontend) e #9 (CORS/JWT, do Guilherme)

## Sprint 2 — Telas, validação e acabamento (28/11 a 30/11)

- [x] Login e Cadastro no mesmo visual do dashboard
- [x] Validação dos formulários alinhada aos limites do backend
- [x] Estados de carregamento, erro e vazio em todas as telas
- [x] Confirmação de exclusão própria (no lugar de `window.confirm`)
- [x] Responsividade (celular e tablet) e acessibilidade (foco, rótulos, `aria-invalid`, Esc nos diálogos); contraste ainda sem auditoria formal
- [ ] Ajustes encontrados no teste ponta a ponta com o backend real

## Sprint 3 — Documentação e entrega (01/12)

- [ ] README raiz: instalação do zero, variáveis de ambiente, prints, integrantes
- [ ] Prompts exatos usados no Galileo AI e no v0 (exigência da atividade)
- [ ] Docker (opcional, até +5%): `Dockerfile` do frontend e `docker-compose.yml` com o backend
- [ ] Teste do zero: `git clone` → `npm install` → `npm run dev` em máquina limpa
- [ ] Roteiro da demonstração ao vivo (cadastro, login, CRUD)
- [ ] Commits de **ambos** os integrantes visíveis no histórico

## Dependências com o backend (Guilherme)

- `MONGO_URI` do Atlas e `JWT_SECRET` combinados por canal privado
- `FRONTEND_URL` no `.env` do backend igual à origem real do frontend
  (`http://localhost:5173` local; a URL pública `...-5173.app.github.dev` no Codespaces)
- Docker Compose do conjunto, se a dupla optar por ele

## Riscos

| Risco | Mitigação |
|---|---|
| CORS bloqueando no Codespaces | `FRONTEND_URL` exato, sem barra final |
| Token expira em 1 dia no meio da demonstração | 401 já volta ao login; fazer login perto da apresentação |
| Backend fora do ar na demonstração | modo demonstração (`VITE_USE_MOCK=true`) mostra a interface |
