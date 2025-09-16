"use client";
import TablePagination from "@/components/ui/TablePagination";
import React, { useState } from "react";

function ItemsPagination({ totalItems }: { totalItems: number | `${number}` }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemLimit, setItemLimit] = useState<number>(12);
  return (
    <>
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={Number(totalItems) || 0}
        itemLimit={itemLimit}
        setItemLimit={setItemLimit}
      />
    </>
  );
}

export default ItemsPagination;
