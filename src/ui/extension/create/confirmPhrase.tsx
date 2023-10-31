import { useContext, useEffect, useState } from "react";

import AppContext from "~/context/AppContext";
import { useEncryptWallet } from "~/hooks";
import Back from "~/ui/components/Back";
import PrimaryButton from "~/ui/components/PrimaryButton";
import Loading from "../loading";

function ConfirmPhrase() {
  const { state, setScreen, setPassword } = useContext(AppContext);
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [word3, setWord3] = useState("");
  const { update, encrypted, loading } = useEncryptWallet();

  const getWord = (i: number) => {
    return state.mnemonic?.split(" ")[i];
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

          <h1 className="text-2xl font-bold mt-4 pt-4 pb-8 text-center">
            Confirm Your Seed Phrase
          </h1>

          <h2 className="mb-6">Re-enter your phrase in order.</h2>

          <h2>1st word:</h2>
          <input
            type="text"
            className="border-b border-black w-full text-black pt-3 dark:bg-[#121212] dark:border-gray-600 dark:text-[#e1e1e1]"
            onChange={(e) => setWord1(e.target.value)}
          />

          <div className="mt-8">
            <h2>4th word</h2>
            <input
              type="text"
              className="border-b border-black w-full text-black pt-3 dark:bg-[#121212] dark:border-gray-600 dark:text-[#e1e1e1]"
              onChange={(e) => setWord2(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <h2>11th word</h2>
            <input
              type="text"
              className="border-b border-black w-full text-black pt-3 dark:bg-[#121212] dark:border-gray-600 dark:text-[#e1e1e1]"
              onChange={(e) => setWord3(e.target.value)}
            />
          </div>

          <div
            className="mt-[115px]"
            onClick={() => {
              if (word1 === getWord(0) && word2 === getWord(3) && word3 === getWord(10)) {
                update(state.mnemonic, state.password);
                setPassword("");
              }
            }}
          >
            <PrimaryButton text="Continue" />
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmPhrase;
