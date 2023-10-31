import { ethers, Wallet } from "ethers";

export async function createWallet(encryptedWallet: string, password: string) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
    // `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`
  );

  // const mnemonicJson = {
  //   phrase:
  //     "grit patch decorate float captain alert legend federal power unfair identify hip",
  //   path: "m/44'/60'/0'/0/0",
  //   locale: "en",
  // };
  let wallet = await Wallet.fromEncryptedJson(encryptedWallet, password);
  wallet = wallet.connect(provider);
  return wallet;
}
