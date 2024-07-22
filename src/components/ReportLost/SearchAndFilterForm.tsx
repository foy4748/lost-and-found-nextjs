"use client";

import useCategory from "@/hooks/useCategory";
import { Select } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

let debounce: unknown;
function SearchAndFilterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.get("categoryId"));
  const { mappedCategories } = useCategory();

  const handleCategoryChange = (e: any) => {
    const value = String(e.target.value);
    const path = window.location.href;
    const url = new URL(path);
    url.searchParams.set("categoryId", value);
    url.searchParams.set("page", String(1));
    router.push(url.toString());
  };

  const handleSearchChange = (e: any) => {
    clearInterval(debounce as number);
    debounce = setTimeout(() => {
      const value = String(e.target.value);
      const path = window.location.href;
      const url = new URL(path);
      url.searchParams.set("searchTerm", value);
      url.searchParams.set("page", String(1));
      router.push(url.toString());
      console.log(url.searchParams.get("searchTerm"));
    }, 800);
  };
  return (
    <>
      <Select
        defaultValue={searchParams.get("categoryId") || ""}
        onChange={handleCategoryChange}
      >
        <option value={""}>Select Category</option>
        {Object.keys(mappedCategories).map((itm) => (
          <option key={itm} value={itm}>
            {mappedCategories[itm]}
          </option>
        ))}
      </Select>
      <input type="search" onChange={handleSearchChange} />
    </>
  );
}

export default SearchAndFilterForm;
