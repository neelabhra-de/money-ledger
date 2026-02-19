import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import AccountCard from "../components/AccountCard";
import BalanceCard from "../components/BalanceCard";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [balancesById, setBalancesById] = useState({});
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");

  const fetchAccountsAndBalances = async () => {
    setLoading(true);
    setMessage("");

    try {
      const accountsRes = await api.get("/api/accounts");
      const nextAccounts = accountsRes?.data?.accounts || [];
      setAccounts(nextAccounts);

      const balanceEntries = await Promise.all(
        nextAccounts.map(async (account) => {
          try {
            const balanceRes = await api.get(`/api/accounts/balance/${account._id}`);
            return [account._id, Number(balanceRes?.data?.balance || 0)];
          } catch {
            return [account._id, 0];
          }
        })
      );

      setBalancesById(Object.fromEntries(balanceEntries));
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountsAndBalances();
  }, []);

  const totalBalance = useMemo(
    () => Object.values(balancesById).reduce((sum, value) => sum + Number(value || 0), 0),
    [balancesById]
  );

  const createAccount = async () => {
    setCreating(true);
    setMessage("");
    try {
      await api.post("/api/accounts");
      setMessage("Account created successfully.");
      await fetchAccountsAndBalances();
    } catch (err) {
      setMessage(err?.response?.data?.message || "Unable to create account");
    } finally {
      setCreating(false);
    }
  };

  const copyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setMessage("Account ID copied.");
    } catch {
      setMessage("Could not copy account ID.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader text="Loading dashboard..." />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="row-between">
          <h1>Dashboard</h1>
          <button type="button" className="btn" onClick={createAccount} disabled={creating}>
            {creating ? "Creating..." : "Create New Account"}
          </button>
        </div>

        <BalanceCard totalBalance={totalBalance} />

        {message && <p className="info-text">{message}</p>}

        {accounts.length === 0 ? (
          <div className="card">
            <p>No accounts yet. Create your first account to get started.</p>
          </div>
        ) : (
          <section className="grid">
            {accounts.map((account) => (
              <AccountCard
                key={account._id}
                account={account}
                balance={balancesById[account._id] || 0}
                onCopyId={copyId}
              />
            ))}
          </section>
        )}
      </main>
    </>
  );
}
