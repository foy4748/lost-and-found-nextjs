import GridLayout from "@/components/ui/GridLayout";
import LostItemCard from "@/components/ui/LostItemCard";
import { TSearchParams } from "@/app/lost-items/page";
import { Suspense } from "react";
import CenterItem from "@/components/ui/CenterItem";
import ItemsPagination from "./ItemsPagination";

export type TLostItem = {
  id: string;
  userId: string;
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
  isItemFound: boolean;
  photoUrl?: string;
};

async function LostItemPageView({
  data,
  meta,
}: {
  data: TLostItem[];
  meta: { total: number | `${number}` };
}) {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        {data?.length <= 0 ? (
          <CenterItem className="font-extrabold">No Items found</CenterItem>
        ) : (
          <></>
        )}
        <GridLayout>
          {data?.map((d: TLostItem) => <LostItemCard key={d.id} data={d} />)}
        </GridLayout>
      </Suspense>
      {/* Pagination Bullets */}
      <ItemsPagination totalItems={meta?.total} />
      {/*
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
	  */}
    </>
  );
}

export default LostItemPageView;
