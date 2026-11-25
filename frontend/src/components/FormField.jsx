import { useId } from "react";

// Campo de formulário com rótulo e mensagem de erro ligados por acessibilidade.
export default function FormField({ label, erro, ...inputProps }) {
  const id = useId();
  const erroId = `${id}-erro`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? erroId : undefined}
        {...inputProps}
      />
      {erro && (
        <p className="field-error" id={erroId}>
          {erro}
        </p>
      )}
    </div>
  );
}
