import { useContext, useEffect, useState } from "react";
import numbro from "numbro";

import AppContext from "~/context/AppContext";
import PFP from "~/assets/profile.png";
import { getContacts } from "~/utils";

function Hero(props: { balance: number; nfts: number; contacts: number }) {
  const { setScreen } = useContext(AppContext);
  const [contacts, setContacts] = useState(0);

  useEffect(() => {
    getContacts().then((contacts) => setContacts(contacts.length));
  }, [contacts]);

  return (
    <div className="flex flex-row text-sm my-3">
      <div className="w-20 h-20">
        <img
          src={PFP} //"https://nerdcollection.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.4505665a.png&w=640&q=75"
          alt="pfp"
          className="rounded-full cursor-pointer w-full invert opacity-20"
          onClick={() => setScreen("underConstruction")}
        />
      </div>
      <div className="flex flex-row justify-start ml-auto">
        <div className="flex flex-col justify-center">
          <p className="font-bold">
            $ {numbro(props.balance).format({ average: true, totalLength: 2 })}
          </p>
          <h2>Balance</h2>
        </div>
        <div className="flex flex-col justify-center mx-11">
          <p className="font-bold">{props.nfts}</p>
          <h2>NFTs</h2>
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-bold cursor-pointer" onClick={() => setScreen("contacts")}>
            {contacts}
          </p>
          <h2 className="cursor-pointer" onClick={() => setScreen("contacts")}>
            Contacts
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Hero;
