import { useCallback, useEffect, useContext, useState } from "react";
import { ethers, Wallet } from "ethers";

import { getData, setSessionData } from "~/utils";
import AppContext from "~/context/AppContext";

export function useWallet() {
  const { state, setWallet, setUsd } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  // const [usd, setUsd] = useState(0);

  const update = useCallback(async (password: string) => {
    if (password) {
      setLoading(true);
      console.log("Decrypting wallet...");
      try {
        let jsonWallet = await getData(state.walletKey);
        let newWallet = await Wallet.fromEncryptedJson(jsonWallet, password);
        const providerUrl = await getData("provider");
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        newWallet = newWallet.connect(provider);

        const balance = await newWallet?.getBalance();
        setBalance(ethers.utils.formatEther(balance));
        setWallet(newWallet);

        const network = await newWallet.provider.getNetwork();

        // Save session data
        chrome.storage.session.set({ isActive: true });
        setSessionData("wallet", JSON.stringify(newWallet.privateKey));

        chrome.storage.session.set({ address: newWallet.address });
        chrome.storage.session.set({ address: newWallet.address });
        chrome.storage.session.set({ displayAddress: newWallet.address });
        chrome.storage.session.set({ chainName: "Ethereum" });
        chrome.storage.session.set({
          networksInfo: {
            Ethereum: {
              chainId: network.chainId,
              rpcUrl: providerUrl,
            },
          },
        });

        chrome.tabs.query(
          {
            currentWindow: true,
          },
          (tabs) => {
            tabs.forEach((tab) => {
              chrome.tabs.sendMessage(tab.id!, {
                type: "init",
                msg: {
                  address: newWallet.address,
                  chainId: network.chainId,
                  rpcUrl: providerUrl,
                  isActive: true,
                },
              });
            });
          }
        );

        setActive(true);
        console.log("Decrypting success!");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, []);

  const updateBalance = useCallback(async () => {
    try {
      let network: string = await getData("network");
      if (network === "Goerli") network = "Ethereum";

      let tokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
      if (network.toLowerCase() === "polygon") {
        tokenAddress = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
      }

      const balance = await state?.wallet?.getBalance();
      console.log("balance:", balance.toString());
      setBalance(ethers.utils.formatEther(balance));
      const formattedBalance = Number.parseFloat(ethers.utils.formatUnits(balance, 18));

      let generalBalance: number = 0;
      let dataFromDefiLlama: Response = await fetch(
        `https://coins.llama.fi/prices/current/${network.toLowerCase()}:${tokenAddress}`
      );
      let res = await dataFromDefiLlama.json();
      const price = res.coins[`${network.toLowerCase()}:${tokenAddress}`].price;

      console.log(
        `${res.coins[`${network.toLowerCase()}:${tokenAddress}`].symbol} price: ${price}`
      );

      generalBalance = formattedBalance * price + generalBalance;
      setUsd(generalBalance);
    } catch (error) {
      console.log("Error fetching balance data");
    }
  }, []);

  useEffect(() => {
    update("");
    updateBalance();
  }, [update, updateBalance]);

  return {
    update,
    balance,
    active,
    loading,
    updateBalance,
    // usd,
  };
}
