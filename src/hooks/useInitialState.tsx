import { useState } from "react";
import { ethers } from "ethers";

import { initialState } from "~/utils";
import { NFTObject, TokenObject } from "~/types";

export const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const setWallet = (payload: ethers.Wallet) => {
    setState({
      ...state,
      wallet: payload,
    });
  };

  const setBalance = (payload: string) => {
    setState({
      ...state,
      balance: payload,
    });
  };

  const setUsd = (payload: number) => {
    setState({
      ...state,
      usd: payload,
    });
  };

  const setScreen = (payload: string) => {
    setState({
      ...state,
      screenOn: payload,
    });
  };

  const setPassword = (payload: string) => {
    setState({
      ...state,
      password: payload,
    });
  };

  const setRepassword = (payload: string) => {
    setState({
      ...state,
      repassword: payload,
    });
  };

  const setMnemonic = (payload: string) => {
    setState({
      ...state,
      mnemonic: payload,
    });
  };

  const setActive = (payload: boolean) => {
    setState({
      ...state,
      active: payload,
    });
  };

  const setToken = (payload: TokenObject) => {
    setState({
      ...state,
      token: payload,
    });
  };

  const setNft = (payload: NFTObject) => {
    setState({
      ...state,
      nft: payload,
    });
  };

  const setLoading = (payload: boolean) => {
    setState({
      ...state,
      loading: payload,
    });
  };

  return {
    setWallet,
    setLoading,
    setActive,
    setPassword,
    setBalance,
    setUsd,
    setScreen,
    setMnemonic,
    setRepassword,
    setToken,
    setNft,
    state,
  };
};
