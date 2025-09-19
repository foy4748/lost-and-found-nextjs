import { Suspense } from "react";
import LostItemPageView from "./components/LostItemPageView";
import SearchAndFilterForm from "./components/SearchAndFilterForm";
import Loading from "./loading";
import getItems from "@/actions/products";

// export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  searchParams: Promise<TSearchParams>;
}) {
  const searchParams = await props.searchParams;
}

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
  const { data, meta } = await getItems(parsedSearchParams);
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchAndFilterForm />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <LostItemPageView data={data} meta={meta} />
      </Suspense>
    </>
  );
}

export default LostItemPage;
