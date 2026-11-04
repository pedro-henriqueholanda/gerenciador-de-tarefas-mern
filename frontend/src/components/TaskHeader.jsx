export default function TaskHeader({ busca, onBuscar, onNovaTarefa, onSair }) {
  return (
    <header className="topbar">
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input value={busca} onChange={(event) => onBuscar(event.target.value)} placeholder="Buscar tarefas..." aria-label="Buscar tarefas" />
        <kbd>⌘ K</kbd>
      </label>
      <div className="topbar-actions">
        <button className="button button-primary" onClick={onNovaTarefa}><span>＋</span> Nova tarefa</button>
        <div className="user-profile">
          <div className="avatar">PH</div>
          <div className="user-copy"><strong>Pedro Henrique</strong><small>Administrador</small></div>
        </div>
        <button className="icon-button" onClick={onSair} title="Sair da conta" aria-label="Sair da conta">↗</button>
      </div>
    </header>
  );
}
