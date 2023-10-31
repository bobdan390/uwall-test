import { useContext, useState, useEffect } from "react";

import AppContext from "~/context/AppContext";
import { useTokens, useWallet, useNfts } from "~/hooks";
import Header from "~/ui/containers/Header";
import Hero from "~/ui/containers/Hero";
import Divider from "~/ui/containers/Divider";
import ActionButtons from "~/ui/containers/ActionButtons";
import { truncatedAddress } from "~/utils";

function Dasboard() {
  const { setScreen, state, setBalance } = useContext(AppContext);
  const { balance } = useWallet();
  const [receive, setReceive] = useState(false);
  const [tab, setTab] = useState(1);
  const { tokenList, portfolio, update } = useTokens();
  const { nftList } = useNfts();

  useEffect(() => {
    update();
  }, []);

  return (
    <>
      <div>
        <Header address={truncatedAddress(state.wallet?.address)} setScreen={setScreen} />
        <Hero balance={portfolio + state.usd} nfts={nftList.length} contacts={0} />
        <ActionButtons setScreen={setScreen} receive={receive} setReceive={setReceive} />
        <Divider
          tab={tab}
          receive={receive}
          balance={balance}
          tokenList={tokenList}
          nftList={nftList}
          ethBalance={balance}
          setTab={setTab}
          setBalance={setBalance}
          setScreen={setScreen}
        />
      </div>
    </>
  );
}

export default Dasboard;
