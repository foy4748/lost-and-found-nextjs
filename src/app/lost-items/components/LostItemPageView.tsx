import GridLayout from "@/components/ui/GridLayout";
import LostItemCard from "@/components/ui/LostItemCard";
import { TSearchParams } from "@/app/lost-items/page";
import PaginationButton from "@/components/ui/PaginationButton";
import { Suspense } from "react";
import CenterItem from "@/components/ui/CenterItem";

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

async function LostItemPageView({ params }: { params: TSearchParams }) {
  const url = new URL(`${process.env.SERVER_ADDRESS}/api/found-items`);

  url.searchParams.set("limit", params?.limit ?? "12");
  url.searchParams.set("page", params?.page ?? "1");

  if (params?.categoryId) {
    url.searchParams.set("categoryId", params?.categoryId);
  }

  if (params?.searchTerm) {
    url.searchParams.set("searchTerm", params?.searchTerm);
  }

  const res = await fetch(url.toString(), { next: { tags: ["Items"] } });
  const { data, meta } = await res.json();

  // For pagination
  const pages = Array.from(
    { length: Math.ceil(meta?.total / meta?.limit) },
    (_, i) => i + 1
  );

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
