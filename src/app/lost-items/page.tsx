import LostItemPageView from "@/components/ReportLost/LostItemPageView";
import SearchAndFilterForm from "@/components/ReportLost/SearchAndFilterForm";

export type TSearchParams = {
  limit?: `${number}`;
  page?: `${number}`;
  categoryId: string;
};
function LostItemPage({ searchParams }: { searchParams: TSearchParams }) {
  return (
    <>
      <SearchAndFilterForm />
      <LostItemPageView params={searchParams} />
    </>
  );
}

export default LostItemPage;
