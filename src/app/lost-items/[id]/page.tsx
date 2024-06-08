import Claims from "@/components/ReportFound/Claims";
import FoundBy from "@/components/ReportLost/FoundBy";
import ReportFoundButton from "@/components/ReportLost/ReportFoundButton";

async function ReportFoundItem({ params }: { params: { id: string } }) {
  // Single Item Data
  const foundItemRes = await fetch(
    `${process.env.SERVER_ADDRESS}/api/found-items/${params.id}`
  );
  const { data: foundItem } = await foundItemRes.json();

  // Checking whether its found by someone or not
  const foundByRes = await fetch(
    `${process.env.SERVER_ADDRESS}/api/found-items/found-by/${params.id}`
  );
  const { data: foundBy } = await foundByRes.json();

  return (
    <>
      <p className="mb-4">{JSON.stringify(foundItem)}</p>
      {!foundBy && <ReportFoundButton foundItemId={params.id} />}
      {foundBy && <FoundBy foundItemId={params.id} foundById={foundBy?.id} />}
      {foundBy && <Claims foundById={foundBy?.id} />}
    </>
  );
}

export default ReportFoundItem;
