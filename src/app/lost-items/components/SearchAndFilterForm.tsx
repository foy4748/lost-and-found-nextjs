"use client";

import useCategory from "@/hooks/useCategory";
import { Select, Button, ButtonGroup } from "flowbite-react";
// import { useRouter, useSearchParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

let debounce: unknown;
function SearchAndFilterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mappedCategories } = useCategory();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFound, setIsFound] = useState<boolean | undefined>();

  useEffect(() => {
    setSearchTerm(String(searchParams.get("searchTerm") ?? ""));
    const isFoundSearchParam = searchParams.get("isItemFound");
    if (isFoundSearchParam === undefined || !isFoundSearchParam)
      setIsFound(undefined);
    if (isFoundSearchParam === "1") setIsFound(true);
    if (isFoundSearchParam === "0") setIsFound(false);
  }, [searchParams]);

  const handleIsFoundChange = (value: boolean | undefined) => {
    const path = window.location.href;
    const url = new URL(path);
    if (value === true) url.searchParams.set("isItemFound", "1");
    if (value === false) url.searchParams.set("isItemFound", "0");
    if (value === undefined) url.searchParams.delete("isItemFound");
    url.searchParams.set("page", String(1));
    router.push(url.toString());
  };

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
      <section className="flex flex-col md:flex-row justify-end px-2 my-4 gap-2">
        <ButtonGroup>
          <Button
            color={isFound === undefined ? undefined : "light"}
            onClick={() => handleIsFoundChange(undefined)}
          >
            All
          </Button>
          <Button
            color={isFound === true ? undefined : "light"}
            onClick={() => handleIsFoundChange(true)}
          >
            Found
          </Button>
          <Button
            color={isFound === false ? undefined : "light"}
            onClick={() => handleIsFoundChange(false)}
          >
            Not Found
          </Button>
        </ButtonGroup>
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
