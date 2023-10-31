import { useContext } from "react";

import Qrcode from "~/ui/components/Qrcode";
import Back from "~/ui/components/Back";
import AppContext from "~/context/AppContext";
import { truncatedAddress } from "~/utils/truncateAddress";

function Receive() {
  const { state } = useContext(AppContext);

  return (
    <div className="text-left font-semibold">
      <Back screen="dashboard" />
      <div className="text-center w-full mt-5 text-lg">
        Copy or scan to get <br /> the destination address
      </div>
      <div
        className="flex flex-row justify-between cursor-pointer w-40 mx-auto mt-12 mb-2"
        onClick={() => {
          navigator.clipboard.writeText(state.wallet.address);
        }}
      >
        <h1 className="m-0 font-semibold text-lg flex">
          {truncatedAddress(state?.wallet?.address)}
          <svg width={16} className="ml-3" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Copy</title><path d="M408 480H184a72 72 0 01-72-72V184a72 72 0 0172-72h224a72 72 0 0172 72v224a72 72 0 01-72 72z"/><path d="M160 80h235.88A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z"/></svg>
        </h1>
      </div>
      <div className="p-6">
        <Qrcode text={state.wallet.address} />
      </div>
      
    </div>
  );
}

export default Receive;
