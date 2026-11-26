export default function Header({
  busca,
  onBuscar,
  onNovaTransacao,
  onSair,
  modoDemonstracao,
}) {
  return (
    <header className="topbar">
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={busca}
          onChange={(event) => onBuscar(event.target.value)}
          placeholder="Buscar transações..."
          aria-label="Buscar transações por categoria ou descrição"
        />
      </label>

      <div className="topbar-actions">
        {modoDemonstracao && (
          <span className="demo-badge" title="Dados simulados, sem conexão com a API">
            MODO DEMONSTRAÇÃO
          </span>
        )}

        <button
          type="button"
          className="button button-primary"
          onClick={onNovaTransacao}
        >
          <span aria-hidden="true">＋</span>
          Nova transação
        </button>

        <div className="user-profile" aria-label="Usuário conectado">
          <div className="avatar" aria-hidden="true">EU</div>
          <div className="user-copy">
            <strong>Minha conta</strong>
            <small>Sessão ativa</small>
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
