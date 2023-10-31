import { useEffect } from "react";
import QRCode from "qrcode";
import { useState } from "react";

function Qrcode(props: { text: string }) {
  const [qr, setQr] = useState("");
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      props.text,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#121212",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        // console.log(url);
        setQr(url);
      }
    );
  };

  useEffect(() => {
    GenerateQRCode();
  }, []);

  return (
    <div className="app">
      <img src={qr} alt="qrcode" />
    </div>
  );
}
export default Qrcode;
