function PrimaryButton(props: { text: string }) {
  return (
    <>
      <button className="bg-gradient-to-r from-[#9146ff] to-[#9146ff] text-white text-lg font-semibold tracking-wider h-16 rounded-full w-full">
        {props.text}
      </button>
    </>
  );
}

export default PrimaryButton;
