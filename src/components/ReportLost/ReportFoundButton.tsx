"use client";
import { revalidatePathFromClient } from "@/actions/revalidatingData";
import { Button } from "flowbite-react";

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
      const result = await res.json();
      revalidatePathFromClient(`/lost-items/${foundItemId}`);
      console.log(result);
    } catch (error) {}
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
