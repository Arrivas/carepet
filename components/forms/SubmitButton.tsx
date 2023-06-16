import React from "react";
import { useFormikContext } from "formik";
import Spinner from "../Spinner";

interface SubmitButtonProps {
  title: string;
  containerClass?: string;
  textClass?: string;
  disabled?: boolean;
  customBgColor?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title = "",
  containerClass,
  textClass,
  disabled,
  customBgColor,
  ...rest
}) => {
  const { handleSubmit } = useFormikContext();
  return (
    <button
      type="submit"
      className={` w-full h-[40px] flex items-center justify-center rounded-md ${
        !disabled
          ? `${customBgColor ? customBgColor : "bg-green-550"}`
          : "bg-gray-400"
      } ${
        !disabled && `${customBgColor ? customBgColor : "hover:bg-green-600"} `
      } ${containerClass}`}
      onClick={() => {
        handleSubmit();
      }}
      {...rest}
    >
      <p className={`text-[17px] text-white font-semibold ${textClass}`}>
        {title}
      </p>
      {disabled && <Spinner />}
    </button>
  );
};

export default SubmitButton;
