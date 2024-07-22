import { Button } from "flowbite-react";
import GridLayout from "../ui/GridLayout";
import LostItemCard from "./LostItemCard";
import Link from "next/link";
import { TSearchParams } from "@/app/lost-items/page";

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
  }`;

  const res = await fetch(url);
  const { data, meta } = await res.json();

  // For pagination
  const pages = [];
  for (let i = 1; i <= Math.ceil(meta?.total / meta?.limit); i++) pages.push(i);
  return (
    <>
      <GridLayout>
        {data?.map((d: TLostItem) => (
          <LostItemCard key={d.id} data={d} />
        ))}
      </GridLayout>
      {/* Pagination Bullets */}
      <div className="flex justify-center my-10">
        <div className="flex justify-around w-1/2">
          {pages.map((itm, idx) => (
            <Link href={`/lost-items?page=${itm}`} key={idx}>
              <Button
                size={"sm"}
                color={itm == Number(params?.page ?? 1) ? "dark" : "light"}
              >
                {itm}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default LostItemPageView;
