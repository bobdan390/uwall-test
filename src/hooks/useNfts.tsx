import { useCallback, useEffect, useContext, useState } from "react";
import { Contract, ethers } from "ethers";

import AppContext from "~/context/AppContext";
import { nfts, getData, erc721Interface } from "~/utils";
import { NFTObject } from "~/types";

export function useNfts() {
  const { state } = useContext(AppContext);
  const [nftList, setNfts] = useState<NFTObject[]>([]);
  const [loading, setLoading] = useState(false);

  const update = useCallback(async () => {
    setLoading(true);
    let list: string[] = nfts;
    const importedNfts = await getData("nfts");

    if (importedNfts) {
      const newTokens = importedNfts.split(",");
      list = list.concat(newTokens);
    }
    try {
      // ERC721;
      let temp: NFTObject[] = [];
      list.forEach(async (nftAddress) => {
        const providerUrl = await getData("provider");
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        const contract = new Contract(nftAddress, erc721Interface, provider);
        const name = await contract.name();
        // const balance = await contract.balanceOf(state.wallet.address);
        // const tokenOfOwnerByIndex = await contract.tokenOfOwnerByIndex(balance);
        const tokenUri = await contract.tokenURI("538210");
        let uri = await (await fetch(tokenUri)).json();

        temp.push({
          collection: name,
          name: uri?.name,
          description: uri?.description,
          address: nftAddress,
          contract: contract,
          tokenUri: tokenUri,
          image: uri?.image,
          id: "538210",
        });

        temp.push({
          collection: name,
          name: uri?.name,
          description: uri?.description,
          address: nftAddress,
          contract: contract,
          tokenUri: tokenUri,
          image: uri?.image,
          id: "538210",
        });

        temp.push({
          collection: name,
          name: uri?.name,
          description: uri?.description,
          address: nftAddress,
          contract: contract,
          tokenUri: tokenUri,
          image: uri?.image,
          id: "538210",
        });

        temp.push({
          collection: name,
          name: uri?.name,
          description: uri?.description,
          address: nftAddress,
          contract: contract,
          tokenUri: tokenUri,
          image: uri?.image,
          id: "538210",
        });
        setNfts(temp);
      });
    } catch (error) {
      console.log("Error fetching nfts");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    update();
  }, [update]);

  return {
    update,
    nftList,
    loading,
  };
}
