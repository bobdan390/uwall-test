import { useContext } from "react";

import AppContext from "~/context/AppContext";
import Login from "./login";
import Register from "./register";
import Create from "./create";
import Phrase from "./create/phrase";
import ConfirmPhrase from "./create/confirmPhrase";
import ImportPhrase from "./create/importPhrase";
import Dasboard from "./dashboard";
import SendEth from "./dashboard/sendEth";
import Options from "./options";
import ImportToken from "./importToken";
import Loading from "./loading";
import Receive from "./receive";
import TokenPage from "./tokenPage";
import NftPage from "./nftPage";
import Contacts from "./contacts";
import AddContacts from "./contacts/add";
import UnderConstruction from "./underConstruction";

function Home() {
  const { state } = useContext(AppContext);
  return (
    <>
      <div className="flex flex-col text-center min-h-[600px] w-[375px] px-4 pt-4 dark:bg-[#121212] dark:text-[#e1e1e1] overflow-hidden">
        {state.loading ? (
          <Loading />
        ) : (
          <>
            {state.screenOn === "login" && <Login />}
            {state.screenOn === "register" && <Register />}
            {state.screenOn === "create" && <Create />}
            {state.screenOn === "newPhrase" && <Phrase />}
            {state.screenOn === "import" && <ImportPhrase />}
            {state.screenOn === "dashboard" && <Dasboard />}
            {state.screenOn === "confirmPhrase" && <ConfirmPhrase />}
            {state.screenOn === "sendEth" && <SendEth />}
            {state.screenOn === "options" && <Options />}
            {state.screenOn === "importToken" && <ImportToken />}
            {state.screenOn === "receive" && <Receive />}
            {state.screenOn === "tokenPage" && <TokenPage />}
            {state.screenOn === "nftPage" && <NftPage />}
            {state.screenOn === "underConstruction" && <UnderConstruction />}
            {state.screenOn === "contacts" && <Contacts />}
            {state.screenOn === "addContacts" && <AddContacts />}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
