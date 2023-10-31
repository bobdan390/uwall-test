import React from "react";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
function ActionButtons(props: {
  setScreen: (screen: string) => void;
  setReceive: (toggle: boolean) => void;
  receive: boolean;
}) {
  const { setScreen } = useContext(AppContext);
  return (
    <div className="flex flex-row justify-between py-4 my-auto text-sm">
      <button
        className="flex flex-row justify-center my-auto bg-gradient-to-r from-[#9146ff] to-[#9146ff] text-white font-semibold tracking-wider py-2 rounded-full w-[168px]"
        onClick={() => setScreen("sendEth")}
      >
        Send
      </button>
      <button
        className="flex flex-row justify-center my-auto bg-gradient-to-r from-[#9146ff] to-[#9146ff] text-white font-semibold tracking-wider py-2 rounded-full w-[168px]"
        onClick={() => setScreen("receive")}
      >
        Receive
      </button>
    </div>
  );
}

export default ActionButtons;
