import { useEffect, useContext } from "react";

import AppContext from "~/context/AppContext";
import { createMnemonic } from "~/utils";
import Back from "~/ui/components/Back";
import PrimaryButton from "~/ui/components/PrimaryButton";

function Phrase() {
  const { state, setScreen, setMnemonic } = useContext(AppContext);

  useEffect(() => {
    const mnemonic = createMnemonic();
    setMnemonic(mnemonic.phrase);
  }, []);

  const getWord = (i: number) => {
    return i + 1 + ". " + state.mnemonic?.split(" ")[i];
  };

  return (
    <div className="text-sm">
      <Back screen="register" />
      <h1 className="text-2xl font-bold mt-4 pt-4 pb-8 text-center">
        Write Down Your Seed Phrase
      </h1>

      <div className="text-left text-sm">
        This is your seed phrase. Write it down on a paper and keep it in a safe place. You'll be
        asked to re-enter this phrase (in order) on the next step.
      </div>

      <div className="flex flex-row justify-between mt-8 px-6 mb-2">
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(0)}
        </div>
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(1)}
        </div>
      </div>

      <div className="flex flex-row justify-between  mt-t px-6 mb-2">
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(2)}
        </div>
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(3)}
        </div>
      </div>

      <div className="flex flex-row justify-between  mt-t px-6 mb-2">
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(4)}
        </div>
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(5)}
        </div>
      </div>

      <div className="flex flex-row justify-between  mt-t px-6 mb-2">
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(6)}
        </div>
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(7)}
        </div>
      </div>

      <div className="flex flex-row justify-between  mt-t px-6 mb-2">
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(8)}
        </div>
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(9)}
        </div>
      </div>

      <div className="flex flex-row justify-between  mt-t px-6 mb-2">
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(10)}
        </div>
        <div className="border border-black dark:border-gray-600 rounded-full w-36 py-1">
          {getWord(11)}
        </div>
      </div>

      <div
        className="mt-8"
        onClick={() => {
          setScreen("confirmPhrase");
        }}
      >
        <PrimaryButton text="Continue" />
      </div>
    </div>
  );
}

export default Phrase;
