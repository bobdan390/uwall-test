import { useContext, useState, useEffect } from "react";
import Back from "~/ui/components/Back";
import PFP from "~/assets/profile.png";
import PrimaryButton from "~/ui/components/PrimaryButton";
import { getData, setData } from "~/utils";
import AppContext from "~/context/AppContext";
import ValidateForms, { getValidationData } from "~/utils/valid";

const validacionesForm = [
  {
    field: "alias",
    method: "isEmpty",
    validWhen: false,
    message: "Required field",
  },
  {
    field: "address",
    method: "isEmpty",
    validWhen: false,
    message: "Required field",
  },
  {
    field: "address",
    method: "isEthereumAddress",
    validWhen: true,
    message: "This is not a valid address",
  },
];

function Add() {
  const { setScreen } = useContext(AppContext);
  const [dataForm, setDataForm] = useState({
    alias: "",
    address: "",
    validation: null as any,
  });

  useEffect(() => {
    const validation = new ValidateForms(validacionesForm);
    setDataForm({
      ...dataForm,
      validation: validation.valid(dataForm),
    });
  }, []);

  const handleInputChange = (event: any) => {
    event.preventDefault();
    let validator = new ValidateForms(validacionesForm);
    let newData = {
      ...dataForm,
      [event.target.name]: event.target.value,
    };

    let validation;
    if (validator) {
      validation = validator.validateField(newData, event.target.name);
    }

    setDataForm({
      ...newData,
      validation,
    });
  };

  const handleButton = async () => {
    const validation = new ValidateForms(validacionesForm);
    let isValidateForm = validation.validate(dataForm);

    setDataForm({
      ...dataForm,
      validation: isValidateForm,
    });

    if (isValidateForm?.isValid) {
      let contacts = "";
      let newContact = `${dataForm.alias}-${dataForm.address}`;
      getData("contacts").then((stringOfContacts) => {
        if (stringOfContacts) {
          contacts = `${stringOfContacts},${newContact}`;
        } else {
          contacts = `${newContact}`;
        }
        setData("contacts", `${contacts}`);
        setScreen("contacts");
      });
    }
  };

  return (
    <>
      <Back screen="contacts" />
      <h1 className="text-2xl font-bold my-4 text-left">Add Contact</h1>
      <p className="mx-auto">
        <img
          width={125}
          src={PFP}
          alt=""
          className="rounded-full cursor-pointer my-5 bg-transparent invert opacity-20"
        />
      </p>
      <div className="px-5">
        <h5 className="text-left">Alias</h5>
        <input
          type="alias"
          name="alias"
          className="border-b border-black w-full text-black pt-3 dark:bg-[#121212] dark:text-[#e1e1e1]"
          placeholder="Alias contact"
          onChange={handleInputChange}
          value={dataForm.alias}
        />
        <p className="absolute text-red-500">{getValidationData(dataForm?.validation, "alias")}</p>
        <h5 className="text-left mt-10">Address</h5>
        <input
          type="address"
          name="address"
          className="border-b border-black w-full text-black pt-3 dark:bg-[#121212] dark:text-[#e1e1e1]"
          placeholder="Address contact"
          onChange={handleInputChange}
          value={dataForm.address}
        />
        <p className="absolute text-red-500">
          {getValidationData(dataForm?.validation, "address")}
        </p>
        <div className="mt-6" onClick={() => handleButton()}>
          <PrimaryButton text={"Add"} />
        </div>
      </div>
    </>
  );
}

export default Add;
