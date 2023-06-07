import { useEffect, useState } from "react";

export function useLocalStorage() {
  const [error, setError] = useState("");

  useEffect(() => {
    if (!window.localStorage) {
      setError(
        "LocalStorage not available. Please allow using local storage."
      );
    }
  }, []);

  function setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      setError("Local storage error. " + error);
    }
  }

  function getItem(key) {
    if (!localStorage.getItem(key)) {
      return;
    }

    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      setError("Key not found. " + error);
    }
  }

  function removeItem(key) {
    if (!localStorage.getItem(key)) {
      return;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      setError("Key not found. " + error);
    }
  }

  return [setItem, getItem, removeItem, error];
}
