import PrimaryButton from "~/ui/components/PrimaryButton";
import dapp from "~/assets/dapp.jpg";
import nft from "~/assets/nft.jpg";
import check from "~/assets/check.png";

function Connect() {
  const handleButton = async () => {
    let { address } = await chrome.storage.session.get("address");

    const tabs = await chrome.tabs.query({
      currentWindow: false,
    });

    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id!, {
        type: "accountsResponse",
        msg: {
          address: address,
        },
      });
    });
    window.close();
  };

  const rejectButton = async () => {
    const tabs = await chrome.tabs.query({
      currentWindow: false,
    });

    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id!, {
        type: "accountsResponse",
        msg: {
          address: "",
        },
      });
    });
    chrome.storage.session.set({ params: "" });
    window.close();
  };

  return (
    <div className="flex flex-col text-center p-4 dark:bg-[#121212] dark:text-[#e1e1e1]">
      <h1 className="text-2xl mt-10 pt-4 text-center">Connect Request</h1>
      <div className="flex flex-row justify-around mt-4">
        <img
          src={dapp}
          alt="test"
          className="mx-auto mt-4 rounded-full z-10 w-[65px] h-[65px] blur-sm"
        />
        <img
          src={check}
          alt="check"
          className="mx-auto mt-8 rounded-full z-10 w-[40px] h-[30px]"
        />
        <img
          src={nft}
          alt="pfp"
          className="mx-auto mt-4 rounded-full z-10 w-[65px] h-[65px] blur-sm"
        />
        <span className="line-connect">-------------------------</span>
      </div>
      <h1 className="text-2xl mt-10 pt-4 text-center">DApp would you like to connect to </h1>
      <h1 className="text-2xl text-centerr">your account </h1>
      <span className="text-slate-400 mt-8">
        This site is requesting access to view your current account address. Always make sure you
        trust the sites you interact with.
      </span>
      <div
        className="flex flex-row justify-around mt-[18px] gap-4"
        style={{ gap: 20 }}
        onClick={handleButton}
      >
        <PrimaryButton text={"Connect"} />
      </div>
      <p className="text-center mt-2 cursor-pointer" onClick={rejectButton}>
        Reject
      </p>
    </div>
  );
}

export default Connect;
