import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import numbro from "numbro";

import AppContext from "~/context/AppContext";
import { getData, getSessionData } from "~/utils";
import PrimaryButton from "~/ui/components/PrimaryButton";
import dapp from "~/assets/dapp.jpg";
import nft from "~/assets/nft.jpg";
import check from "~/assets/next-icon.png";

function Transaction() {
  const { state } = useContext(AppContext);
  const [txGas, setTxGas] = useState();
  const [txPrice, setTxPrice] = useState();
  const [params, setParams] = useState({});

  const handleButton = async () => {
    try {
      const pk = await getSessionData("wallet");
      const providerUrl = await getData("provider");
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const wallet = new ethers.Wallet(pk.slice(1, -1), provider);

      wallet.sendTransaction(params).then(async (tx: ethers.providers.TransactionResponse) => {
        console.log(tx);

        const tabs = await chrome.tabs.query({
          currentWindow: false,
        });

        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id!, {
            type: "transactionResponse",
            msg: {
              hash: tx.hash,
            },
          });
        });
        chrome.storage.session.set({ params: "" });
        window.close();

        // tx.wait().then((res: ethers.providers.TransactionReceipt) => {
        //   console.log("after wait", res);
        // });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rejectButton = async () => {
    const tabs = await chrome.tabs.query({
      currentWindow: false,
    });

    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id!, {
        type: "transactionResponse",
        msg: {
          hash: [],
        },
      });
    });
    chrome.storage.session.set({ params: "" });
    window.close();
  };

  const fetchInfo = async () => {
    try {
      let { params } = (await chrome.storage.session.get("params")) as any;
      params = JSON.parse(params);

      delete params.gas;

      setParams(params);

      const pk = await getSessionData("wallet");
      const providerUrl = await getData("provider");
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const wallet = new ethers.Wallet(pk.slice(1, -1), provider);

      const gas = await wallet.estimateGas(params);
      const gasPrice = await wallet.getGasPrice();
      console.log(gasPrice.toString());
      let dataFromDefiLlama: Response = await fetch(
        "https://coins.llama.fi/prices/current/ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
      );

      let res = await dataFromDefiLlama.json();
      let price = res.coins["ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"].price;

      price = parseInt((price * 10000).toString());

      const transactionGas = ethers.utils.formatEther(gasPrice.mul(gas));
      const transactionCost = ethers.utils.formatEther(
        gasPrice.mul(gas).mul(price.toString()).div("10000")
      );

      return { transactionGas, transactionCost };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo()
      .then((result: any) => {
        setTxPrice(result.transactionCost.toString());
        setTxGas(result.transactionGas.toString());
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col p-4 dark:bg-[#121212] dark:text-[#e1e1e1]">
      <h1 className="text-2xl mt-10 pt-4 text-center">Transaction Request</h1>
      <div className="flex flex-row justify-around mt-4">
        <img
          src={dapp}
          alt="uwall"
          className="mx-auto mt-4 rounded-full w-[35px] h-[35px] blur-xs"
        />
        <img
          src={check}
          alt="arrow"
          className="mx-auto mt-5 rounded-full w-[30px] h-[30px] invert"
        />
        <img
          src={nft}
          alt="recipient"
          className="mx-auto mt-4 rounded-full w-[35px] h-[35px] blur-xs"
        />
      </div>
      <div className="my-4 py-3 pl-5 border-t border-b">
        <h1 className="text-3xl mt-1 text-center">Transaction Details</h1>

        <h1 className="text-slate-400 text-center mt-3">Coming soon</h1>
        {/* <span>www.remixethereum.com</span> */}
        {/* <h1 className="text-5xl mt-1">$2</h1>
        <h1 className="text-slate-400">$355.2</h1> */}
      </div>

      <div className="px-5">
        <span>Details</span>

        <div className="flex flex-row justify-between mt-3 border-b pb-2">
          <h1>GAS FEE</h1>
          <div>
            <h1>{numbro(txGas).format()} ETH</h1>
            <h1 className="text-slate-400">{numbro(txPrice).formatCurrency()}</h1>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-3">
          <h1>TOTAL</h1>
          <div>
            <h1>{numbro(txGas).format()} ETH</h1>
            <h1 className="text-slate-400">{numbro(txPrice).formatCurrency()}</h1>
          </div>
        </div>
      </div>

      <div
        className="flex flex-row justify-around mt-[34px]"
        style={{ gap: 20 }}
        onClick={handleButton}
      >
        <PrimaryButton text={"Accept"} />
      </div>
      <p className="text-center mt-2 cursor-pointer" onClick={rejectButton}>
        Reject
      </p>
    </div>
  );
}

export default Transaction;
