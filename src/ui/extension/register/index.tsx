import { useContext } from "react";

import AppContext from "~/context/AppContext";
import PrimaryButton from "~/ui/components/PrimaryButton";
import Back from "~/ui/components/Back";

function Register() {
  const { setScreen } = useContext(AppContext);

  return (
    <div className="container-login h-full">
      <Back screen="login" />
      <h1 className="text-2xl font-bold mt-4 pt-4 text-center">Welcome to Uwall</h1>
      <h2>The best crypto wallet for everyday</h2>

      <div className="mt-80" onClick={() => setScreen("create")}>
        <PrimaryButton text="Create new wallet" />
      </div>
      <button className="text-[#9146ff] mt-7" onClick={() => setScreen("import")}>
        Import seed phrase
      </button>
    </div>
  );
}

export default Register;
