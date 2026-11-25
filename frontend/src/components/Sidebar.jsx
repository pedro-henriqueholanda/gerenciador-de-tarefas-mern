const filtros = [
  { id: "todas", label: "Todas as transações", icon: "▦" },
  { id: "entradas", label: "Entradas", icon: "↙" },
  { id: "saidas", label: "Saídas", icon: "↗" },
];

export default function Sidebar({ filtro, onFiltrar, contagens }) {
  return (
    <aside className="sidebar" aria-label="Navegação do Finflow">
      <a className="brand" href="/dashboard" aria-label="Finflow - início">
        <span className="brand-icon" aria-hidden="true">✳</span>
        <span>fin<span>flow</span></span>
      </a>

      <div className="workspace-label">ESPAÇO DE TRABALHO</div>
      <div className="workspace-switch">
        <span className="workspace-avatar" aria-hidden="true">P</span>
        <span>
          <strong>Minhas finanças</strong>
          <small>Pessoal</small>
        </span>
        <span className="switch-chevron" aria-hidden="true">⌄</span>
      </div>

      <div className="nav-label">MENU PRINCIPAL</div>
      <nav className="side-nav" aria-label="Filtros de transações">
        {filtros.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`nav-item ${filtro === item.id ? "active" : ""}`}
            onClick={() => onFiltrar(item.id)}
            aria-current={filtro === item.id ? "page" : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
            <small className="nav-count">{contagens[item.id]}</small>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="focus-card">
          <span className="focus-spark" aria-hidden="true">✦</span>
          <strong>Cada real conta.</strong>
          <p>Registrar entradas e saídas é o primeiro passo para decidir melhor.</p>
        </div>
        <div className="sidebar-version">
          FINFLOW <span>•</span> V1.0
        </div>
      </div>
    </aside>
  );
}
