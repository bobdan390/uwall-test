import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import AppContext from "~/context/AppContext";
import Back from "~/ui/components/Back";
import PrimaryButton from "~/ui/components/PrimaryButton";
import PFP from "~/assets/profile.png";
import { ContactDetails } from "../contacts";
import { getContacts, getData, truncatedAddress } from "~/utils";
import Success from "../success";

function SendToken() {
  const { state } = useContext(AppContext);
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [showContacts, setShowContacts] = useState(false);
  const [contacts, setContacts] = useState<ContactDetails[]>([]);

  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hash, setHash] = useState<ethers.ContractReceipt | undefined>();
  const [networkSymbol, setNetworkSymbol] = useState("");

  useEffect(() => {
    getData("network").then((network: string) => {
      if (network === "Polygon") {
        setNetworkSymbol("MATIC");
      } else {
        setNetworkSymbol("ETH");
      }
    });
  }, []);

  const handleSend = async () => {
    setIsSending(true);
    const gasPrice = await state.wallet.getGasPrice();
    const tx = {
      to: target,
      value: ethers.utils.parseEther(amount),
      gasPrice: gasPrice,
    };

    state.wallet.sendTransaction(tx).then((tx: ethers.providers.TransactionResponse) => {
      console.log(tx);
      tx.wait().then((res: ethers.providers.TransactionReceipt) => {
        console.log("after wait", res);
        setHash(res);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    getContacts().then((contacts) => setContacts(contacts));
  }, []);

  return (
    <>
      {isSending && <Success isLoading={isLoading} hash={hash} />}
      {!isSending && (
        <div className="text-left">
          <Back screen={"dashboard"} />

          <h1 className="text-2xl font-bold mt-4 pt-4 pb-4 text-center">Send {networkSymbol}</h1>

          <h5>Amount:</h5>
          <input
            type="number"
            className="border-b border-black w-full pt-3 dark:bg-[#121212] dark:border-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="mt-8">
            <h5>Recipient:</h5>
            <div className="flex flex-row">
              <input
                type="text"
                className="border-b border-black w-full pt-3 dark:bg-[#121212] dark:border-white"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-[#e1e1e1] border border-[#e1e1e1] rounded mt-[5px] ml-2 mr-1 p-[2px] cursor-pointer"
                onClick={() => setShowContacts(!showContacts)}
              >
                <path
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
              </svg>
            </div>
          </div>

          <div className="overflow-uw overflow-auto h-[240px]  mt-2">
            {showContacts && (
              <>
                {contacts.length === 0 && <>{"You don't have any contacts yet"}</>}
                {contacts.length > 0 &&
                  contacts.map((contact) => (
                    <>
                      <div
                        className="flex flex-row justify-between mb-2 text-sm rounded-xl bg-slate-800 px-4 py-3 cursor-pointer mr-[2px]"
                        key={contact.address}
                        onClick={() => {
                          setTarget(contact.address);
                          setShowContacts(false);
                        }}
                      >
                        <div className="flex flex-row justify-between">
                          <div className="w-[40px] h-[40px] bg-black rounded-full flex justify-center items-center mr-1.5">
                            <img
                              width={40}
                              src={PFP}
                              alt=""
                              className="cursor-pointer bg-slate-800"
                            />
                          </div>
                          <div className="text-left">
                            <p>{contact.alias}</p>
                            <p className="text-gray-400 text-xs">
                              {truncatedAddress(contact.address)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right cursor-pointer">
                          {/* <p className="font-semibold text-green-600">Send</p> */}
                          {/* <p
                    className="font-semibold"
                    onClick={() => deleteContact(contact, contacts, setContacts)}
                  >
                  Delete
                </p> */}
                        </div>
                      </div>
                    </>
                  ))}
              </>
            )}
          </div>

          <div className="mt-4" onClick={handleSend}>
            <PrimaryButton text={"Send"} />
          </div>
        </div>
      )}
    </>
  );
}

export default SendToken;
