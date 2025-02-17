"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidatePathFromClient = async (path: string) => {
  revalidatePath(path);
};

export const revalidateTagFromClient = async (tag: string) => {
  revalidateTag(tag);
};
