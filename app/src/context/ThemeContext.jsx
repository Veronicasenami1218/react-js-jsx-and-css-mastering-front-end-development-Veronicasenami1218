import { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  // Deterministic default across browsers: always start as 'light' unless a saved value exists
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    // Debug: verify effect runs and class toggles
    console.log('[ThemeEffect] before', {
      theme,
      hasDark: document.documentElement.classList.contains('dark'),
      stored: (() => { try { return JSON.parse(localStorage.getItem('theme')); } catch { return localStorage.getItem('theme'); } })(),
    });
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    console.log('[ThemeEffect] after', {
      theme,
      hasDark: document.documentElement.classList.contains('dark'),
    });
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        console.log('[ThemeToggle] clicking; current=', theme);
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
      },
    }),
    [theme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
