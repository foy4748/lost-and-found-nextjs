"use client";
import { Table } from "flowbite-react";
import { TFoundItemType } from "./MyItemsPage";
import { useEffect, useState } from "react";
import Image from "next/image";
import CreateClaim from "../ReportLost/CreateClaim";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useCategory from "@/hooks/useCategory";
import DeleteModal from "./MutationModal/DeleteModal";
import UpdateModal from "./MutationModal/UpdateModal";

function MyItemsTable({ data }: { data: TFoundItemType[] }) {
  const searchParams = useSearchParams();
  const { mappedCategories } = useCategory();
  const isFound = Number(searchParams.get("isItemFound"));
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Item Name</Table.HeadCell>
          <Table.HeadCell>Pic</Table.HeadCell>
          <Table.HeadCell>Location</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Update</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          {isFound ? (
            <>
              <Table.HeadCell>Found By</Table.HeadCell>
              <Table.HeadCell>Founder Email</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Issue Claim</span>
              </Table.HeadCell>
            </>
          ) : (
            <></>
          )}
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.map((d) => {
            return (
              <Table.Row
                key={d.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {d.foundItemName}
                </Table.Cell>
                <Table.Cell>
                  {d.photoUrl ? (
                    <Image
                      src={d.photoUrl}
                      height={35}
                      width={35}
                      alt={d.foundItemName}
                      className="object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </Table.Cell>
                <Table.Cell>{d.location || "Unknown"}</Table.Cell>
                <Table.Cell>{d.description || "Unknown"}</Table.Cell>
                <Table.Cell>{mappedCategories[d.categoryId]}</Table.Cell>
                <Table.Cell>
                  <UpdateModal payload={d} />
                </Table.Cell>
                <Table.Cell>
                  <DeleteModal foundItemId={d.id} />
                </Table.Cell>
                {d.isItemFound && (
                  <>
                    <Table.Cell>{d.FoundBy.user.name}</Table.Cell>
                    <Table.Cell>{d.FoundBy.user.email}</Table.Cell>

                    <Table.Cell>
                      <Link href={`/dashboard/user/claims/${d.FoundBy.id}`}>
                        Claims
                      </Link>
                    </Table.Cell>
                  </>
                )}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default MyItemsTable;
