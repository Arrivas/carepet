import React from "react";
import { useFormikContext } from "formik";
import Spinner from "../Spinner";

interface SubmitButtonProps {
  title: string;
  containerClass?: string;
  textClass?: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title = "",
  containerClass,
  textClass,
  disabled,
  ...rest
}) => {
  const { handleSubmit } = useFormikContext();
  return (
    <button
      className={`w-full h-[40px] mt-[12px] flex items-center justify-center rounded-md ${
        !disabled ? "bg-green-550" : "bg-gray-400"
      } ${!disabled && "hover:bg-green-500"} ${containerClass}`}
      type="submit"
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
