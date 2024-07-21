import { Button } from "flowbite-react";
import GridLayout from "../ui/GridLayout";
import TablePagination from "../ui/TablePagination";
import LostItemCard from "./LostItemCard";
import Link from "next/link";

export type TLostItem = {
  id: string;
  userId: string;
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
  isItemFound: boolean;
};

async function LostItemPageView({
  params,
}: {
  params: {
    limit?: `${number}`;
    page?: `${number}`;
  };
}) {
  const res = await fetch(
    `${process.env.SERVER_ADDRESS}/api/found-items?limit=${
      params?.limit ?? 12
    }&page=${params?.page ?? 1}`
  );
  const { data, meta } = await res.json();
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
