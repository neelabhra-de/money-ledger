import formatCurrency from "../utils/formatCurrency";

export default function BalanceCard({ totalBalance }) {
  return (
    <section className="card total-balance-card">
      <p className="muted">Total Balance Across Your Accounts</p>
      <h2>{formatCurrency(totalBalance, "INR")}</h2>
    </section>
  );
}
