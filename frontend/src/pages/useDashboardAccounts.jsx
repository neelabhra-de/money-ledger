import { useEffect, useState } from "react";
import api from "../api/axios";

export function useDashboardAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/accounts");
      setAccounts(res?.data?.accounts || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { accounts, loading, refresh };
}
