import { useContext, useEffect } from "react";

import AppContext from "~/context/AppContext";
import { useWallet, useSession } from "~/hooks";
import Loading from "~/ui/extension/loading";
import PrimaryButton from "~/ui/components/PrimaryButton";

function Login() {
  const { state, setPassword, setScreen } = useContext(AppContext);
  const { update, active, loading } = useWallet();
  const session = useSession();

  useEffect(() => {
    if (active || session.active) {
      setScreen("dashboard");
    }
  }, [active, session.active]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-2xl font-bold mt-10 pt-4 text-center">Welcome to Uwall</h1>
          <h2>The best crypto wallet for everyday</h2>
          <div className="px-5">
            <h5 className="text-left mt-56">Password</h5>
            <input
              type="password"
              className="border-b border-black w-full text-black pt-3 dark:bg-[#121212] dark:text-[#e1e1e1]"
              placeholder="Your password"
              value={state.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="mt-8"
              onClick={() => {
                !state.active && update(state.password);
              }}
            >
              <PrimaryButton text={!loading ? "Unlock" : "Decrypting..."} />
            </div>
          </div>
          <button
            className="text-xs mt-1"
            onClick={() => {
              setScreen("import");
            }}
          >
            Forgot password?
          </button>
          <div className="mt-7">
            <button
              onClick={async () => {
                setScreen("register");
              }}
              className="text-[#9146ff]"
            >
              Create wallet
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
