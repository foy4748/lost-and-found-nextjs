import GridLayout from "../ui/GridLayout";
import LostItemCard from "./LostItemCard";

export type TLostItem = {
  id: string;
  userId: string;
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
  isItemFound: boolean;
};

async function LostItemPageView() {
  const res = await fetch(
    `${process.env.SERVER_ADDRESS}/api/found-items?limit=12`
  );
  const { data } = await res.json();
  return (
    <>
      <GridLayout>
        {data?.map((d: TLostItem) => (
          <LostItemCard key={d.id} data={d} />
        ))}
      </GridLayout>
    </>
  );
}

export default LostItemPageView;
