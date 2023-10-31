import { useState, useEffect, useContext } from "react";
import faces from "~/assets/faces-loading.png";
import AppContext from "~/context/AppContext";
import circle from "~/assets/loader-white.gif";

function Loading() {
  const { state } = useContext(AppContext);

  const tips = [
    {
      t1: "Welcome to Uwall",
      t2: "The best crypto wallet for everyday",
    },
    {
      t1: "Store your seed phrase in",
      t2: "a safe place",
    },
    {
      t1: "Avoid public wifi when",
      t2: "using your wallet",
    },
    {
      t1: "Enable Two-factor Authentication",
      t2: "everywhere",
    },
    {
      t1: "Be careful with phishing, somebody",
      t2: "can steal your information",
    },
    {
      t1: "No need to store passwords or",
      t2: "seed phrases in the cloud",
    },
  ];

  const [tip, setTip] = useState({
    t1: "Store your seed phrase in",
    t2: "a safe place",
  });

  useEffect(() => {
    if (state.screenOn === "login") {
      setTip({
        t1: "We are decrypting your wallet",
        t2: "",
      });
      return;
    }
    if (
      state.screenOn === "import" ||
      state.screenOn === "importToken" ||
      state.screenOn === "create"
    ) {
      setTip({
        t1: "We are encrypting your wallet",
        t2: "",
      });
      return;
    }

    const interval = setInterval(() => {
      setTip(tips[Math.floor(Math.random() * 6)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dark:bg-[#121212] dark:text-[#e1e1e1]">
      <div className="">
        <div className="test-logo rounded-full">
          <img src={faces} className="mx-auto w-[300px] mt-[80px]" />
        </div>
      </div>
      <div className="effectOpacity mt-[80px]">
        <h1 className="text-xl mt-10 pt-4 text-center">{tip?.t1}</h1>
        <h2 className="">{tip?.t2}</h2>
      </div>
      <div className="">
        <div className="mt-8">
          <img src={circle} alt="gif" className="mx-auto mt-8 w-[110px] dark:invert" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
