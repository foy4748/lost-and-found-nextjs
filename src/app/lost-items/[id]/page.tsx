import FoundBy from "@/components/ReportLost/FoundBy";
import ReportFoundButton from "@/components/ReportLost/ReportFoundButton";

async function ReportFoundItem({ params }: { params: { id: string } }) {
  const res = await fetch(
    `${process.env.SERVER_ADDRESS}/api/found-items/${params.id}`
  );
  const { data } = await res.json();
  return (
    <>
      <p className="mb-4">{JSON.stringify(data)}</p>
      <ReportFoundButton foundItemId={params.id} />
      <FoundBy foundItemId={params.id} />
    </>
  );
}

export default ReportFoundItem;
