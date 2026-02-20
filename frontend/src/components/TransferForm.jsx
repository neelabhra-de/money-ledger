import { useMemo, useState } from "react";

function makeIdempotencyKey() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `idemp-${Date.now()}`;
}

export default function TransferForm({ accounts, onSubmit, loading }) {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState(makeIdempotencyKey());

  const accountOptions = useMemo(() => accounts || [], [accounts]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await onSubmit({
      fromAccount,
      toAccount,
      amount: Number(amount),
      idempotencyKey,
    });
  };

  return (
    <form className="card form-grid" onSubmit={submitHandler}>
      <h2>Create Transfer</h2>

      <label>
        From Account
        <select value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} required>
          <option value="">Select account</option>
          {accountOptions.map((account) => (
            <option key={account._id} value={account._id}>
              {account._id}
            </option>
          ))}
        </select>
      </label>

      <label>
        To Account ID
        <input
          type="text"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value.trim())}
          placeholder="Paste receiver account id"
          required
        />
      </label>

      <label>
        Amount
        <input
          type="number"
          min="1"
          step="1"
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
        {loading ? "Processing..." : "Send Money"}
      </button>
    </form>
  );
}
