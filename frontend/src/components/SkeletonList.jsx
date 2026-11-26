// Cartões "fantasma" exibidos enquanto a lista carrega.
export default function SkeletonList({ quantidade = 3 }) {
  return (
    <div className="task-list" role="status" aria-label="Carregando transações">
      {Array.from({ length: quantidade }, (_, i) => (
        <div className="task-card-ui skeleton-card" key={i} aria-hidden="true">
          <span className="skeleton skeleton-icon" />
          <div className="skeleton-lines">
            <span className="skeleton skeleton-line w60" />
            <span className="skeleton skeleton-line w35" />
          </div>
          <span className="skeleton skeleton-line w15" />
        </div>
      ))}
    </div>
  );
}
