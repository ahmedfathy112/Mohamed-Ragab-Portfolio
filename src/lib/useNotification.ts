import { useState, useCallback } from "react";

interface Notification {
  message: string;
  type: "success" | "error";
}

export function useNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setNotification({ message, type });

      // Auto-clear after 5 seconds
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    },
    [],
  );

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return { notification, showNotification, clearNotification };
}
