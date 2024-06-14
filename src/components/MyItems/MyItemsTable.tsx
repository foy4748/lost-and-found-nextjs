"use client";
import { Table } from "flowbite-react";
import { TFoundItemType } from "./MyItemsPage";
import { useGetCategoryQuery } from "@/redux/apiSlices/categoryApiSlice";
import { useEffect, useState } from "react";
import Image from "next/image";

function MyItemsTable({ data }: { data: TFoundItemType[] }) {
  console.log(data);
  const { data: categoires } = useGetCategoryQuery(null);
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Item Name</Table.HeadCell>
          <Table.HeadCell>Location</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Pic</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((d) => {
            return (
              <>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {d.foundItemName}
                  </Table.Cell>
                  <Table.Cell>{d.location || "Unknown"}</Table.Cell>
                  <Table.Cell>{d.description || "Unknown"}</Table.Cell>
                  <Table.Cell>{d.category.name}</Table.Cell>
                  <Table.Cell>
                    {d.photoUrl ? (
                      <img
                        src={d.photoUrl}
                        height={30}
                        width={30}
                        alt={d.foundItemName}
                      />
                    ) : (
                      "❌"
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default MyItemsTable;
