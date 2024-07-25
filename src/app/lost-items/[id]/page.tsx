import SingleLostItem from "@/components/LostItems/SingleLostItem";
import Claims from "@/components/ReportFound/Claims";

async function ReportFoundItem({ params }: { params: { id: string } }) {
  // Single Item Data
  const foundItemRes = await fetch(
    `${process.env.SERVER_ADDRESS}/api/found-items/${params.id}`,
    {
      next: { tags: ["Items", params.id] },
    }
  );
  const { data: foundItem } = await foundItemRes.json();

  // Checking whether its found by someone or not
  const foundByRes = await fetch(
    `${process.env.SERVER_ADDRESS}/api/found-items/found-by/${params.id}`,
    { next: { tags: ["isFound", params.id] } }
  );
  const { data: foundBy } = await foundByRes.json();

  return (
    <>
      <SingleLostItem payload={foundItem} foundBy={foundBy} />
      {foundBy && <Claims enableEditButton={false} foundById={foundBy?.id} />}
    </>
  );
}

export default ReportFoundItem;
