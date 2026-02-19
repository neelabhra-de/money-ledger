import formatCurrency from "../utils/formatCurrency";

export default function AccountCard({ account, balance, onCopyId }) {
  return (
    <article className="card account-card">
      <div className="account-header">
        <h3>Account</h3>
        <span className={`status ${String(account.status).toLowerCase()}`}>{account.status}</span>
      </div>

      <p className="muted">ID</p>
      <p className="id-text">{account._id}</p>

      <div className="account-meta">
        <span>{account.currency}</span>
        <strong>{formatCurrency(balance ?? 0, account.currency || "INR")}</strong>
      </div>

      <button type="button" className="btn btn-small" onClick={() => onCopyId(account._id)}>
        Copy ID
      </button>
    </article>
  );
}
