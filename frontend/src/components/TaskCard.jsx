const statusLabel = {
  pendente: "Pendente",
  concluida: "Concluída",
};

export default function TaskCard({ tarefa, onAlternar, onExcluir }) {
  const concluida = tarefa.status === "concluida";

  return (
    <article className={`task-card-ui ${concluida ? "is-done" : ""}`}>
      <button
        type="button"
        className={`task-check ${concluida ? "checked" : ""}`}
        onClick={() => onAlternar(tarefa.id)}
        aria-label={
          concluida
            ? `Marcar ${tarefa.titulo} como pendente`
            : `Marcar ${tarefa.titulo} como concluída`
        }
        aria-pressed={concluida}
      >
        {concluida ? "✓" : ""}
      </button>

      <div className="task-main">
        <div className="task-title-line">
          <h3>{tarefa.titulo}</h3>
          <span className={`status-pill ${tarefa.status}`}>
            {statusLabel[tarefa.status] ?? "Sem status"}
          </span>
        </div>
        <p>{tarefa.descricao}</p>
        <div className="task-meta">
          <span className="category-dot" aria-hidden="true" />
          <span>{tarefa.categoria}</span>
          <span className="meta-separator" aria-hidden="true">·</span>
          <span>◷ {tarefa.prazo}</span>
          <span className="meta-separator" aria-hidden="true">·</span>
          <span className="assignee">{tarefa.responsavel}</span>
        </div>
      </div>

      <button
        type="button"
        className="task-delete"
        onClick={() => onExcluir(tarefa.id)}
        aria-label={`Excluir tarefa: ${tarefa.titulo}`}
        title="Excluir tarefa"
      >
        ×
      </button>
    </article>
  );
}
