"use client";
import { revalidateTagFromClient } from "@/actions/revalidatingData";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
//import { revalidateTag } from "next/cache";

function ReportFoundButton({ foundItemId }: { foundItemId: string }) {
  console.log("foundItemId", foundItemId);
  // Handle Report Found for Lost Item
  const handleReportFound = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/found-items/found-by`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "POST",
          body: JSON.stringify({ foundItemId }),
          cache: "no-store",
        }
      );

      // Revalidating Tags
      revalidateTagFromClient("Items");
      revalidateTagFromClient("isFound");
      revalidateTagFromClient(foundItemId);

      const result = await res.json();
      console.log(result);
    } catch (error) {
      toast.error("Failed to report found");
    }
  };
  return (
    <>
      <Button className="flex-1" onClick={handleReportFound}>
        Report Found
      </Button>
    </>
  );
}

export default ReportFoundButton;
