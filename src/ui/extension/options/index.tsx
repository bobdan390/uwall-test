import { useContext, useEffect, useState } from "react";

import AppContext from "~/context/AppContext";
import Back from "~/ui/components/Back";
import { getData, setData } from "~/utils";
import { useSession } from "~/hooks";

function Options() {
  const { update } = useSession();
  const { setScreen } = useContext(AppContext);
  const [theme, setTheme] = useState("");
  const [network, setNetwork] = useState("");
  const handleLogOut = async () => {
    chrome.storage.session.set({ wallet: "" });
    chrome.storage.session.set({ address: "" });
    chrome.storage.session.set({ displayAddress: "" });
    chrome.storage.session.set({ chainName: "" });
    chrome.storage.session.set({ networksInfo: "" });
    chrome.storage.session.set({ isActive: "" });
  };

  useEffect(() => {
    setTheme(localStorage.theme);
    getData("network").then((network) => setNetwork(network));
  }, [theme]);

  return (
    <div className="text-left font-semibold">
      <Back screen="dashboard" />
      <div className="border-b border-b-gray-500 mt-16 py-4">
        <button
          onClick={() => {
            setData("tokens", "");
          }}
        >
          Reset token's preference
        </button>
      </div>
      <div className="border-b border-b-gray-500 py-4">
        <button
          onClick={() => {
            setData("contacts", "");
          }}
        >
          Reset contacts
        </button>
      </div>
      <div className="border-b border-b-gray-500 py-4 flex flex-row">
        <h5 className="text-left">Red</h5>
        <select
          value={network}
          className="w-100 bg-black text-white ml-3 dark:bg-[#121212] hover:opacity-80 cursor-pointer"
          onChange={(e) => {
            setNetwork(e.target.value);
            setData("network", e.target.value);
            setData(
              "provider",
              process.env[`REACT_APP_${e.target.value.toUpperCase()}_PROVIDER`] || ""
            );
            update();
            console.log("changed to:", e.target.value);
          }}
        >
          <option value="Goerli">Goerli (Testnet)</option>
          <option value="Polygon">Polygon</option>
          <option value="Ethereum">Ethereum</option>
        </select>
      </div>
      {/* <div className="border-b border-b-gray-500 py-4">
        <button
          onClick={() => {
            const theme = document.getElementById("theme");
            if (!localStorage as any) {
              localStorage.theme = "dark";
              theme?.classList.add("dark");
            } else {
              if (localStorage.theme === "light") {
                localStorage.theme = "dark";
                theme?.classList.add("dark");
              } else {
                localStorage.theme = "light";
                theme?.classList.remove("dark");
              }
            }
            setTheme(localStorage.theme);
          }}
        >
          Theme: {theme}
        </button>
      </div> */}
      <div className="border-b border-b-gray-500 py-4">
        <button
          onClick={() => {
            handleLogOut();
            setScreen("login");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Options;
