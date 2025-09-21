"use server";

import { TSearchParams } from "@/app/lost-items/page";

const getItems = async (params: TSearchParams) => {
  const url = new URL(`${process.env.SERVER_ADDRESS}/api/found-items`);

  url.searchParams.set("limit", params?.limit ?? "12");
  url.searchParams.set("page", params?.page ?? "1");

  if (params?.categoryId) {
    url.searchParams.set("categoryId", params?.categoryId);
  }

  if (params?.searchTerm) {
    url.searchParams.set("searchTerm", params?.searchTerm);
  }

  if (params?.isItemFound) {
    url.searchParams.set("isItemFound", params?.isItemFound);
  }

  if (params?.sortBy && params.sortOrder) {
    url.searchParams.set("sortBy", params?.sortBy);
    url.searchParams.set("sortOrder", params?.sortOrder);
  }

  const res = await fetch(url.toString(), {
    next: {
      tags: [
        "Items",
        String(url.searchParams.get("categoryId")),
        String(url.searchParams.get("searchTerm")),
        String(url.searchParams.get("isItemFound")),
        String(url.searchParams.get("sortBy")),
        String(url.searchParams.get("sortOrder")),
      ],
      revalidate: 60,
    },
  });
  const { data, meta } = await res.json();
  return { data, meta };
};

export default getItems;
