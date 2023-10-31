import { ContactDetails } from "~/ui/extension/contacts";
import { getData, setData } from "./localStorage";

export const getContacts = async (): Promise<ContactDetails[]> => {
  const contactsSaved = await getData("contacts");
  let listOfContacts: ContactDetails[] = [];

  if (contactsSaved) {
    const newContacts = contactsSaved.split(",");

    newContacts.forEach((contact: string) =>
      listOfContacts.push({ alias: contact.split("-")[0], address: contact.split("-")[1] })
    );
  }
  return listOfContacts;
};

export const deleteContact = (
  selectedContact: ContactDetails,
  contacts: ContactDetails[],
  setContacts: (list: ContactDetails[]) => void
) => {
  const newList = contacts.filter((contact) => contact.address !== selectedContact.address);
  let newContacts = "";
  newList.forEach((contact) => {
    if (newContacts === "") {
      newContacts = `${contact.alias}-${contact.address}`;
    } else {
      newContacts = newContacts + `,${contact.alias}-${contact.address}`;
    }
  });
  setData("contacts", `${newContacts}`);
  setContacts(newList);
};
