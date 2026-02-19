import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function makeIdempotencyKey() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `idemp-${Date.now()}`;
}

export default function InitialFunds() {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState(makeIdempotencyKey());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/api/transactions/system/initial-funds", {
        toAccount,
        amount: Number(amount),
        idempotencyKey,
      });
      setMessage(res?.data?.message || "Initial funds transferred.");
      setIdempotencyKey(makeIdempotencyKey());
    } catch (err) {
      setMessage(err?.response?.data?.message || "Initial funds transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <h1>System Initial Funds</h1>

        <form className="card form-grid" onSubmit={submitHandler}>
          <label>
            Receiver Account ID
            <input
              type="text"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value.trim())}
              required
            />
          </label>

          <label>
            Amount
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>

          <label>
            Idempotency Key
            <input
              type="text"
              value={idempotencyKey}
              onChange={(e) => setIdempotencyKey(e.target.value)}
              required
            />
          </label>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Send Initial Funds"}
          </button>
        </form>

        {message && <p className="info-text">{message}</p>}
      </main>
    </>
  );
}
