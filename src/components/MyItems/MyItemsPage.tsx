"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MyItemsTable from "./MyItemsTable";
export type TFoundItemType = {
  category: {
    name: string;
  };
  id: string;
  userId: string;
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
  isItemFound: boolean;
  photoUrl: any;
  createdAt: string;
  updatedAt: string;
  claimsId: any;
};

function MyItemsPage() {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const isItemFound = searchParams.get("isItemFound");
  console.log(typeof isItemFound, !!isItemFound);
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
  return (
    <>
      <MyItemsTable data={data} />
    </>
  );
}

export default MyItemsPage;
