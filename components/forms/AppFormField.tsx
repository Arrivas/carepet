"use client";
import React from "react";
import { Field, useFormikContext } from "formik";
import { HiEyeOff, HiEye } from "react-icons/hi";

interface AppFormField {
  name: string;
  placeholder?: string;
  showPassword?: boolean;
  onShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string;
  fieldClass?: string;
  label?: string;
  textarea?: boolean;
}

const AppFormField: React.FC<AppFormField> = ({
  name,
  placeholder = "",
  showPassword = false,
  onShowPassword,
  type = "text",
  fieldClass = "",
  label = "",
  textarea = false,
  ...rest
}) => {
  const { errors, touched }: any = useFormikContext();

  return (
    <div className="w-full bg-white">
      {label && (
        <span className="pl-1 font-semibold bg-white text-xs w-full">
          {label}
        </span>
      )}

      <div
        className={`${
          label ? "flex-col" : null
        } w-full relative flex-1 flex items-center p-[1px] justify-center text-start rounded-md border border-gray-300`}
      >
        <Field
          component={textarea && "textarea"}
          rows={textarea ? 3 : 0}
          autoComplete="off"
          className={`p-[8px] px-2 ${
            label && "pt-2"
          } w-full bg-[#ffffff] ${fieldClass} ${
            type === "password" ? "pr-10" : ""
          }`}
          name={name}
          placeholder={placeholder}
          type={type === "password" && !showPassword ? "password" : "text"}
          {...rest}
        />
        {type === "password" && onShowPassword ? (
          <button
            className="flex items-center justify-center text-center"
            title="show password"
            onClick={() => onShowPassword(!showPassword)}
            type="button"
          >
            {!showPassword ? (
              <HiEyeOff size={20} className="text-gray-400 absolute right-3" />
            ) : (
              <HiEye size={20} className="text-gray-400 absolute right-3" />
            )}
          </button>
        ) : null}
      </div>
      {errors[name] && (
        <p className={`text-red-400 bottom-2 h-[24px]`}>{errors[name]}</p>
      )}
    </div>
  );
};

export default AppFormField;
