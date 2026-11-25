import { useEffect, useState } from "react";
import { hojeParaInput, mensagemDeErro, paraInputData } from "../utils/format";

// Serve para criar (transacao = null) e para editar (transacao = objeto existente).
// onSalvar é assíncrono: se lançar erro, o modal permanece aberto e mostra a mensagem.
export default function TransactionFormModal({ transacao, onFechar, onSalvar }) {
  const editando = Boolean(transacao);

  const [type, setType] = useState(transacao?.type ?? "saida");
  const [value, setValue] = useState(transacao ? String(transacao.value) : "");
  const [category, setCategory] = useState(transacao?.category ?? "");
  const [description, setDescription] = useState(transacao?.description ?? "");
  const [date, setDate] = useState(
    transacao ? paraInputData(transacao.date) : hojeParaInput(),
  );
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onFechar();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFechar]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!category.trim()) {
      setErro("Informe a categoria.");
      return;
    }

    setErro("");
    setSalvando(true);

    try {
      await onSalvar({ type, value, category, description, date });
    } catch (err) {
      setErro(mensagemDeErro(err, "Não foi possível salvar a transação."));
      setSalvando(false);
    }
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onFechar();
      }}
    >
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-heading">
          <div>
            <p className="eyebrow" id="modal-description">
              {editando ? "ATUALIZE OS DADOS" : "REGISTRE UMA MOVIMENTAÇÃO"}
            </p>
            <h2 id="modal-title">
              {editando ? "Editar transação" : "Nova transação"}
            </h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onFechar}
            aria-label="Fechar janela"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Tipo
              <select value={type} onChange={(event) => setType(event.target.value)}>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </label>

            <label>
              Valor (R$)
              <input
                autoFocus
                required
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="0,00"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Categoria
              <input
                required
                maxLength={50}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Ex.: Alimentação"
              />
            </label>

            <label>
              Data
              <input
                required
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>
          </div>

          <label>
            Descrição (opcional)
            <textarea
              rows="3"
              maxLength={100}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Adicione uma observação..."
            />
          </label>

          {erro && (
            <p className="form-error" role="alert">
              {erro}
            </p>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="button button-ghost"
              onClick={onFechar}
              disabled={salvando}
            >
              Cancelar
            </button>
            <button type="submit" className="button button-primary" disabled={salvando}>
              {salvando
                ? "Salvando..."
                : editando
                  ? "Salvar alterações"
                  : "Registrar transação"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
