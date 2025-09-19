import { Suspense } from "react";
import LostItemPageView from "./components/LostItemPageView";
import SearchAndFilterForm from "./components/SearchAndFilterForm";
import Loading from "./loading";

export const dynamic = "force-dynamic";

export type TSearchParams = {
  limit?: `${number}`;
  page?: `${number}`;
  categoryId: string;
  searchTerm: string;
  isItemFound: string | `${number}`;
};
async function LostItemPage({
  searchParams,
}: {
  searchParams: Promise<TSearchParams>;
}) {
  const parsedSearchParams = await searchParams;
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SearchAndFilterForm />
        <LostItemPageView params={parsedSearchParams} />
      </Suspense>
    </>
  );
}

export default LostItemPage;
