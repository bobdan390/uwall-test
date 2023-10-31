function LightButton(props: { text: string }) {
    return (
      <>
        <button style={{background: "#cbcbcb"}} className="text-black text-lg font-semibold tracking-wider h-16 rounded-full w-full">
          {props.text}
        </button>
      </>
    );
  }
  
  export default LightButton;