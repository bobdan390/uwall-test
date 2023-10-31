import { useCallback, useContext, useState } from "react";
import { Wallet } from "ethers";

import { setData } from "~/utils";
import AppContext from "~/context/AppContext";
import { useWallet } from "~/hooks";

/**
 * Encripta la wallet dada con la password del usuario
 * El proceso de encriptado dura 10s
 *
 * @returns JSON Object, con la wallet encriptada
 */
export function useEncryptWallet() {
  const { state } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [encrypted, setEncrypted] = useState(false);
  const walletHandler = useWallet();
  /**
   * al hacer el llamado de update() desde el componente
   * se deben colocar como argumento el Objeto JSON con
   * la mnemonic phrase y la password del usuario
   */
  const update = useCallback(async (mnemonic: string, password: string) => {
    const wallet = Wallet.fromMnemonic(mnemonic);
    if (wallet) {
      setData("network", "Polygon");
      setData("provider", process.env.REACT_APP_POLYGON_PROVIDER || "");
      setLoading(true);
      console.log("Encrypting wallet...");
      let encryptedWallet = await wallet.encrypt(password);
      console.log("encryptedWallet", encryptedWallet);
      setData(state.walletKey, encryptedWallet);
      await walletHandler.update(password);
      setEncrypted(true);
      setLoading(false);
      console.log("Encrypting success!");
    }
  }, []);

  return {
    update,
    loading,
    setLoading,
    encrypted,
    setEncrypted,
  };
}
