import { useContext } from "react";

import AppContext from "~/context/AppContext";

function Back(props: { screen: string }) {
  const { setScreen } = useContext(AppContext);
  return (
    <div
      className="flex flex-row cursor-pointer hover:opacity-80"
      onClick={() => {
        setScreen(props.screen);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 my-auto mr-1"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      <div className="my-auto">
        <p>Back</p>
      </div>
    </div>
  );
}

export default Back;
