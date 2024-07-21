import LostItemPageView from "@/components/ReportLost/LostItemPageView";

function LostItemPage({
  searchParams,
}: {
  searchParams: { limit?: `${number}`; page?: `${number}` };
}) {
  return (
    <>
      <LostItemPageView params={searchParams} />
    </>
  );
}

export default LostItemPage;
