import { HashRouter, Routes, Route } from "react-router-dom";

import AppContext from "~/context/AppContext";
import { UwallContext } from "~/types";
import { useInitialState } from "~/hooks";
import Home from "./ui/extension";
import Connect from "./ui/popups/Connect";
import Unlock from "./ui/popups/Unlock";
import Transaction from "./ui/popups/Transaction";

function App() {
  const initialState = useInitialState();
  const theme = document.getElementById("theme");

  if (!localStorage.theme as any) {
    localStorage.theme = "dark";
  } else {
    if (localStorage.theme === "dark") {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
      theme?.classList.remove("dark");
    }
  }

  return (
    <div id="theme" className="dark">
      <HashRouter>
        <AppContext.Provider value={initialState as UwallContext}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="connect" element={<Connect />} />
            <Route path="unlock" element={<Unlock />} />
            <Route path="transaction" element={<Transaction />} />
          </Routes>
        </AppContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
