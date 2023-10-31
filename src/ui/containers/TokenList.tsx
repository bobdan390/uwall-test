import { useContext, useState, useEffect } from "react";
import numbro from "numbro";

import AppContext from "~/context/AppContext";
import { TokenObject } from "~/types";
import { getData } from "~/utils";

function TokenList(props: { tokenList: TokenObject[]; ethBalance: string }) {
  const { setToken, setScreen, state } = useContext(AppContext);
  const [ethBalance, setEthBalance] = useState("");
  const [ethInUsd, setEthInUsd] = useState("");
  const [isNewToken, setIsNewToken] = useState<boolean | null>(null);
  const [network, setNetwork] = useState("");
  const [networkSymbol, setNetworkSymbol] = useState("");

  useEffect(() => {
    getData("network").then((network: string) => {
      if (network === "Polygon") {
        setNetwork("Polygon");
        setNetworkSymbol("MATIC");
      } else {
        setNetwork("Ethereum");
        setNetworkSymbol("ETH");
      }
    });
  }, []);

  useEffect(() => {
    setEthBalance(numbro(props.ethBalance).format({ mantissa: 2 }));
    setEthInUsd(numbro(state.usd).formatCurrency());

    if (isNewToken) {
      setScreen("tokenPage");
    }
  }, [isNewToken]);

  return (
    <>
      <div className="overflow-uw h-[320px] overflow-auto">
        <div
          className="cursor-pointer flex flex-row justify-between my-1 mt-4 text-sm rounded-xl bg-slate-800 px-4 py-3 mr-[2px] hover:opacity-80"
          onClick={() => {
            setToken({} as TokenObject);
            setIsNewToken(true);
          }}
        >
          <div className="flex flex-row justify-between">
            {/* <div className="w-[40px] h-[40px] bg-black rounded-full flex justify-center items-center mr-1.5">
              <img
                width={20}
                src="https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg"
                alt=""
              />
            </div> */}
            <div className="text-left">
              <p className="font-bold">{networkSymbol}</p>
              <p>{network}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">{ethBalance}</p>
            <p className="font-semibold text-green-600">({ethInUsd})</p>
          </div>
        </div>

        {props?.tokenList?.map((token: TokenObject) => (
          <div
            className="cursor-pointer flex flex-row justify-between my-1 text-sm rounded-xl bg-slate-800 px-4 py-3 mr-[2px] hover:opacity-80"
            key={token.symbol}
            onClick={() => {
              setToken(token);
              setIsNewToken(true);
            }}
          >
            <div className="flex flex-row justify-between">
              {/* <div className="w-[40px] h-[40px] bg-black rounded-full flex justify-center items-center mr-1.5">
                <img
                  width={20}
                  src="https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg"
                  alt=""
                />
              </div> */}
              <div className="text-left">
                <p className="font-bold">{token.symbol}</p>
                <p>{token.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{numbro(token.balance).format({ mantissa: 2 })}</p>
              <p className="font-semibold text-green-600">
                ({numbro(token.usd).formatCurrency()})
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="text-sm mt-4"
        onClick={() => {
          setScreen("importToken");
        }}
      >
        Import tokens
      </button>
    </>
  );
}

export default TokenList;
