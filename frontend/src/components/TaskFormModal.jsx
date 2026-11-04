import { useState } from "react";

export default function TaskFormModal({ onFechar, onSalvar }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Geral");
  const [responsavel, setResponsavel] = useState("Pedro Henrique");
  const [prazo, setPrazo] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSalvar({ titulo: titulo.trim(), descricao: descricao.trim(), categoria, responsavel, prazo: prazo ? new Date(`${prazo}T12:00:00`).toLocaleDateString("pt-BR") : "Sem prazo", status: "pendente", atrasada: false });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onFechar(); }}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-heading"><div><p className="eyebrow">ORGANIZE SEU DIA</p><h2 id="modal-title">Nova tarefa</h2></div><button className="icon-button" onClick={onFechar} aria-label="Fechar">×</button></div>
        <form onSubmit={handleSubmit}>
          <label>Título da tarefa<input autoFocus required maxLength="90" value={titulo} onChange={(event) => setTitulo(event.target.value)} placeholder="Ex.: Preparar apresentação" /></label>
          <label>Descrição<textarea rows="3" value={descricao} onChange={(event) => setDescricao(event.target.value)} placeholder="Adicione detalhes sobre esta tarefa..." /></label>
          <div className="form-row"><label>Categoria<select value={categoria} onChange={(event) => setCategoria(event.target.value)}><option>Geral</option><option>Trabalho</option><option>Estudos</option><option>Pessoal</option><option>Planejamento</option></select></label><label>Prazo<input type="date" value={prazo} onChange={(event) => setPrazo(event.target.value)} /></label></div>
          <label>Responsável<input value={responsavel} onChange={(event) => setResponsavel(event.target.value)} /></label>
          <div className="modal-actions"><button type="button" className="button button-ghost" onClick={onFechar}>Cancelar</button><button type="submit" className="button button-primary">Criar tarefa <span>→</span></button></div>
        </form>
      </section>
    </div>
  );
}
