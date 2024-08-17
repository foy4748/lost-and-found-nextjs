import LostItemCard from "@/components/ui/LostItemCard";
import { TLostItem } from "@/app/lost-items/components/LostItemPageView";

async function RecentLostItems() {
  const url = new URL(`${process.env.SERVER_ADDRESS}/api/found-items`);
  url.searchParams.set("limit", "5");
  url.searchParams.set("order", "desc");
  const res = await fetch(url.toString(), { next: { revalidate: 30 } });
  const { data, meta } = await res.json();
  return (
    <>
      <section className="max-w-[1440px] mx-auto px-2 md:px-5 lg:px-10">
        <h2 className="text-4xl font-bold text-center my-8">
          Recently Lost items
        </h2>
        <section className="grid grid-cols-12 gap-4">
          {data?.map((d: TLostItem, idx: number) => (
            <div
              className={`col-span-12 md:col-span-6 lg:col-span-4 
			  ${idx + 1 == 4 ? "lg:col-start-3" : ""}
			  ${idx + 1 == 5 ? "md:col-start-4" : ""}`}
              key={d.id}
            >
              <LostItemCard data={d} />
            </div>
          ))}
        </section>
      </section>
    </>
  );
}

export default RecentLostItems;
