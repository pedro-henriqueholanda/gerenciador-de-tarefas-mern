# Planejamento do Front-end — Taskflow

## Objetivo

Construir uma SPA React para organizar tarefas pessoais e demonstrar planejamento visual, componentização, estado local, dados simulados e renderização dinâmica. A implementação é uma demonstração acadêmica: os mocks não substituem a API de autenticação nem persistem no MongoDB.

## 1. Esboço da interface

```text
┌──────────────────┬────────────────────────────────────────────────────────────┐
│ TASKFLOW         │ Buscar tarefas...          [+ Nova tarefa]   Perfil   Sair │
│                  ├────────────────────────────────────────────────────────────┤
│ MEU ESPAÇO       │ Bom dia! Organize suas ideias. Faça acontecer.              │
│                  │                                                            │
│ MENU             │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ Todas            │ │ Total    │ │ Pendentes│ │ Feitas   │ │ Atrasadas│        │
│ Pendentes        │ └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│ Concluídas       │                                                            │
│ Atrasadas        │ Todas as tarefas                         7 tarefas         │
│                  │ ┌────────────────────────────────────────────────────────┐ │
│ Dica de foco     │ │ [ ] Título da tarefa                   [Pendente]       │ │
│                  │ │     Descrição · Categoria · Prazo · Responsável        │ │
│                  │ └────────────────────────────────────────────────────────┘ │
│                  │ ┌────────────────────────────────────────────────────────┐ │
│                  │ │ [✓] Outra tarefa                      [Concluída]      │ │
│                  │ └────────────────────────────────────────────────────────┘ │
└──────────────────┴────────────────────────────────────────────────────────────┘
```

Em telas estreitas, a navegação lateral é reduzida e os indicadores passam para duas colunas; em celulares menores, o perfil textual é ocultado para preservar espaço.

## 2. Árvore de componentes

```text
App
├── AuthProvider
└── BrowserRouter
    └── RotaProtegida
        └── Dashboard
            ├── TaskSidebar
            ├── TaskHeader
            ├── StatCard × 4
            ├── TaskCard × N
            └── TaskFormModal (condicional)
```

### Responsabilidades

| Componente | Responsabilidade |
| --- | --- |
| `Dashboard` | Estado da lista, filtros, busca, indicadores e callbacks |
| `TaskSidebar` | Navegação entre filtros |
| `TaskHeader` | Busca, criação de tarefa e saída da conta |
| `StatCard` | Apresentação de um indicador |
| `TaskCard` | Dados e ações de uma tarefa |
| `TaskFormModal` | Formulário controlado para criar tarefas |

A separação permite alterar a apresentação de um cartão sem reescrever a lógica da lista. O Dashboard concentra as alterações do estado para manter uma única fonte de verdade.

## 3. Modelo dos mocks

O arquivo `src/data/tasks.js` contém sete objetos com os campos:

- `id`: identificador estável e único;
- `titulo` e `descricao`: conteúdo da tarefa;
- `responsavel`: pessoa responsável;
- `categoria` e `prazo`: organização e vencimento;
- `status`: `pendente` ou `concluida`;
- `atrasada`: indicador usado pelo filtro de atrasadas.

O estado inicial é criado com `useState(tarefasIniciais)`. A lista visível é calculada a partir do filtro e da busca, e a renderização utiliza `tarefasFiltradas.map(...)` com `key={tarefa.id}`. A criação, conclusão e exclusão usam atualizações imutáveis do estado.

## 4. Decisões de UX e acessibilidade

- Contraste entre fundo, cartões e texto para separar áreas de conteúdo.
- Indicadores resumem o estado da lista sem exigir leitura de cada cartão.
- Busca textual e filtros podem ser combinados.
- Estado vazio orienta a pessoa a ajustar a busca ou criar uma tarefa.
- Botões possuem rótulos acessíveis; o controle de conclusão expõe `aria-pressed`.
- O modal pode ser fechado pelo botão, clicando fora dele ou pressionando Escape.
- O layout possui adaptações para telas menores e foco visível para navegação por teclado.

## 5. Prompts de referência para as ferramentas de IA

Os textos abaixo são prompts preparados para documentar o processo e podem ser usados nas ferramentas. A equipe deve registrar quais foram efetivamente enviados ao Galileo AI, Figma AI e v0, ajustar este documento ao histórico real e não afirmar que uma ferramenta foi utilizada sem evidência.

### Galileo AI — planejamento visual

> Crie um dashboard web responsivo para um gerenciador de tarefas pessoais chamado Taskflow. Use uma interface SaaS limpa, fundo cinza muito claro, cartões brancos, detalhes em roxo suave, tipografia moderna e bastante espaço em branco. Inclua uma sidebar com filtros Todas, Pendentes, Concluídas e Atrasadas; um cabeçalho com busca, botão Nova tarefa e perfil; uma área de boas-vindas; indicadores de total, em andamento, concluídas e atrasadas; e uma lista de tarefas com título, descrição, categoria, prazo, responsável e status. Priorize legibilidade, hierarquia visual, consistência e acessibilidade. Apresente também uma versão adaptada para celular.

### Figma AI — conteúdo realista

> Substitua todos os textos genéricos do protótipo por conteúdo em português brasileiro para um gerenciador de tarefas pessoais. Use tarefas plausíveis de estudos, trabalho e planejamento, com títulos curtos, descrições objetivas, responsáveis, categorias e prazos. Mantenha a hierarquia visual, os nomes dos componentes e a consistência entre os estados pendente e concluído. Não altere a estrutura do layout.

### v0 da Vercel — componentes React

> Gere componentes React funcionais e reutilizáveis para um dashboard de tarefas chamado Taskflow. Crie TaskSidebar, TaskHeader, StatCard, TaskCard e TaskFormModal. Use JavaScript, CSS responsivo e props para receber dados e callbacks. O componente principal deve controlar a lista com useState; renderize tarefas com map e uma key baseada no id. Inclua busca, filtros, estado vazio, criação, conclusão e exclusão de tarefas. Use botões acessíveis, labels em formulários e estados visuais para tarefas pendentes e concluídas. Não use Lorem Ipsum; escreva exemplos realistas em português. Separe responsabilidades e não implemente backend ou autenticação fictícia.

### ChatGPT — revisão técnica

> Revise a implementação React do Taskflow. Verifique componentização, responsabilidades, props, atualização imutável do estado, chaves únicas nas listas, acessibilidade de botões e formulários, responsividade e possíveis erros de runtime. Explique cada problema encontrado e proponha correções pequenas, preservando o AuthContext, as rotas existentes e a organização do projeto. Não invente testes executados.

## 6. Execução e validação

Na raiz do repositório:

```bash
cd frontend
npm install
npm run dev
```

Antes da entrega, validar manualmente:

1. Abrir a rota `/dashboard` com sessão autenticada.
2. Testar os quatro filtros e a busca.
3. Criar uma tarefa, concluí-la, reabri-la e excluí-la.
4. Testar o modal com teclado e clique fora.
5. Conferir layout em desktop e celular.
6. Executar `npm run build` e `npm run lint`.
7. Verificar o console do navegador e o terminal.

## 7. Captura de tela para o README

Depois de executar a aplicação no Codespace, salve uma captura real da interface em `frontend/docs/dashboard-taskflow.png` e referencie-a no README da raiz. Não use uma imagem ilustrativa como se fosse uma captura do sistema.
