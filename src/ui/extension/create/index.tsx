import { useContext } from "react";

import AppContext from "~/context/AppContext";
import Back from "~/ui/components/Back";
import PrimaryButton from "~/ui/components/PrimaryButton";

function Create() {
  const { state, setScreen, setPassword, setRepassword } = useContext(AppContext);

  const isValidPassword = () => {
    return state?.password && state?.password !== "" && state?.password === state?.repassword;
  };

  return (
    <div className="text-left text-sm">
      <Back screen="register" />

      <h1 className="text-2xl font-bold mt-4 pt-4 pb-8 text-center">Create a password</h1>

      <h2>Password:</h2>
      <input
        type="password"
        className="border-b border-black w-full text-black pt-3 dark:bg-[#121212] dark:border-gray-600 dark:text-[#e1e1e1]"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="mt-8">
        <h2>Repeat password:</h2>
        <input
          type="password"
          className="border-b border-black w-full text-black pt-3 dark:bg-[#121212] dark:border-gray-600 dark:text-[#e1e1e1]"
          onChange={(e) => setRepassword(e.target.value)}
        />
      </div>

      <div
        className="mt-60"
        onClick={() => {
          if (!isValidPassword()) return;
          setScreen("newPhrase");
        }}
      >
        <PrimaryButton text="Continue" />
      </div>
    </div>
  );
}

export default Create;
