## Frontend (React + Vite)

### Pré-requisitos
- Node.js 18+ instalado
- Backend rodando (veja instruções na seção do backend)

### Como rodar localmente

1. Clone o repositório e entre na pasta do frontend:
   ```bash
   git clone https://github.com/<seu-usuario>/gerenciador-de-tarefas-mern.git
   cd gerenciador-de-tarefas-mern/frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
   Depois abra o `.env` e ajuste `VITE_API_URL` para apontar para a URL da API (por padrão, `http://localhost:3000/api`).

4. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse no navegador o endereço exibido no terminal (geralmente `http://localhost:5173`).

### Estrutura de pastas

```
frontend/
├── src/
│   ├── components/   # Componentes reutilizáveis (TaskModal, RotaProtegida)
│   ├── pages/        # Telas (Login, Cadastro, Dashboard)
│   ├── services/     # Configuração do axios (api.js)
│   ├── context/       # Contexto de autenticação (AuthContext)
│   ├── App.jsx
│   └── main.jsx
├── .env.example
└── package.json
```

### Fluxo de autenticação
- Após login/cadastro bem-sucedido, o token JWT é salvo no `localStorage`.
- Todas as requisições às rotas de tarefas enviam automaticamente o header `Authorization: Bearer <token>` (configurado em `src/services/api.js`).
- Rotas protegidas (`/dashboard`) redirecionam para `/login` caso não haja token válido.

### Endpoints esperados da API
Ver seção "Integração com o Backend" para o contrato exato de request/response.

## Planejamento Visual

### Passo 1 — Wireframe (Excalidraw)

Estrutura de componentes planejada antes da geração visual:

![Wireframe do Dashboard](frontend/docs/images/wireframe-gerenciador-transacoes.png)

**Componentes identificados:**
- **Header** — barra superior fixa com logo e menu do usuário
- **Sidebar** — menu lateral (Dashboard, Nova Transação, Categorias)
- **SaldoCard** — resumo do saldo atual
- **TransactionCard** — item individual da lista (componente reutilizável)
- **TransactionModal** — formulário de criar/editar (componente reutilizável)

### Passo 2 — Geração de UI com IA

A partir da estrutura definida no wireframe, foram criados 3 prompts para gerar as peças visuais da interface.

**1. Tela completa do Dashboard**

![Dashboard gerado](frontend/docs/images/dashboard.png)

**2. Componente TransactionCard**

![TransactionCard gerado](frontend/docs/images/transactioncard.png)

**3. Modal de criar/editar transação**

![Modal gerado](frontend/docs/images/modal.png)

Os resultados confirmam a estrutura de componentes planejada no wireframe: cards de transação reutilizáveis, modal isolado e layout consistente com header + sidebar.