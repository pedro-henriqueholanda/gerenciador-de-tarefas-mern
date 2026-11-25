import { formatarData, formatarMoeda } from "../utils/format";

export default function TransactionCard({ transacao, onEditar, onExcluir }) {
  const entrada = transacao.type === "entrada";

  return (
    <article className="task-card-ui tx-card">
      <span className={`tx-icon ${transacao.type}`} aria-hidden="true">
        {entrada ? "↙" : "↗"}
      </span>

      <div className="task-main">
        <div className="task-title-line">
          <h3>{transacao.category}</h3>
          <span className={`status-pill ${transacao.type}`}>
            {entrada ? "Entrada" : "Saída"}
          </span>
        </div>
        <p>{transacao.description || "Sem descrição"}</p>
        <div className="task-meta">
          <span className="category-dot" aria-hidden="true" />
          <span>◷ {formatarData(transacao.date)}</span>
        </div>
      </div>

      <strong className={`tx-value ${transacao.type}`}>
        {entrada ? "+" : "−"} {formatarMoeda(transacao.value)}
      </strong>

      <div className="tx-actions">
        <button
          type="button"
          className="icon-button"
          onClick={() => onEditar(transacao)}
          aria-label={`Editar transação: ${transacao.category}`}
          title="Editar transação"
        >
          ✎
        </button>
        <button
          type="button"
          className="task-delete"
          onClick={() => onExcluir(transacao)}
          aria-label={`Excluir transação: ${transacao.category}`}
          title="Excluir transação"
        >
          ×
        </button>
      </div>
    </article>
  );
}
