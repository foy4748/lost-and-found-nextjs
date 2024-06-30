"use client";

import { Pagination } from "flowbite-react";
import { SetStateAction, useState, Dispatch } from "react";

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
  setItemLimit,
}: TTablePagination) {
  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemLimit)}
        onPageChange={onPageChange}
      />
    </div>
  );
}
