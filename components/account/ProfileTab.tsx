import React, { DetailedHTMLProps } from "react";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import { ImageState } from "../../pages/account";
import SubmitButton from "../forms/SubmitButton";
import { Client, PetCareProvider } from "../../pages/_app";
import * as Yup from "yup";

interface ProfileTabProps {
  initialValues: any;
  handleSubmit: (values: any) => Promise<void>;
  image: ImageState | undefined;
  fileInputRef: any;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  user: Client | PetCareProvider;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  initialValues,
  handleSubmit,
  user,
  fileInputRef,
  image,
  handleFileChange,
  loading,
}) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    age: Yup.string().required(),
    phone: Yup.string()
      .matches(phoneRegExp, "must be a valid phone number 09xxxxxxxxx")
      .min(11, "too short 09xxxxxxxxx")
      .max(11, "too long 09xxxxxxxxx")
      .required(),
  });
  return (
    <div className="">
      <FormikField
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <div className="flex flex-row gap-2">
          <img
            className="h-[120px] w-[120px] rounded-full"
            src={image?.imageData || user?.imgUrl}
          />
          <div className="flex items-center justify-center ml-4">
            <input
              ref={fileInputRef}
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 text-xs placeholder:text-gray-300"
            />
          </div>
        </div>
        <div>
          <div className="w-full h-[1px] my-5 bg-gray-200 relative -bottom-0" />
          <h4 className="font-bold mb-3">Personal Information</h4>
          <div className="flex flex-col gap-2">
            <div>
              <p className="font-semibold text-xs text-gray-400 mb-1">
                Full name
              </p>
              <AppFormField name="name" placeholder="Full name" />
            </div>
            <div>
              <p className="font-semibold text-xs text-gray-400 mb-1">Age</p>
              <AppFormField name="age" placeholder="Age" />
            </div>
            <div>
              <p className="font-semibold text-xs text-gray-400 mb-1">Phone#</p>
              <AppFormField name="phone" placeholder="Phone#" />
            </div>
            {user?.phone === undefined || user?.phone === "" ? (
              <div className="bg-yellow-50 w-full p-2 text-left my-2">
                <span className="text-yellow-600">
                  phone number will be used for future transactions
                </span>
              </div>
            ) : null}
            <SubmitButton
              disabled={loading}
              containerClass="self-end w-[20%]"
              title="Save"
            />
          </div>
        </div>
      </FormikField>
    </div>
  );
};

export default ProfileTab;
