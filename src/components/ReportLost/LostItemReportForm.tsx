"use client";
import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Dropdown } from "flowbite-react";
import { useGetCategoryQuery } from "@/redux/apiSlices/categoryApiSlice";
import { useState } from "react";

function LostItemReportForm() {
  const { register, handleSubmit } = useForm();
  const submitReport = (data: any) => {
    console.log({ ...data, categoryId: selectedCategory.id });
  };
  const { data: categoires } = useGetCategoryQuery(null);
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "Select Please",
  });
  return (
    <form onSubmit={handleSubmit(submitReport)}>
      <div className="flex max-w-md flex-col gap-4">
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
