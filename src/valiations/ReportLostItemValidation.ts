import { validateFileSize } from "@/utilities/utilities";
import { z } from "zod";

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
//const decoded = jwtDecode(String(token)) as { id: string };

// Zod validation
export const reportLostItemSchema = z.object({
  foundItemName: z.string().min(5, "Minimum 5 character required"),
  description: z.string().min(10, "Minimum 10 character required"),
  categoryId: z.string().min(4, "Minimum 4 character required"),
  location: z.string().min(1).optional(),
  photoFile: z
    .any()
    .refine((files: FileList) => validateFileSize(files))
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      `Only ${ACCEPTED_IMAGE_TYPES.map((item) => item.replace("image/", "")).join(", ")} are allowed`,
    ),
});

export type TreportLostItemFormData = z.infer<typeof reportLostItemSchema>;

// =========================
