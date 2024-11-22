import { Content } from "./components/Content";
import { useState } from "react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center text-6xl">
      <Content isDarkMode={isDarkMode} />
      <button
        className="absolute mt-[550px] text-xl text-white"
        onClick={() => setIsDarkMode((prev) => !prev)}
      >
        {isDarkMode ? "Cambiar a claro" : "Cambiar a oscuro"}
      </button>
    </div>
  );
}
