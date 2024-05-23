"use client";
import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Dropdown } from "flowbite-react";
import { useGetCategoryQuery } from "@/redux/apiSlices/categoryApiSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useGetReportFoundItemQuery,
  usePostReportFoundItemMutation,
} from "@/redux/apiSlices/reportFoundItemApiSlice";

function LostItemReportForm() {
  const { register, handleSubmit } = useForm();
  const [postReport, result] = usePostReportFoundItemMutation();

  const { data: categoires } = useGetCategoryQuery(null);
  const { data: foundItems } = useGetReportFoundItemQuery({
    limit: 5,
    sortOrder: "desc",
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "Select Please",
  });

  const submitReport = (data: any) => {
    const payload = { ...data, categoryId: selectedCategory.id };
    console.log(payload);
    if (!selectedCategory.id) {
      toast.error("Please, select category");
      return;
    }
    //postReport(payload);
    console.log(foundItems);
  };
  return (
    <form
      onSubmit={handleSubmit(submitReport)}
      className="flex w-11/12 md:w-1/2 flex-col gap-4"
    >
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
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LostItemReportForm;
