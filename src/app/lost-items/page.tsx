import { Suspense } from "react";
import LostItemPageView from "./components/LostItemPageView";
import SearchAndFilterForm from "./components/SearchAndFilterForm";
import Loading from "./loading";

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
      <Suspense fallback={<Loading />}>
        <SearchAndFilterForm />
        <LostItemPageView params={searchParams} />
      </Suspense>
    </>
  );
}

export default LostItemPage;
