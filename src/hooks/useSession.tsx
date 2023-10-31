import { useCallback, useEffect, useContext, useState } from "react";
import { ethers } from "ethers";

import AppContext from "~/context/AppContext";
import { getData, getSessionData } from "~/utils";

export function useSession() {
  const { state, setWallet } = useContext(AppContext);
  const [active, setActive] = useState(false);

  const update = useCallback(async () => {
    try {
      const pk = await getSessionData("wallet");
      const providerUrl = await getData("provider");
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      if (pk.length > 20) {
        const wallet = new ethers.Wallet(pk.slice(1, -1), provider);

        setWallet(wallet);
        setActive(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    update();
  }, [update]);

  return {
    update,
    active,
  };
}
