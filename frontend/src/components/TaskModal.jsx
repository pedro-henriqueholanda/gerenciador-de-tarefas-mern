import { useState, useEffect } from "react";

export default function TaskModal({ tarefa, onSalvar, onFechar }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendente");

  // se recebeu uma tarefa, preenche o formulário para edição
  useEffect(() => {
    if (tarefa) {
      setTitle(tarefa.title);
      setDescription(tarefa.description || "");
      setStatus(tarefa.status);
    }
  }, [tarefa]);

  function handleSubmit(e) {
    e.preventDefault();
    onSalvar({ title, description, status });
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{tarefa ? "Editar Tarefa" : "Nova Tarefa"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pendente">Pendente</option>
            <option value="concluída">Concluída</option>
          </select>

          <div className="modal-actions">
            <button type="button" onClick={onFechar}>Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}