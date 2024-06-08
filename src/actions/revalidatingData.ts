"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidatePathFromClient = (path: string) => {
  revalidatePath(path);
};

export const revalidateTagFromClient = (path: string) => {
  revalidateTag(path);
};
