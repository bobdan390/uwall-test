import { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { NFTObject } from "../../types/types";

function NftList(props: { nftList: NFTObject[] | undefined }) {
  const { setNft, setScreen } = useContext(AppContext);

  const [isNFT, setIsNFT] = useState<boolean | null>(null);

  useEffect(() => {
    if (isNFT) {
      setScreen("nftPage");
    }
  }, [isNFT]);

  return (
    <div className="flex flex-wrap justify-around">
      {!!props.nftList?.length &&
        props?.nftList?.map((nft: NFTObject) => (
          <div
            className="w-40 h-40 mt-3 cursor-pointer"
            onClick={() => {
              setNft(nft);
              setIsNFT(true);
            }}
            key={nft.id}
          >
            <img src={nft.image} alt="NFT" className="rounded-lg" />
          </div>
        ))}

      {!props.nftList?.length && (
        <p className="text-center text-base mt-8">You don't have any NFT yet</p>
      )}
    </div>
  );
}

export default NftList;
