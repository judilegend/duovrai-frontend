import { useState, useEffect, useRef, useCallback } from "react";

export type OrderStatus = "PENDING" | "PAID" | "COMPLETED" | "FAILED";

interface PollingResult {
  status: OrderStatus | null;
  elapsedSeconds: number;
  isComplete: boolean;
  isFailed: boolean;
  isTimeout: boolean;
  isPolling: boolean;
  error: string | null;
}

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_SECONDS = 90;
const API_BASE = "http://localhost:8000/api/v1/reports";

export function useReportPolling(orderId: string | null): PollingResult {
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const isComplete = status === "COMPLETED";
  const isFailed = status === "FAILED";
  const isTimeout = elapsedSeconds >= MAX_POLL_SECONDS && !isComplete && !isFailed;

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPolling(false);
  }, []);

  const pollStatus = useCallback(async () => {
    if (!orderId) return;

    try {
      const response = await fetch(`${API_BASE}/orders/${orderId}`);
      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }
      const data = await response.json();
      const newStatus = data.status as OrderStatus;
      setStatus(newStatus);

      if (newStatus === "COMPLETED" || newStatus === "FAILED") {
        stopPolling();
      }
    } catch (err: any) {
      console.error("Polling error:", err);
      setError(err.message || "Erreur de connexion au serveur");
    }
  }, [orderId, stopPolling]);

  useEffect(() => {
    if (!orderId) return;

    // Start polling
    setIsPolling(true);
    setElapsedSeconds(0);
    setError(null);
    setStatus(null);
    startTimeRef.current = Date.now();

    // Initial poll
    pollStatus();

    // Poll every 3 seconds
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (elapsed >= MAX_POLL_SECONDS) {
        stopPolling();
        return;
      }
      pollStatus();
    }, POLL_INTERVAL_MS);

    // Timer for elapsed seconds (updates every second for smooth countdown)
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedSeconds(elapsed);
      if (elapsed >= MAX_POLL_SECONDS) {
        stopPolling();
      }
    }, 1000);

    return () => {
      stopPolling();
    };
  }, [orderId, pollStatus, stopPolling]);

  return {
    status,
    elapsedSeconds,
    isComplete,
    isFailed,
    isTimeout,
    isPolling,
    error,
  };
}
