import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import numbro from "numbro";

import AppContext from "~/context/AppContext";
import SendToken from "./sendToken";
import { useGetTransactions } from "~/hooks";
import { EventObject } from "~/types";
import Transactions from "./Transactions";
import Back from "~/ui/components/Back";
import Success from "../success";
import { getData } from "~/utils";

function TokenPage() {
  const { state, setScreen } = useContext(AppContext);
  const [sendView, setSendView] = useState(false);
  const [events, setEvents] = useState<EventObject[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hash, setHash] = useState<ethers.ContractReceipt | undefined>();
  const [networkSymbol, setNetworkSymbol] = useState("");

  useEffect(() => {
    getData("network").then((network: string) => {
      if (network === "Polygon") {
        setNetworkSymbol("MATIC");
      } else {
        setNetworkSymbol("ETH");
      }
    });
  }, []);

  const Txs = useGetTransactions(state.token.address, state.wallet.address, state.token.decimals);

  useEffect(() => {
    if (Txs.ready) {
      setEvents(Txs.events);
    }
  }, [Txs, events]);

  return (
    <>
      {isSending && <Success isLoading={isLoading} hash={hash} />}
      {!isSending && (
        <div>
          <Back screen="dashboard" />

          <h1 className="text-2xl font-bold mt-4 pt-4 text-center">
            {state.token.balance !== undefined
              ? numbro(state.token.balance).format({ mantissa: 2 })
              : numbro(state.balance).format({ mantissa: 2 })}{" "}
            {state.token.symbol ? state.token.symbol : networkSymbol}
          </h1>

          <h1 className="mb-2 text-base">
            (
            {state.token.usd !== undefined
              ? numbro(state.token.usd).formatCurrency()
              : numbro(state.usd).formatCurrency()}
            )
          </h1>

          {sendView ? (
            <SendToken setIsLoading={setIsLoading} setIsSending={setIsSending} setHash={setHash} />
          ) : (
            <>
              <button
                className="flex flex-row justify-center mx-auto my-auto bg-gradient-to-r from-[#9146ff] to-[#9146ff] text-white font-semibold tracking-wider py-2 rounded-full w-[168px]"
                onClick={() => {
                  state.token.symbol ? setSendView(!sendView) : setScreen("sendEth");
                }}
              >
                Send
              </button>

              <Transactions ready={Txs.ready} events={events} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default TokenPage;
