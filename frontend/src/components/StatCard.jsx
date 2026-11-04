export default function StatCard({ label, value, detail, icon, tone }) {
  return (
    <article className="stat-card">
      <div className="stat-topline"><span>{label}</span><span className={`stat-icon ${tone}`}>{icon}</span></div>
      <strong className="stat-value">{value}</strong>
      <small>{detail}</small>
    </article>
  );
}
