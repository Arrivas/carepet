import React from "react";
import { toast } from "react-hot-toast";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardProps> = ({ text }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Text copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
      });
  };

  return (
    <button onClick={handleCopy}>
      <HiOutlineClipboardDocumentList color="#000" size={20} />
    </button>
  );
};

export default CopyToClipboardButton;
