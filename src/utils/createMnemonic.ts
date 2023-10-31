import { Wallet } from "ethers";

/**
 * Genera una wallet aleatoria de 12 palabras
 * @returns Objeto JSON con la siguiente estructura:
 *  {
 *    phrase: "grit patch decorate float captain alert legend federal power unfair identify hip",
 *    path: "m/44'/60'/0'/0/0",
 *    locale: "en",
 *  }
 */
export function createMnemonic() {
  const mnemonic = Wallet.createRandom().mnemonic;
  return mnemonic;
}
