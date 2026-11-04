const filtros = [
  { id: "todas", label: "Todas as tarefas", icon: "▦" },
  { id: "pendentes", label: "Pendentes", icon: "◷" },
  { id: "concluidas", label: "Concluídas", icon: "✓" },
  { id: "atrasadas", label: "Atrasadas", icon: "⌛" },
];

export default function TaskSidebar({ filtro, onFiltrar, pendentes }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="/dashboard" aria-label="Taskflow início">
        <span className="brand-icon">✳</span><span>task<span>flow</span></span>
      </a>
      <div className="workspace-label">ESPAÇO DE TRABALHO</div>
      <button className="workspace-switch"><span className="workspace-avatar">P</span><span><strong>Meu espaço</strong><small>Pessoal</small></span><span className="switch-chevron">⌄</span></button>
      <div className="nav-label">MENU PRINCIPAL</div>
      <nav className="side-nav" aria-label="Filtros de tarefas">
        {filtros.map((item) => (
          <button key={item.id} className={`nav-item ${filtro === item.id ? "active" : ""}`} onClick={() => onFiltrar(item.id)}>
            <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
            {item.id === "pendentes" && <small className="nav-count">{pendentes}</small>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="focus-card"><span className="focus-spark">✦</span><strong>Um passo de cada vez.</strong><p>Pequenas entregas constroem grandes resultados.</p></div>
        <div className="sidebar-version">TASKFLOW <span>•</span> V1.0</div>
      </div>
    </aside>
  );
}
