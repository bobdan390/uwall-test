import Back from "~/ui/components/Back";

function UnderConstruction() {
  return (
    <div className="text-left">
      <Back screen="dashboard" />
      <h1 className="text-3xl font-bold mt-4 pt-32 text-center">Coming soon</h1>
      <p className="w-[150px] border-2 mx-auto mt-[10px]"></p>
      <h1 className="text-2xl mt-[110px] text-center">Welcome to Uwall</h1>
      <h2 className="text-center">The best crypto wallet for everyday</h2>
    </div>
  );
}

export default UnderConstruction;
