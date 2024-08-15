"use client";

import { Card } from "flowbite-react";
import { TLostItem } from "./LostItemPageView";
import Link from "next/link";

type TLostItemCardPropType = {
  data: TLostItem;
};

export default function LostItemCard({ data }: TLostItemCardPropType) {
  return (
    <Link href={`/lost-items/${data.id}`}>
      <Card className="w-full h-full place-items-center">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.foundItemName}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {data.description}
        </p>
        <p>{data.isItemFound ? "🟢 Found" : "🔴 Not found yet"}</p>
      </Card>
    </Link>
  );
}
