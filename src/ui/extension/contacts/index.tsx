import { useContext, useEffect, useState } from "react";

import Back from "~/ui/components/Back";
import PFP from "~/assets/profile.png";
import AppContext from "~/context/AppContext";
import { truncatedAddress, getContacts, deleteContact } from "~/utils";

export interface ContactDetails {
  alias: string;
  address: string;
}

function Contacts() {
  const { setScreen } = useContext(AppContext);
  const [contacts, setContacts] = useState<ContactDetails[]>([]);

  useEffect(() => {
    getContacts().then((contacts) => setContacts(contacts));
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between">
        <Back screen="dashboard" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[30px] fill-white cursor-pointer"
          viewBox="0 0 512 512"
          onClick={() => {
            setScreen("addContacts");
          }}
        >
          <title>Add Circle</title>
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 01-32 0v-64h-64a16 16 0 010-32h64v-64a16 16 0 0132 0v64h64a16 16 0 010 32z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold my-4 text-left flex justify-between">Contacts</h1>
      <div className="overflow-uw min-h-[450px] overflow-auto">
        {contacts.length === 0 && <>{"You don't have any contacts yet"}</>}
        {contacts.length > 0 &&
          contacts.map((contact) => (
            <>
              <div
                className="flex flex-row justify-between mb-2 text-sm rounded-xl bg-slate-800 px-4 py-3"
                key={contact.address}
              >
                <div className="flex flex-row justify-between">
                  <div className="w-[40px] h-[40px] bg-black rounded-full flex justify-center items-center mr-1.5">
                    <img width={40} src={PFP} alt="" className="cursor-pointer bg-slate-800" />
                  </div>
                  <div className="text-left">
                    <p>{contact.alias}</p>
                    <p className="text-gray-400 text-xs">{truncatedAddress(contact.address)}</p>
                  </div>
                </div>
                <div className="text-right cursor-pointer">
                  {/* <p className="font-semibold text-green-600">Send</p> */}
                  <p
                    className="font-semibold"
                    onClick={() => deleteContact(contact, contacts, setContacts)}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}

export default Contacts;
