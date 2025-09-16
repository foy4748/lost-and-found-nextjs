"use client";
import { useSearchParams } from "next/navigation";
import MyItemsTable from "./MyItemsTable";
import { useGetFoundItemByUserQuery } from "@/redux/apiSlices/reportFoundItemApiSlice";
import { useState } from "react";
import TablePagination from "@/components/ui/TablePagination";
import TableSkeleton from "@/components/customUI/GridSystem/TableLoading";
export type TFoundItemType = {
  category: {
    name: string;
  };
  FoundBy: TFoundBy;
  id: string;
  userId: string;
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
  isItemFound: boolean;
  photoUrl: string;
  photoFile: any;
  createdAt: string;
  updatedAt: string;
  claimsId: any;
};

export type TFoundBy = {
  id: string;
  user: {
    name: string;
    email: string;
  };
};

function MyItemsPage() {
  //const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemLimit, setItemLimit] = useState<number>(5);
  const searchParams = useSearchParams();
  const isItemFound = searchParams.get("isItemFound");
  const { data, isLoading, isFetching } = useGetFoundItemByUserQuery({
    isItemFound,
    page: currentPage,
    limit: itemLimit,
  });
  /*
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_ADDRESS
        }/api/found-items/by-user?isItemFound=${
          !!Number(isItemFound) ? "1" : "0"
        }`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data: result } = await res.json();
      setData(result);
    })();
  }, [isItemFound]);
  */
  console.log(data?.data);
  return (
    <>
      <h1 className="form-title">
        {Number(isItemFound) != 0 ? "My Found Items" : "My Lost Items"}
      </h1>
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={data?.meta?.total || 0}
        itemLimit={itemLimit}
        setItemLimit={setItemLimit}
      />
      {isLoading || isFetching ? (
        <TableSkeleton />
      ) : (
        <MyItemsTable data={data?.data} />
      )}
    </>
  );
}

export default MyItemsPage;
// {data?.data && (
// )}
