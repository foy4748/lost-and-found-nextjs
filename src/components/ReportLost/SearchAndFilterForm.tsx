"use client";

import useCategory from "@/hooks/useCategory";
import { Select } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";

function SearchAndFilterForm() {
  const router = useRouter();
  const { mappedCategories } = useCategory();
  const handleCategoryChange = (e: any) => {
    const value = String(e.target.value);
    const path = window.location.href;
    const url = new URL(path);
    url.searchParams.set("categoryId", value);
    router.push(url.toString());
  };
  return (
    <>
      <Select defaultValue={""} onChange={handleCategoryChange}>
        <option value={""}>Select Category</option>
        {Object.keys(mappedCategories).map((itm) => (
          <option key={itm} value={itm}>
            {mappedCategories[itm]}
          </option>
        ))}
      </Select>
    </>
  );
}

export default SearchAndFilterForm;
