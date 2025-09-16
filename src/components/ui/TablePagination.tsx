"use client";

import { Pagination } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, Dispatch } from "react";

type TTablePagination = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
  itemLimit: number;
  setItemLimit: Dispatch<SetStateAction<number>>;
};

export default function TablePagination({
  currentPage,
  setCurrentPage,
  totalItems,
  itemLimit,
}: TTablePagination) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    // 1. Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams.toString());

    // 2. Update the 'page' parameter
    params.set("page", page.toString());

    // 3. Generate the new URL string
    const newUrl = `?${params.toString()}`;

    // 4. Update the URL using the router
    router.push(newUrl); // scroll: false prevents scrolling to top
  };
  const totalPages = Math.ceil(totalItems / itemLimit);

  return (
    <div className={`flex overflow-x-auto sm:justify-center `}>
      <Pagination
        className="my-4"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
