import GridLayout from "../ui/GridLayout";
import LostItemCard from "./LostItemCard";
import { TSearchParams } from "@/app/lost-items/page";
import PaginationButton from "../ui/PaginationButton";
import { Suspense } from "react";
import CenterItem from "../ui/CenterItem";

export type TLostItem = {
  id: string;
  userId: string;
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
  isItemFound: boolean;
};

async function LostItemPageView({ params }: { params: TSearchParams }) {
  const url = `${process.env.SERVER_ADDRESS}/api/found-items?limit=${
    params?.limit ?? 12
  }&page=${params?.page ?? 1}${
    params?.categoryId ? `&categoryId=${params?.categoryId}` : ""
  }${params?.searchTerm ? `&searchTerm=${params?.searchTerm}` : ""}`;

  const res = await fetch(url);
  const { data, meta } = await res.json();

  // For pagination
  const pages = [];
  for (let i = 1; i <= Math.ceil(meta?.total / meta?.limit); i++) pages.push(i);
  return (
    <>
      <Suspense fallback={"Loading..."}>
        {data.length <= 0 ? (
          <CenterItem className="font-extrabold">No Items found</CenterItem>
        ) : (
          <></>
        )}
        <GridLayout>
          {data?.map((d: TLostItem) => (
            <LostItemCard key={d.id} data={d} />
          ))}
        </GridLayout>
      </Suspense>
      {/* Pagination Bullets */}
      <div className="flex justify-center my-10">
        <div className="flex justify-around w-1/2">
          {pages.map((itm, idx) => (
            <PaginationButton
              key={idx}
              page={itm}
              isActive={itm == Number(params?.page ?? 1)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default LostItemPageView;
