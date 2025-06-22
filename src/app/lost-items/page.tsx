import LostItemPageView from "./components/LostItemPageView";
import SearchAndFilterForm from "./components/SearchAndFilterForm";

export type TSearchParams = {
  limit?: `${number}`;
  page?: `${number}`;
  categoryId: string;
  searchTerm: string;
  isItemFound: string | `${number}`;
};
async function LostItemPage(props: { searchParams: Promise<TSearchParams> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <SearchAndFilterForm />
      <LostItemPageView params={searchParams} />
    </>
  );
}

export default LostItemPage;
