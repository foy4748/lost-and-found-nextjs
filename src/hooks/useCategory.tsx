import { useGetCategoryQuery } from "@/redux/apiSlices/categoryApiSlice";
export type TCategoryStorage = {
  [key: string]: string;
};

import { useEffect, useState } from "react";
const useCategory = () => {
  const [mappedCategories, setMappedCategories] = useState<TCategoryStorage>(
    {}
  );
  const { data: categories } = useGetCategoryQuery(null);
  useEffect(() => {
    if (categories) {
      const MappedCategories = categories.data.reduce(
        (acc: TCategoryStorage, d: { name: string; id: string }) => {
          acc[String(d.id)] = String(d.name);
          return acc;
        },
        {} as TCategoryStorage
      );
      setMappedCategories(MappedCategories);
    }
  }, [categories]);

  return { mappedCategories, categories };
};
export default useCategory;
