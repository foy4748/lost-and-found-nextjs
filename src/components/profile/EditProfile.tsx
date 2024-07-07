"use client";

import { Button, Label, Modal, TextInput, FileInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import LoadingToast from "../ui/LoadingToast";
import { pickFieldsFromObject } from "@/utilities/utilities";
import { useUpdateUserProfileMutation } from "@/redux/apiSlices/authApiSlice";

export type TUserUpdatePayload = {
  id?: string;
  name?: string;
  email?: string;
  photoFile?: string;
  createdAt?: string;
  updatedAt?: string;
  profile: TUserProfileUpdatePayload;
};

export type TUserProfileUpdatePayload = {
  id?: string;
  userId?: string;
  age?: number;
  bio?: string;
  photoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};
const TUserUpdateProfilePayloadFields: Array<keyof TUserProfileUpdatePayload> =
  ["age", "bio", "photoUrl"];

function EditProfile({ payload }: { payload: TUserUpdatePayload }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const { handleSubmit, register } = useForm<TUserUpdatePayload>({
    defaultValues: payload,
  });
  const submitReport = async (data: TUserUpdatePayload) => {
    // Trying to upload photo
    if (data["photoFile"]?.length && data["photoFile"][0]) {
      // Uploading Photo to IMG BB ------------
      const photoFile = new FormData();
      const file = data["photoFile"][0];
      photoFile.append("image", file);

      const IMG_BB_KEY = process.env.NEXT_PUBLIC_IMG_BB_KEY;
      const photoUpUrl = `https://api.imgbb.com/1/upload?key=${IMG_BB_KEY}`;
      const photoUpOptions = {
        method: "POST",
        body: photoFile,
      };

      try {
        const photoUpResponse = await fetch(photoUpUrl, photoUpOptions);
        const photoUpResult = await photoUpResponse.json();
        if (!photoUpResult.success) {
          toast.error("Couldn't Upload Product Photo");
          return;
        }
        // Setting photo URL in payload
        console.log("photoUpResult", photoUpResult);
        data["profile.photoUrl" as keyof TUserUpdatePayload] = String(
          photoUpResult.data.url
        );

        //------ ---------- ----------- ----------
      } catch (error) {
        console.error(error);
        toast.error("Couldn't Upload Product Photo");
      }
    }
    const payload = {} as TUserUpdatePayload;
    if (data["name"]) payload["name"] = data["name"];
    const updatedProfile = pickFieldsFromObject(
      data.profile,
      TUserUpdateProfilePayloadFields
    );
    payload["profile"] = updatedProfile;
    if (payload?.profile) payload.profile.age = Number(payload.profile.age);

    updateUserProfile(payload);
  };
  return (
    <>
      <p
        onClick={() => setOpenModal(true)}
        className="text-cyan-500 cursor-pointer"
      >
        ✏ Edit Profile ✏
      </p>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <form
            onSubmit={handleSubmit(submitReport)}
            className="flex  flex-col gap-4"
          >
            <div>
              <h1 className="form-title">Update Profile</h1>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Name" />
                </div>
                <TextInput
                  id="small"
                  type="text"
                  sizing="sm"
                  {...register("name")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="large" value="Age" />
                </div>
                <TextInput
                  id="large"
                  type="number"
                  sizing="sm"
                  {...register("profile.age")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Bio" />
                </div>
                <TextInput
                  id="small"
                  type="text"
                  sizing="lg"
                  {...register("profile.bio")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file-upload" value="Upload Photo" />
                </div>
                <FileInput id="file-upload" {...register("photoFile")} />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
      <LoadingToast isLoading={isLoading} />
    </>
  );
}

export default EditProfile;
