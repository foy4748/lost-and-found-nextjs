"use client";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function PaginationButton({
  page,
  isActive,
}: {
  page: `${number}` | number;
  isActive?: boolean;
}) {
  const router = useRouter();
  const handlePagination = (page: `${number}` | number) => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    url.searchParams.set("page", String(page));
    router.push(url.toString());
  };
  return (
    <>
      <Button
        onClick={() => handlePagination(page)}
        size={"sm"}
        color={isActive ? "dark" : "light"}
      >
        {page}
      </Button>
    </>
  );
}

// itm == Number(params?.page ?? 1)
export default PaginationButton;
