import { useContext } from "react";

import AppContext from "~/context/AppContext";
import Back from "~/ui/components/Back";
import { truncatedAddress } from "~/utils";
// import OPENSEA from "../../../assets/opensea.png";

function NftPage() {
  const { state } = useContext(AppContext);

  return (
    <div className="text-left text-sm">
      <Back screen="dashboard" />

      <h1 className="text-2xl font-bold mt-4 pt-4 text-center">{state.nft.collection}</h1>
      <a href={state.nft.image} target="_blank" rel="noreferrer">
        <img src={state.nft.image} alt={state.nft.description} className="rounded-2xl py-3" />
      </a>

      <div className="flex flex-row justify-between py-4 my-auto text-sm">
        <button
          className="flex flex-row justify-center my-auto bg-gradient-to-r from-[#9146ff] to-[#9146ff] text-white font-semibold tracking-wider py-2 rounded-full w-[168px]"
          // onClick={() => setScreen("sendEth")}
        >
          Send
        </button>
        <button
          className="flex flex-row justify-center my-auto bg-gradient-to-r from-[#9146ff] to-[#9146ff] text-white font-semibold tracking-wider py-2 rounded-full w-[168px]"
          // onClick={() => setScreen("receive")}
        >
          List for Sale
        </button>
      </div>
      <div className="">
        {/* <div className="">
          <h1 className="text-xl font-bold ">Creator</h1>
          <div className="bg-white rounded-lg text-gray-900 flex">
            <div className="px-6 py-2 border-b conten-pic-token">
              <div className="rounded-full pic-token"></div>
            </div>
            <div className="px-6 py-2 border-b description-content">
              <p>0x111...fff</p>
              <p></p>
            </div>
          </div>
        </div> */}
        {state.nft.description && (
          <div className="">
            <h1 className="text-base mt-4 mb-1 font-bold ">Description</h1>
            <p>{state.nft.description}</p>
          </div>
        )}
        <div className="">
          <h1 className="text-base mt-4 mb-1 font-bold ">Collection</h1>
          <div className="flex flex-row justify-start py-1">
            <img
              src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png"
              alt="Opensea logo"
              className="w-12 h-12 my-auto"
            />
            <div className="px-2 py-2 border-b font-semibold">
              <p>{state.nft.name}</p>
              <p>On OpenSea</p>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="text-base mt-4 mb-1 font-bold ">NFT details</h1>
          <p>Contract address: {truncatedAddress(state.nft.address)}</p>
          <p>Token ID: {state.nft.id}</p>
          <p>Blockchain: Ethereum*</p>
        </div>
        <div className="">
          <h1 className="text-base mt-4 mb-1 font-bold ">What is an NFT</h1>
          <p>
            NFTs (short for Non-Fungible-Tokens) are digital items that you own. Proof of ownership
            is stored on a blockchain, a digital database that is publicly accesible.
          </p>
          <a href="https://google.com" target="_blank" rel="noreferrer" className="text-[#9146ff]">
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}

export default NftPage;
