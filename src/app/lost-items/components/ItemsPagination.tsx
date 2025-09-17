"use client";
import TablePagination from "@/components/ui/TablePagination";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ItemsPagination({ totalItems }: { totalItems: number | `${number}` }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams();
  const [itemLimit, setItemLimit] = useState<number>(12);
  useEffect(() => {
    if (searchParams.get("page")) {
      setCurrentPage(Number(searchParams.get("page")));
    }
  }, [searchParams]);
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
