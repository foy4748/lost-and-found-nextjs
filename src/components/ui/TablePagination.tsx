"use client";

import { Pagination } from "flowbite-react";
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
  const onPageChange = (page: number) => setCurrentPage(page);
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
