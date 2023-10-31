import { useEffect, useContext } from "react";

import { useEncryptWallet } from "~/hooks";
import AppContext from "~/context/AppContext";
import Loading from "../loading";
import Back from "~/ui/components/Back";
import PrimaryButton from "~/ui/components/PrimaryButton";

function ImportPhrase() {
  const { state, setScreen, setPassword, setMnemonic, setRepassword } = useContext(AppContext);

  const { update, encrypted, loading } = useEncryptWallet();

  const isValidPassword = () => {
    return state?.password && state?.password !== "" && state?.password === state?.repassword;
  };

  useEffect(() => {
    if (encrypted) {
      setScreen("dashboard");
    }
  }, [encrypted, setScreen]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="text-left text-sm">
          <Back screen="register" />
          <h1 className="text-2xl font-bold mt-4 pt-4 pb-8 text-center">Import Seed Phrase</h1>

          <div className="mb-10">
            <h5 className="mb-2">Phrase:</h5>
            <textarea
              rows={4}
              itemType="text"
              onChange={(e) => setMnemonic(e.target.value)}
              className="border rounded-md w-full mb-2 dark:bg-[#121212] dark:border-gray-600 dark:text-[#e1e1e1]"
            />
          </div>

          <h2>New password:</h2>
          <input
            type="password"
            className="border-b border-black w-full text-black pt-3 dark:bg-[#121212] dark:border-gray-600 dark:text-[#e1e1e1]"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-9">
            <h2>Repeat password:</h2>
            <input
              type="password"
              className="border-b border-black w-full text-black pt-3 dark:bg-[#121212] dark:border-gray-600 dark:text-[#e1e1e1]"
              onChange={(e) => setRepassword(e.target.value)}
            />
          </div>

          <div
            className="mt-20"
            onClick={() => {
              if (!isValidPassword()) return;
              update(state.mnemonic, state.password);
              setPassword("");
            }}
          >
            <PrimaryButton text="Import" />
          </div>
        </div>
      )}
    </>
  );
}

export default ImportPhrase;
