"use client";
import { jwtDecode } from "jwt-decode";
import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Dropdown, Button } from "flowbite-react";
import { useGetCategoryQuery } from "@/redux/apiSlices/categoryApiSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetReportFoundItemQuery,
  usePostReportFoundItemMutation,
} from "@/redux/apiSlices/reportFoundItemApiSlice";

let token = window.localStorage.getItem("token");
console.log("ReportForm", token);
const decoded = jwtDecode(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI3ODM3MDlmLTEyNzYtNDU4ZC05Njg3LTEyNWFmODQ4MWUwMCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTcxNjQzOTYwNywiZXhwIjoxNzE2NDQzMjA3fQ.MPk_zvjxc4e41iywBqbutcBp5OUZ4EHUoib6aVjl2es"
) as { id: string };

function LostItemReportForm() {
  const { register, handleSubmit } = useForm();
  const [postReport, result] = usePostReportFoundItemMutation();

  const { data: categoires } = useGetCategoryQuery(null);
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
  const { data: foundItems } = useGetReportFoundItemQuery({
    limit: 5,
    sortOrder: "desc",
    userId: String(decoded.id),
  });
  return (
    <form
      onSubmit={handleSubmit(submitReport)}
      className="flex w-11/12 md:w-1/2 flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="small" value="Lost Item Name" />
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
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default LostItemReportForm;
