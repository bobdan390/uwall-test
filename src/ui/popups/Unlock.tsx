import { useContext, useEffect } from "react";

import AppContext from "~/context/AppContext";
import { useWallet, useSession } from "~/hooks";
import Loading from "~/ui/extension/loading";
import PrimaryButton from "~/ui/components/PrimaryButton";

function Unlock() {
  const { state, setPassword } = useContext(AppContext);
  const { update, active, loading } = useWallet();
  const session = useSession();

  useEffect(() => {
    if (active || session.active) {
      chrome.windows.create({
        url: chrome.runtime.getURL(`index.html#/connect`),
        type: "popup",
        height: 600,
        width: 375,
        left: 0,
        top: 0,
      });
      window.close();
    }
  }, [active, session.active]);

  return (
    <div className="flex flex-col text-center h-full w-full p-4 dark:bg-[#121212] dark:text-[#e1e1e1]">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-2xl font-bold mt-10 pt-4 text-center">Welcome to Uwall</h1>
          <h2>The best crypto wallet for everyday</h2>
          <h5 className="text-left mt-60 pt-[34px]">Password</h5>
          <input
            type="password"
            className="border-b w-full text-black pt-3 dark:bg-[#121212] dark:text-[#e1e1e1]"
            placeholder="Your password"
            value={state.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="mt-[18px] pb-5"
            onClick={() => {
              !state.active && update(state.password);
            }}
          >
            <PrimaryButton text={!loading ? "Unlock" : "Decrypting..."} />
          </div>
        </>
      )}
    </div>
  );
}

export default Unlock;
