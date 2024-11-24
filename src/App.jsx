import { Content } from "./components/Content";
import { useState } from "react";
import { Switch } from "./components/Switch.jsx";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center text-6xl">
      <Content isDarkMode={isDarkMode} />
      <div className="absolute bottom-12 left-12">
          <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
      </div>
    </div>
  );
}
