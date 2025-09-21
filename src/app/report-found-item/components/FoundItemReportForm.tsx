"use client";
import { Label, TextInput, FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Dropdown, Button } from "flowbite-react";
import { useGetCategoryQuery } from "@/redux/apiSlices/categoryApiSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  //useGetReportFoundItemQuery,
  usePostReportFoundItemMutation,
} from "@/redux/apiSlices/reportFoundItemApiSlice";
import {
  //revalidatePathFromClient,
  revalidateTagFromClient,
} from "@/actions/revalidatingData";
import { uploadPhoto } from "@/actions/uploadPhoto";
import LoadingToast from "@/components/ui/LoadingToast";
import { useRouter } from "next/navigation";
import { validateFileSize } from "@/utilities/utilities";

let token = window.localStorage.getItem("token");
console.log("ReportForm", token);
//const decoded = jwtDecode(String(token)) as { id: string };

function FoundItemReportForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const [postReport, { isLoading }] = usePostReportFoundItemMutation();

  const { data: categoires } = useGetCategoryQuery(null);
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "Select Please",
  });
  const router = useRouter();

  // Watch the photoFile field to get its value
  const photoFileValue = watch("photoFile");

  const submitReport = async (data: any) => {
    setLoading(true);
    const payload = { ...data, categoryId: selectedCategory.id };
    console.log(payload);
    if (!selectedCategory.id) {
      toast.error("Please, select category");
      return;
    }
    //postReport(payload);
    //console.log(foundItems);

    // Validate file size before proceeding
    const fileSizeError = validateFileSize(data.photoFile);
    if (fileSizeError !== true) {
      setError("photoFile", {
        type: "manual",
        message: fileSizeError as string,
      });
      toast.error(fileSizeError as string);
      return;
    }

    // Uploading Photo to IMG BB ------------
    const photoFile = new FormData();
    const file = data["photoFile"][0];
    photoFile.append("image", file);

    try {
      const photoUrl = await uploadPhoto(photoFile);
      if (!photoUrl) {
        toast.error("Couldn't Upload Product Photo");
        return;
      }
      // Setting photo URL in payload
      payload["photoUrl"] = String(photoUrl);

      //------ ---------- ----------- ----------

      // Posting Item data in database ------------
      delete payload["photoFile"];
      await postReport(payload);
      revalidateTagFromClient("Items");
      reset();
      toast.success("Reported Found Item successfully");
      setLoading(false);
      router.push("/lost-items");
      //------ ---------- ----------- ----------
    } catch (error) {
      console.error(error);
      toast.error("Couldn't Upload Product Photo");
      setLoading(false);
    }
  };
  /*
  const { data: foundItems } = useGetReportFoundItemQuery({
    limit: 5,
    sortOrder: "desc",
    userId: String(decoded.id),
  });
  */
  return (
    <form
      onSubmit={handleSubmit(submitReport)}
      className="flex w-11/12 md:w-1/2 flex-col gap-4"
    >
      <div>
        <h1 className="form-title">Report a Found Item</h1>
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
          <Dropdown label={`Selected: ${selectedCategory.name}`} size="sm">
            {categoires?.data?.map((c: any) => {
              return (
                <Dropdown.Item
                  key={c.id}
                  value={c.id}
                  onClick={() =>
                    setSelectedCategory({ id: c.id, name: c.name })
                  }
                >
                  {c.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="file-upload" value="Upload Photo" />
          </div>
          <FileInput id="file-upload" required {...register("photoFile")} />
          {errors.photoFile && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.photoFile.message)}
            </p>
          )}
          {photoFileValue && photoFileValue[0] && (
            <p className="text-gray-600 text-sm mt-1">
              Selected file: {photoFileValue[0].name} (
              {(photoFileValue[0].size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>
      </div>
      <Button type="submit">Submit</Button>
      <LoadingToast isLoading={loading || isLoading} />
    </form>
  );
}

export default FoundItemReportForm;
