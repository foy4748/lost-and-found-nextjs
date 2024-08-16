"use client";

import useCategory from "@/hooks/useCategory";
import { Select } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

let debounce: unknown;
function SearchAndFilterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.get("categoryId"));
  const { mappedCategories } = useCategory();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm(String(searchParams.get("searchTerm") ?? ""));
  }, [searchParams]);

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
    const value = String(e.target.value);
    setSearchTerm(value);
    debounce = setTimeout(() => {
      const path = window.location.href;
      const url = new URL(path);
      url.searchParams.set("searchTerm", String(value));
      url.searchParams.set("page", String(1));
      router.push(url.toString());
      console.log(url.searchParams.get("searchTerm"));
    }, 850);
  };
  return (
    <>
      <section className="flex justify-end px-2 my-4">
        <Select
          value={searchParams.get("categoryId") || ""}
          onChange={handleCategoryChange}
        >
          <option value={""}>Select Category</option>
          {Object.keys(mappedCategories).map((itm) => (
            <option key={itm} value={itm}>
              {mappedCategories[itm]}
            </option>
          ))}
        </Select>
        <input
          value={searchTerm ? String(searchTerm) : ""}
          type="search"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
      </section>
    </>
  );
}

export default SearchAndFilterForm;
