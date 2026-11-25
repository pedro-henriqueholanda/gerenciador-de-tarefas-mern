import { useEffect, useRef } from "react";

// Diálogo de confirmação acessível (substitui window.confirm).
export default function ConfirmDialog({
  titulo,
  mensagem,
  textoConfirmar = "Confirmar",
  perigo = false,
  ocupado = false,
  onConfirmar,
  onCancelar,
}) {
  const cancelarRef = useRef(null);

  useEffect(() => {
    cancelarRef.current?.focus();
  }, []);

  useEffect(() => {
    function aoTeclar(event) {
      if (event.key === "Escape" && !ocupado) onCancelar();
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [onCancelar, ocupado]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !ocupado) onCancelar();
      }}
    >
      <section
        className="task-modal confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <h2 id="confirm-title">{titulo}</h2>
        <p id="confirm-message">{mensagem}</p>
        <div className="modal-actions">
          <button
            ref={cancelarRef}
            type="button"
            className="button button-ghost"
            onClick={onCancelar}
            disabled={ocupado}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={`button ${perigo ? "button-danger" : "button-primary"}`}
            onClick={onConfirmar}
            disabled={ocupado}
          >
            {ocupado ? "Aguarde..." : textoConfirmar}
          </button>
        </div>
      </section>
    </div>
  );
}
