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
  const [isAscending, setIsAscending] = useState<boolean>(false);

  useEffect(() => {
    setSearchTerm(String(searchParams.get("searchTerm") ?? ""));
    const isFoundSearchParam = searchParams.get("isItemFound");
    if (isFoundSearchParam === undefined || !isFoundSearchParam)
      setIsFound(undefined);
    if (isFoundSearchParam === "1") setIsFound(true);
    if (isFoundSearchParam === "0") setIsFound(false);

    // ===========
    const isSortableParams1 = searchParams.get("sortBy");
    const isSortableParams2 = searchParams.get("sortOrder");
    if (isSortableParams1 && isSortableParams2) setIsAscending(true);
    else setIsAscending(false);
  }, [searchParams]);

  const handleIsFoundChange = (value: boolean | undefined) => {
    const path = window.location.href;
    const url = new URL(path);
    if (value === true) url.searchParams.set("isItemFound", "1");
    if (value === false) url.searchParams.set("isItemFound", "0");
    if (value === undefined) url.searchParams.delete("isItemFound");
    url.searchParams.set("page", String(1));
    router.push(url.toString());
    router.refresh();
  };

  const handleCategoryChange = (e: any) => {
    const value = String(e.target.value);
    const path = window.location.href;
    const url = new URL(path);
    url.searchParams.set("categoryId", value);
    url.searchParams.set("page", String(1));
    router.push(url.toString());
    router.refresh();
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
      router.refresh();
      console.log(url.searchParams.get("searchTerm"));
    }, 850);
  };

  const handleSort = () => {
    const path = window.location.href;
    const url = new URL(path);

    if (!isAscending) {
      url.searchParams.set("sortBy", "createdAt");
      url.searchParams.set("sortOrder", "asc");
      setIsAscending(false);
      router.push(url.toString());
      router.refresh();
    } else {
      url.searchParams.delete("sortBy");
      url.searchParams.delete("sortOrder");
      setIsAscending(true);
      router.push(url.toString());
      router.refresh();
    }
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
        <Button
          title={isAscending ? "Sort by Descending" : "Sort by Ascending"}
          onClick={handleSort}
        >
          {" "}
          {isAscending ? "🔼" : "🔽"}{" "}
        </Button>
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
