import { useMemo, useState } from "react";
import TransferForm from "../components/TransferForm";
import Navbar from "../components/Navbar";
import { useDashboardAccounts } from "../pages/useDashboardAccounts";
import api from "../api/axios";

export default function Transfer() {
  const { accounts, refresh, loading: loadingAccounts } = useDashboardAccounts();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const canTransfer = useMemo(() => accounts.length > 0, [accounts]);

  const onTransfer = async (payload) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/api/transactions", payload);
      setMessage(res?.data?.message || "Transfer completed.");
      await refresh();
    } catch (err) {
      setMessage(err?.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Transfer Money</h1>

        {!canTransfer && !loadingAccounts && (
          <div className="card">
            <p>Create at least one account before initiating transfer.</p>
          </div>
        )}

        {canTransfer && <TransferForm accounts={accounts} onSubmit={onTransfer} loading={loading} />}

        {message && <p className="info-text">{message}</p>}
      </main>
    </>
  );
}
