// Moldura compartilhada das telas de login e cadastro.
export default function AuthLayout({ titulo, subtitulo, children, rodape }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand" aria-label="Finflow">
          <span className="brand-icon" aria-hidden="true">✳</span>
          <span>
            fin<span>flow</span>
          </span>
        </div>
        <h1 className="auth-title">{titulo}</h1>
        <p className="auth-subtitle">{subtitulo}</p>
        {children}
        <p className="auth-footer">{rodape}</p>
      </section>
    </main>
  );
}
