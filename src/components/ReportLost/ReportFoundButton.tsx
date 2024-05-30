"use client";
import { Button } from "flowbite-react";

function ReportFoundButton({ foundItemId }: { foundItemId: string }) {
  console.log("foundItemId", foundItemId);
  // Handle Report Found for Lost Item
  const handleReportFound = async () => {
    const res = await fetch(`http://localhost:3001/api/found-items/found-by`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ foundItemId }),
      cache: "no-store",
    });
    const result = await res.json();
    console.log(result);
  };
  return (
    <>
      <Button onClick={handleReportFound}>Report Found</Button>
    </>
  );
}

export default ReportFoundButton;
