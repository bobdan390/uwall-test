import { useCallback, useEffect, useContext, useState } from "react";
import { ethers } from "ethers";

import AppContext from "~/context/AppContext";
import { getData, tokens, erc20Interface } from "~/utils";
import { TokenObject } from "~/types";

export function useTokens() {
  const { state } = useContext(AppContext);
  const [tokenList, setTokens] = useState<TokenObject[]>([]);
  const [ready, setReady] = useState(false);
  const [portfolio, setPortfolio] = useState(0);
  const [loading, setLoading] = useState(false);

  let listOfTokens = tokens;
  const update = useCallback(async () => {
    setLoading(true);
    const tokensSaved = await getData("tokens");
    let list = listOfTokens;

    if (tokensSaved) {
      const newTokens = tokensSaved.split(",");
      list = listOfTokens.concat(newTokens);
    }

    //ERC20
    let tokens: TokenObject[] = [];
    let generalBalance: number = 0;
    list.forEach(async (tokenAddress) => {
      let network: string = await getData("network");
      if (network === "Goerli") network = "Ethereum";

      const providerUrl = await getData("provider");
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const contract = new ethers.Contract(tokenAddress, erc20Interface, provider);

      try {
        const symbol = await contract?.symbol();
        const name = await contract?.name();
        const decimals = await contract?.decimals();
        const balance = await contract?.balanceOf(state.wallet.address);
        const formattedBalance = Number.parseFloat(ethers.utils.formatUnits(balance, decimals));

        let price: number;

        try {
          const dataFromDefiLlama: Response = await fetch(
            `https://coins.llama.fi/prices/current/${network.toLowerCase()}:${tokenAddress}`
          );
          const res = await dataFromDefiLlama.json();
          price = res.coins[`${network.toLowerCase()}:${tokenAddress}`].price;
          console.log(`${symbol} price: ${price}`);
        } catch (error) {
          console.log(`Error fetching ${symbol} price`);
          price = 0;
        }

        generalBalance = formattedBalance * price + generalBalance;

        tokens.push({
          symbol: symbol,
          name: name,
          balance: formattedBalance,
          usd: formattedBalance * price,
          price: price.toString(),
          address: tokenAddress,
          contract: contract,
          decimals: decimals,
        });

        setTokens(tokens);
        setPortfolio(generalBalance);
      } catch (error) {
        console.log("Error fetching token data");
      }
    });
    setLoading(false);
    setReady(true);
  }, []);

  useEffect(() => {
    update();
  }, [update]);

  return {
    update,
    tokenList,
    ready,
    portfolio,
    loading,
  };
}
