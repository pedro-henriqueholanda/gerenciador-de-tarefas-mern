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