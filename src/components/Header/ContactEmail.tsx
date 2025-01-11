import { Copy } from "lucide-react";
import { useState } from "react";

function ContactEmail() {
  const [isCopied, setIsCopied] = useState(false);
  async function copyTextToClipboard() {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText("israelis.help@gmail.com");
    } else {
      return document.execCommand("copy", true, "israelis.help@gmail.com");
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard()
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      onClick={handleCopyClick}
      className="flex p-4 items-center cursor-pointer"
    >
      <Copy className="h-5 w-5 text-gray-00" />
      <p
        className={["mx-2", isCopied ? "text-green-500" : "txt-gray-500"].join(
          " "
        )}
      >
        israelis.help@gmail.com
      </p>
    </div>
  );
}

export default ContactEmail;
