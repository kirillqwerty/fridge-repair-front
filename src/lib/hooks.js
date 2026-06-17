import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useSiteData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get("/site-data")
      .then(({ data }) => {
        if (mounted) setData(data);
      })
      .catch((e) => {
        if (mounted) setError(e);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { data, error, loading, reload: () => window.location.reload() };
}
