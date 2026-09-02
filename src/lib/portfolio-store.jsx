import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { adminCredentials, initialData } from "./portfolio-data";

const STORAGE_KEY = "prospera-portfolio-data";
const AUTH_KEY = "prospera-admin-session";

const PortfolioContext = createContext(null);

function readStored() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function nextId(list) {
  return list.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
}

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(initialData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) setData({ ...initialData, ...stored });
    setIsAdmin(window.localStorage.getItem(AUTH_KEY) === "true");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable — demo continues in memory */
    }
  }, [data, hydrated]);

  const updateSection = useCallback((section, values) => {
    setData((prev) => ({ ...prev, [section]: { ...prev[section], ...values } }));
  }, []);

  const setCollection = useCallback((section, list) => {
    setData((prev) => ({ ...prev, [section]: list }));
  }, []);

  const addItem = useCallback((section, item) => {
    setData((prev) => ({ ...prev, [section]: [...prev[section], { ...item, id: nextId(prev[section]) }] }));
  }, []);

  const updateItem = useCallback((section, id, values) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => (item.id === id ? { ...item, ...values } : item)),
    }));
  }, []);

  const removeItem = useCallback((section, id) => {
    setData((prev) => ({ ...prev, [section]: prev[section].filter((item) => item.id !== id) }));
  }, []);

  const moveItem = useCallback((section, id, direction) => {
    setData((prev) => {
      const list = [...prev[section]];
      const index = list.findIndex((item) => item.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= list.length) return prev;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...prev, [section]: list };
    });
  }, []);

  const resetData = useCallback(() => {
    setData(initialData);
  }, []);

  const login = useCallback((username, password) => {
    const ok =
      username.trim().toLowerCase() === adminCredentials.username && password === adminCredentials.password;
    if (ok) {
      window.localStorage.setItem(AUTH_KEY, "true");
      setIsAdmin(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_KEY);
    setIsAdmin(false);
  }, []);

  const value = useMemo(
    () => ({
      data,
      hydrated,
      isAdmin,
      login,
      logout,
      updateSection,
      setCollection,
      addItem,
      updateItem,
      removeItem,
      moveItem,
      resetData,
    }),
    [data, hydrated, isAdmin, login, logout, updateSection, setCollection, addItem, updateItem, removeItem, moveItem, resetData],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return ctx;
}
