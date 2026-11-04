const filtros = [
  { id: "todas", label: "Todas as tarefas", icon: "▦" },
  { id: "pendentes", label: "Pendentes", icon: "◷" },
  { id: "concluidas", label: "Concluídas", icon: "✓" },
  { id: "atrasadas", label: "Atrasadas", icon: "⌛" },
];

export default function TaskSidebar({ filtro, onFiltrar, pendentes }) {
  return (
    <aside className="sidebar" aria-label="Navegação do Taskflow">
      <a className="brand" href="/dashboard" aria-label="Taskflow - início">
        <span className="brand-icon" aria-hidden="true">✳</span>
        <span>task<span>flow</span></span>
      </a>

      <div className="workspace-label">ESPAÇO DE TRABALHO</div>
      <div className="workspace-switch">
        <span className="workspace-avatar" aria-hidden="true">P</span>
        <span>
          <strong>Meu espaço</strong>
          <small>Pessoal</small>
        </span>
        <span className="switch-chevron" aria-hidden="true">⌄</span>
      </div>

      <div className="nav-label">MENU PRINCIPAL</div>
      <nav className="side-nav" aria-label="Filtros de tarefas">
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
            {item.id === "pendentes" && (
              <small className="nav-count">{pendentes}</small>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="focus-card">
          <span className="focus-spark" aria-hidden="true">✦</span>
          <strong>Um passo de cada vez.</strong>
          <p>Pequenas entregas constroem grandes resultados.</p>
        </div>
        <div className="sidebar-version">
          TASKFLOW <span>•</span> V1.0
        </div>
      </div>
    </aside>
  );
}
