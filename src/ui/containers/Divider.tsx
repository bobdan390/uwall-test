import TokenList from "../containers/TokenList";
import NftList from "./NftList";
import { TokenObject } from "~/types";
import { NFTObject } from "~/types";

function Divider(props: {
  receive: boolean;
  setTab: (tab: number) => void;
  tab: number;
  balance: string;
  setBalance: (balance: string) => void;
  tokenList: TokenObject[];
  nftList: NFTObject[];
  ethBalance: string;
  setScreen: (screen: string) => void;
}) {
  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-stone-800">
        <ul className="flex flex-wrap justify-around">
          <li className="w-2/4">
            <button
              className={
                props.tab === 0
                  ? "flex flex-row mx-auto font-bold text-white dark:text-gray-200"
                  : "flex flex-row mx-auto"
              }
              onClick={() => {
                props.setTab(0);
                props.setBalance(props.balance);
              }}
            >
              Coins
            </button>
          </li>
          <li className="w-2/4">
            <button
              className={
                props.tab === 1
                  ? "flex flex-row mx-auto font-bold text-white dark:text-gray-200"
                  : "flex flex-row mx-auto"
              }
              onClick={() => props.setTab(1)}
            >
              NFTs
            </button>
          </li>
        </ul>
      </div>
      {props.tab === 0 ? (
        <TokenList tokenList={props.tokenList} ethBalance={props.balance} />
      ) : (
        <NftList nftList={props.nftList} />
      )}
    </>
  );
}

export default Divider;
