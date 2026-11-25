export default function TaskHeader({
  busca,
  onBuscar,
  onNovaTarefa,
  onSair,
}) {
  return (
    <header className="topbar">
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={busca}
          onChange={(event) => onBuscar(event.target.value)}
          placeholder="Buscar tarefas..."
          aria-label="Buscar tarefas por título, descrição ou responsável"
        />
      </label>

      <div className="topbar-actions">
        <button
          type="button"
          className="button button-primary"
          onClick={onNovaTarefa}
        >
          <span aria-hidden="true">＋</span>
          Nova tarefa
        </button>

        <div className="user-profile" aria-label="Usuário conectado">
          <div className="avatar" aria-hidden="true">PH</div>
          <div className="user-copy">
            <strong>Pedro Henrique</strong>
            <small>Administrador</small>
          </div>
        </div>

        <button
          type="button"
          className="icon-button"
          onClick={onSair}
          title="Sair da conta"
          aria-label="Sair da conta"
        >
          ↗
        </button>
      </div>
    </header>
  );
}
