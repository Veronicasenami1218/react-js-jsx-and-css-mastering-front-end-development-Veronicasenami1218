import React, { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="px-4 py-2 border rounded"
      >
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <h1 className="mt-4 text-2xl">Hello, this is {theme} mode!</h1>
    </div>
  );
}

export default App;
