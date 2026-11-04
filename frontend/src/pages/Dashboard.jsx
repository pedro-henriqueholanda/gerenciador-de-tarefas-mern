import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TaskHeader from "../components/TaskHeader";
import TaskSidebar from "../components/TaskSidebar";
import TaskCard from "../components/TaskCard";
import StatCard from "../components/StatCard";
import TaskFormModal from "../components/TaskFormModal";
import { tarefasIniciais } from "../data/tasks";

export default function Dashboard() {
  const { logout } = useAuth();
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [filtro, setFiltro] = useState("todas");
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const concluidas = tarefas.filter((tarefa) => tarefa.status === "concluida").length;
  const pendentes = tarefas.length - concluidas;
  const atrasadas = tarefas.filter((tarefa) => tarefa.atrasada && tarefa.status !== "concluida").length;

  const tarefasFiltradas = useMemo(() => tarefas.filter((tarefa) => {
    const correspondeBusca = `${tarefa.titulo} ${tarefa.descricao} ${tarefa.responsavel}`
      .toLocaleLowerCase("pt-BR").includes(busca.toLocaleLowerCase("pt-BR"));
    const correspondeFiltro = filtro === "todas" ||
      (filtro === "pendentes" && tarefa.status === "pendente") ||
      (filtro === "concluidas" && tarefa.status === "concluida") ||
      (filtro === "atrasadas" && tarefa.atrasada && tarefa.status !== "concluida");
    return correspondeBusca && correspondeFiltro;
  }), [tarefas, filtro, busca]);

  function adicionarTarefa(novaTarefa) {
    setTarefas((atuais) => [{ ...novaTarefa, id: crypto.randomUUID() }, ...atuais]);
    setModalAberto(false);
  }

  function alternarStatus(id) {
    setTarefas((atuais) => atuais.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, status: tarefa.status === "concluida" ? "pendente" : "concluida" } : tarefa
    ));
  }

  function excluirTarefa(id) {
    setTarefas((atuais) => atuais.filter((tarefa) => tarefa.id !== id));
  }

  return (
    <div className="app-shell">
      <TaskSidebar filtro={filtro} onFiltrar={setFiltro} pendentes={pendentes} />
      <main className="main-content">
        <TaskHeader busca={busca} onBuscar={setBusca} onNovaTarefa={() => setModalAberto(true)} onSair={logout} />
        <section className="welcome-section">
          <div>
            <p className="eyebrow">QUARTA-FEIRA, 04 DE NOVEMBRO</p>
            <h1>Organize suas ideias. <span>Faça acontecer.</span></h1>
            <p className="welcome-copy">Acompanhe suas prioridades e mantenha o ritmo do seu dia.</p>
          </div>
          <div className="welcome-mark" aria-hidden="true">✦</div>
        </section>

        <section className="stats-grid" aria-label="Resumo das tarefas">
          <StatCard label="Total de tarefas" value={tarefas.length} detail="No seu espaço de trabalho" icon="▤" tone="purple" />
          <StatCard label="Em andamento" value={pendentes} detail="Precisam da sua atenção" icon="◷" tone="orange" />
          <StatCard label="Concluídas" value={concluidas} detail={tarefas.length ? `${Math.round((concluidas / tarefas.length) * 100)}% do total` : "Nenhuma tarefa ainda"} icon="✓" tone="green" />
          <StatCard label="Atrasadas" value={atrasadas} detail="Verifique os prazos" icon="!" tone="red" />
        </section>

        <section className="tasks-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SEU FLUXO DE TRABALHO</p>
              <h2>{filtro === "todas" ? "Todas as tarefas" : filtro === "pendentes" ? "Tarefas pendentes" : filtro === "concluidas" ? "Tarefas concluídas" : "Tarefas atrasadas"}</h2>
            </div>
            <span className="task-count">{tarefasFiltradas.length} {tarefasFiltradas.length === 1 ? "tarefa" : "tarefas"}</span>
          </div>
          {tarefasFiltradas.length ? (
            <div className="task-list">
              {tarefasFiltradas.map((tarefa) => (
                <TaskCard key={tarefa.id} tarefa={tarefa} onAlternar={alternarStatus} onExcluir={excluirTarefa} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>✧</span>
              <h3>Nenhuma tarefa encontrada</h3>
              <p>Tente alterar o filtro ou a busca, ou crie uma nova tarefa.</p>
              <button className="button button-primary" onClick={() => setModalAberto(true)}>Criar tarefa</button>
            </div>
          )}
        </section>
        <footer className="page-footer">Feito para manter suas tarefas em movimento <span>✦</span></footer>
      </main>
      {modalAberto && <TaskFormModal onFechar={() => setModalAberto(false)} onSalvar={adicionarTarefa} />}
    </div>
  );
}
