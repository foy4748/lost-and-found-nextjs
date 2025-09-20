"use client";

import { TLostItem } from "@/app/lost-items/components/LostItemPageView";
import Link from "next/link";
import Image from "next/image";
import useCategory from "@/hooks/useCategory";
import { Button } from "flowbite-react";
import moment from "moment";

type TLostItemCardPropType = {
  data: TLostItem;
};

// Util function from DeepSeek
function customFromNow(date: string) {
  const now = moment();
  const targetDate = moment(date);
  const diffInDays = now.diff(targetDate, "days");
  const diffInHours = now.diff(targetDate, "hours");
  const diffInMinutes = now.diff(targetDate, "minutes");
  const diffInSeconds = now.diff(targetDate, "seconds");

  // If the difference is more than 1 day (>= 2 days), show in days
  if (diffInDays >= 2) {
    return `${diffInDays} days ago`;
  }
  // If the difference is exactly 1 day, show "1 day ago"
  else if (diffInDays === 1) {
    return "1 day ago";
  }
  // If the difference is less than 1 day but more than 1 hour, show in hours
  else if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }
  // If the difference is less than 1 hour but more than 1 minute, show in minutes
  else if (diffInMinutes >= 1) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }
  // For differences less than a minute, show in seconds
  else {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
  }
}

export default function LostItemCard({ data }: TLostItemCardPropType) {
  const { mappedCategories } = useCategory();
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
        <div>
          <Button size="xs" pill>
            {mappedCategories[data.categoryId]}
          </Button>
        </div>
        <p className="text-ellipsis font-normal text-gray-700 dark:text-gray-400">
          {data.description.substring(0, 100)}
        </p>
        <p title={moment(data.createdAt).toLocaleString()}>
          Posted at: {customFromNow(data.createdAt)}
        </p>
        <p>{data.isItemFound ? "🟢 Found" : "🔴 Not found yet"}</p>
      </div>
    </Link>
  );
}
