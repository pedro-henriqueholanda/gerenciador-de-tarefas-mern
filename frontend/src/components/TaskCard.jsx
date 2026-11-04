const statusLabel = { pendente: "Pendente", concluida: "Concluída" };

export default function TaskCard({ tarefa, onAlternar, onExcluir }) {
  return (
    <article className={`task-card-ui ${tarefa.status === "concluida" ? "is-done" : ""}`}>
      <button className={`task-check ${tarefa.status === "concluida" ? "checked" : ""}`} onClick={() => onAlternar(tarefa.id)} aria-label={tarefa.status === "concluida" ? "Marcar como pendente" : "Marcar como concluída"}>{tarefa.status === "concluida" ? "✓" : ""}</button>
      <div className="task-main">
        <div className="task-title-line"><h3>{tarefa.titulo}</h3><span className={`status-pill ${tarefa.status}`}>{statusLabel[tarefa.status]}</span></div>
        <p>{tarefa.descricao}</p>
        <div className="task-meta"><span className="category-dot" />{tarefa.categoria}<span className="meta-separator">·</span><span>◷ {tarefa.prazo}</span><span className="meta-separator">·</span><span className="assignee">{tarefa.responsavel}</span></div>
      </div>
      <button className="task-delete" onClick={() => onExcluir(tarefa.id)} aria-label={`Excluir tarefa ${tarefa.titulo}`} title="Excluir tarefa">×</button>
    </article>
  );
}
