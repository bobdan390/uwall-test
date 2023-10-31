import { useContext } from "react";

import { EventObject } from "~/types";
import AppContext from "~/context/AppContext";

function Transactions(props: { events: EventObject[]; ready: boolean }) {
  const { state } = useContext(AppContext);

  return (
    <div className="mt-5">
      {props.ready &&
        props.events.map((event) => (
          <div
            key={event.id}
            className="text-black text-xs border-y text-left py-2 dark:text-[#e1e1e1e1] border-[#121212]"
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <div className="h-min my-auto mr-2">
                  {event.from === state.wallet.address ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-green-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <h1 className="font-bold text-sm">
                    {event.from === state.wallet.address ? "Expense" : "Income"}
                  </h1>
                  <div className="flex flex-row mt-1">
                    <p className="font-normal text-xs text-gray-800 dark:text-gray-400">
                      {event?.timestamp}
                    </p>
                    <a
                      href={`https://goerli.etherscan.io/tx/${event?.transactionHash}`}
                      rel="noreferrer"
                      target="_blank"
                      className="font-semibold inline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline mx-1 -mt-1 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="my-auto flex flex-row">
                <h1 className="font-bold text-sm ">
                  {event.from === state.wallet.address ? "- " : null}
                  {event?.amount}
                </h1>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Transactions;
