"use client";
import { useSearchParams } from "next/navigation";
import MyItemsTable from "./MyItemsTable";
import { useGetFoundItemByUserQuery } from "@/redux/apiSlices/reportFoundItemApiSlice";
import { useState } from "react";
import TablePagination from "../ui/TablePagination";
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
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemLimit, setItemLimit] = useState<number>(5);
  const searchParams = useSearchParams();
  const isItemFound = searchParams.get("isItemFound");
  const { data } = useGetFoundItemByUserQuery({
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
  return (
    <>
      <MyItemsTable data={data?.data} />
      {data?.data && (
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={data?.meta?.total}
          itemLimit={itemLimit}
          setItemLimit={setItemLimit}
        />
      )}
    </>
  );
}

export default MyItemsPage;
