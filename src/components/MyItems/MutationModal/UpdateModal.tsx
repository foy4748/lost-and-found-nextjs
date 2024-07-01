"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { TFoundItemType } from "../MyItemsPage";
import { Dropdown, FileInput, Select } from "flowbite-react";
import { useForm } from "react-hook-form";
import useCategory from "@/hooks/useCategory";
import toast from "react-hot-toast";

export type TUpdateModal = {
  payload: TFoundItemType;
};

export default function UpdateModal({ payload }: TUpdateModal) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { categories } = useCategory();
  const { handleSubmit, register } = useForm({
    defaultValues: payload,
  });
  const allowedFields: Array<keyof TFoundItemType> = [
    "id",
    "categoryId",
    "foundItemName",
    "description",
    "location",
    "photoUrl",
  ];
  console.log(categories);

  const submitReport = async (data: TFoundItemType) => {
    console.log(data);
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
        payload["photoUrl"] = String(photoUpResult.data.url);

        //------ ---------- ----------- ----------
      } catch (error) {
        console.error(error);
        toast.error("Couldn't Upload Product Photo");
      }
    }

    const updatedPayload = {} as Partial<TFoundItemType>;
    for (let itm of allowedFields) {
      updatedPayload[itm] = data[itm];
    }
    console.log(updatedPayload);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} size={"xs"}>
        ✏
      </Button>
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
              <h1 className="form-title">Update Item</h1>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Found Item Name" />
                </div>
                <TextInput
                  id="small"
                  type="text"
                  sizing="sm"
                  {...register("foundItemName")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="large" value="Description" />
                </div>
                <TextInput
                  id="large"
                  type="text"
                  sizing="lg"
                  {...register("description")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Location" />
                </div>
                <TextInput
                  id="small"
                  type="text"
                  sizing="sm"
                  {...register("location")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Category" />
                </div>
                <Select id="countries" {...register("categoryId")} required>
                  {categories &&
                    categories?.data?.length &&
                    categories?.data?.map((c: { name: string; id: string }) => {
                      console.log(c);
                      return (
                        <option key={c["id"]} value={c["id"]}>
                          {c["name"]}
                        </option>
                      );
                    })}
                </Select>
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
    </>
  );
}
