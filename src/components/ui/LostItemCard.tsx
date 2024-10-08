"use client";

import { TLostItem } from "@/app/lost-items/components/LostItemPageView";
import Link from "next/link";
import Image from "next/image";

type TLostItemCardPropType = {
  data: TLostItem;
};

export default function LostItemCard({ data }: TLostItemCardPropType) {
  return (
    <Link href={`/lost-items/${data.id}`}>
      <div className="min-h-[400px] flex flex-col justify-between border-2 h-full p-4">
        <figure className="h-[100px] flex justify-center items-center">
          {data?.photoUrl ? (
            <Image
              className="object-contain"
              src={data?.photoUrl}
              width={100}
              height={100}
              alt={data.foundItemName}
            />
          ) : (
            <div className="flex justify-center items-center h-full min-h-[300px]">
              <p>No Image</p>
            </div>
          )}
        </figure>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.foundItemName}
        </h5>
        <p className="text-ellipsis font-normal text-gray-700 dark:text-gray-400">
          {data.description.substring(0, 100)}
        </p>
        <p>{data.isItemFound ? "🟢 Found" : "🔴 Not found yet"}</p>
      </div>
    </Link>
  );
}
