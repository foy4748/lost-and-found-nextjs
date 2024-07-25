"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidatePathFromClient = (path: string) => {
  revalidatePath(path);
};

export const revalidateTagFromClient = (tag: string) => {
  revalidateTag(tag);
};
