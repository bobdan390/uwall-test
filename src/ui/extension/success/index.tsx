import { useContext } from "react";
import { ethers } from "ethers";
import AppContext from "~/context/AppContext";
import PrimaryButton from "~/ui/components/PrimaryButton";
import circle from "~/assets/loader-white.gif";
import faces from "~/assets/faces-loading.png";

interface sendingProps {
  isLoading: boolean;
  hash: ethers.ContractReceipt | undefined;
}
function Success({ isLoading, hash }: sendingProps) {
  const { setScreen } = useContext(AppContext);

  return (
    <div className="dark:bg-[#121212] dark:text-[#e1e1e1]">
      <div className="test-logo rounded-full">
        {isLoading ? (
          <img src={faces} className="mx-auto w-[300px] mt-[80px]" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[80px] m-auto mt-10 rounded-full bg-green-500"
            viewBox="0 0 512 512"
          >
            <title>Checkmark Circle</title>
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M352 176L217.6 336 160 272"
            />
          </svg>
        )}
      </div>
      <div className="mt-[50px] text-2xl">
        {isLoading ? "Sending Transaction..." : "Transaction successful"}
      </div>
      {isLoading ? (
        <div className="mt-8">
          <img src={circle} alt="gif" className="mx-auto mt-8 w-[110px] dark:invert" />
        </div>
      ) : (
        <>
          <a
            href={`https://goerli.etherscan.io/tx/${hash?.transactionHash}`}
            rel="noreferrer"
            target="_blank"
            className="font-semibold inline mt-4 pt-4"
          >
            See Tx receipt{" "}
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
          <div
            className="mt-[254px] m-auto"
            onClick={() => {
              setScreen("dashboard");
            }}
          >
            <PrimaryButton text={"Continue"} />
          </div>
        </>
      )}
    </div>
  );
}

export default Success;
