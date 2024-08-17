import LostItemPageView from "./components/LostItemPageView";
import SearchAndFilterForm from "./components/SearchAndFilterForm";

export type TSearchParams = {
  limit?: `${number}`;
  page?: `${number}`;
  categoryId: string;
  searchTerm: string;
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
