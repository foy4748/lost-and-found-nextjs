"use client";
import { jwtDecode } from "jwt-decode";
import { Label, TextInput, FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Dropdown, Button } from "flowbite-react";
import { useGetCategoryQuery } from "@/redux/apiSlices/categoryApiSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePostReportLostItemMutation } from "@/redux/apiSlices/reportFoundItemApiSlice";
import { revalidateTagFromClient } from "@/actions/revalidatingData";
import { uploadPhoto } from "@/actions/uploadPhoto";

let token = window.localStorage.getItem("token");
console.log("ReportForm", token);
const decoded = jwtDecode(String(token)) as { id: string };

function LostItemReportForm() {
  const { register, handleSubmit, reset } = useForm();
  const [postReport, result] = usePostReportLostItemMutation();

  const { data: categoires } = useGetCategoryQuery(null);
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "Select Please",
  });

  const submitReport = async (data: any) => {
    const payload = { ...data, categoryId: selectedCategory.id };
    console.log(payload);
    if (!selectedCategory.id) {
      toast.error("Please, select category");
      return;
    }
    //postReport(payload);
    //console.log(foundItems);

    // Uploading Photo to IMG BB ------------
    const photoFile = new FormData();
    const file = data["photoFile"][0];
    photoFile.append("image", file);

    try {
      const photoUrl = await uploadPhoto(photoFile);
      if (!photoUrl) {
        toast.error("Couldn't Upload Product Photo");
      } else {
        payload["photoUrl"] = String(photoUrl);
      }
      //------ ---------- ----------- ----------

      // Posting Item data in database ------------
      delete payload["photoFile"];
      await postReport(payload);
      reset();
      revalidateTagFromClient("/lost-items");
      toast.success("Reported Lost Item successfully");
      //------ ---------- ----------- ----------
    } catch (error) {
      console.error(error);
      toast.error("Couldn't Upload Product Photo");
    }
  };
  /*
  const { data: foundItems } = useGetReportFoundItemQuery({
    limit: 5,
    sortOr
	der: "desc",
    userId: String(decoded.id),
  });
  */
  return (
    <form
      onSubmit={handleSubmit(submitReport)}
      className="flex w-11/12 md:w-1/2 flex-col gap-4"
    >
      <div>
        <h1 className="form-title">Report a Lost Item</h1>
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
          <FileInput id="file-upload" {...register("photoFile")} />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default LostItemReportForm;
