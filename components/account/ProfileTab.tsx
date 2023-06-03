import React, { DetailedHTMLProps } from "react";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import { ImageState } from "../../pages/account";
import SubmitButton from "../forms/SubmitButton";
import { Client, PetCareProvider } from "../../pages/_app";

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
  return (
    <div className="">
      <FormikField initialValues={initialValues} onSubmit={handleSubmit}>
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
