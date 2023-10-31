import { useContext, useState } from "react";

import AppContext from "~/context/AppContext";
import Back from "~/ui/components/Back";
import PrimaryButton from "~/ui/components/PrimaryButton";
import { getData, setData } from "~/utils";

function ImportToken() {
  const { setScreen, setLoading } = useContext(AppContext);
  const [address, setAddress] = useState("");

  const handleButton = async (address: string) => {
    let tokens = "";
    getData("tokens").then((stringOfTokens) => {
      if (stringOfTokens) {
        tokens = `${stringOfTokens},${address}`;
      } else {
        tokens = `${address}`;
      }
      setData("tokens", tokens);
      setScreen("dashboard");
    });
  };

  return (
    <div className="text-left">
      <Back screen="dashboard" />
      <h1 className="text-2xl font-bold mt-4 pt-4 pb-8 text-center">Import token</h1>

      <h2>Token Address</h2>
      <input
        type="text"
        className="border-b border-black w-full pt-3 dark:bg-[#121212] dark:border-gray-600 dark:text-[#e1e1e1]"
        onChange={(e) => setAddress(e.target.value)}
      />

      <div
        className="mt-[320px]"
        onClick={() => {
          handleButton(address);
          setLoading(true);
        }}
      >
        <PrimaryButton text={"Import"} />
      </div>
    </div>
  );
}

export default ImportToken;
