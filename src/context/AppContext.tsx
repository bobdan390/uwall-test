import React from "react";
import { UwallContext } from "../types/types";

const AppContext = React.createContext<UwallContext>({} as UwallContext);

export default AppContext;
