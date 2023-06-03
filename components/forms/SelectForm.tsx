import React, { Dispatch, SetStateAction } from "react";
import { Listbox } from "@headlessui/react";
import { BsCheck, BsChevronDown } from "react-icons/bs";

interface SelectFormProps {
  select: any;
  onSetSelect: Dispatch<SetStateAction<{ id: number; label: string }>>;
  selectItems: any;
  label?: string;
  type?: string;
}

const SelectForm: React.FC<SelectFormProps> = ({
  select,
  onSetSelect,
  selectItems,
  label = "",
  type = "default",
}) => {
  return (
    <div
      className="w-full"
      title={`${
        select.label === "Inside"
          ? "On-site"
          : select.label === "Outside"
          ? "Off-site"
          : ""
      }`}
    >
      {type === "default" ? (
        <>
          {label && (
            <span className="px-3 font-semibold bg-white text-xs w-full">
              {label}
            </span>
          )}
          <Listbox value={selectItems} onChange={onSetSelect}>
            <div className="relative ">
              <Listbox.Button
                className="relative w-full cursor-default text-left 
                rounded-md bg-white py-[0.70rem] border border-gray-300 pl-3 
                pr-10 text-leftfocus:outline-none
                focus-visible:ring-2 sm:text-sm"
              >
                <span className="block truncate">{select?.label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <BsChevronDown
                    className="h-5 w-5 text-black"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-20 focus:outline-none sm:text-sm">
                {selectItems.map((item: any) => (
                  <Listbox.Option
                    onClick={() => onSetSelect(item)}
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-green-550 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    <>
                      <span
                        className={`text-left ${
                          select?.label === item.label
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {item.label}
                      </span>
                      {select?.label === item.label ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-800">
                          <BsCheck size={20} aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </>
      ) : (
        <>
          {label && (
            <span className="px-3 font-semibold text-xs w-full">{label}</span>
          )}
          <Listbox value={selectItems} onChange={onSetSelect}>
            <div className="relative">
              <Listbox.Button
                className="relative w-full cursor-default text-left 
                shadow-sm border border-gray-100
                rounded-lg py-3 pl-3 
                pr-10 text-leftfocus:outline-none
                focus-visible:ring-2 sm:text-sm"
              >
                <span className="block truncate font-medium">
                  {select?.label}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <BsChevronDown
                    className="h-5 w-5 text-black"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-sm border border-gray-100 focus:outline-none sm:text-sm">
                {selectItems.map((item: any) => (
                  <Listbox.Option
                    onClick={() => onSetSelect(item)}
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-green-550 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    <>
                      <span
                        className={`text-left ${
                          select?.label === item.label
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {item.label}
                      </span>
                      {select?.label === item.label ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-800">
                          <BsCheck size={20} aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </>
      )}
    </div>
  );
};

export default SelectForm;
