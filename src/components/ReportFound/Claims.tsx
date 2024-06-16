"use client";

import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import moment from "moment";
import { UpdateClaim } from "./UpdateClaim";

export const STATUS = ["PENDING", "APPROVED", "REJECTED"] as const;
export type TStatus = (typeof STATUS)[number];
export type TClaims = {
  id: string;
  userId: string;
  foundById: string;
  foundBy: {
    id: string;
    userId: string;
    foundItemId: string;
    foundItem: {
      id: string;
      userId: string;
      categoryId: string;
      foundItemName: string;
      description: string;
      location: string;
      isItemFound: boolean;
      photoUrl: string;
      createdAt: string;
      updatedAt: string;
      claimsId?: string | null;
    };
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };

  status: TStatus;
  distinguishingFeatures: string;
  lostDate: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

function Claims({ foundById }: { foundById: string }) {
  const [claims, setClaims] = useState<TClaims[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/claims/${foundById}`,
        {
          credentials: "include",
        }
      );
      const { data } = await res.json();
      console.log("Claims data", data);
      setClaims(data);
    })();
  }, [foundById]);

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Found By</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Described Features</Table.HeadCell>
            <Table.HeadCell>Lost Date</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit Status</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {claims?.map((d) => {
              return (
                <Table.Row
                  key={d.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {d.user.name}
                  </Table.Cell>
                  <Table.Cell>{d.user.email}</Table.Cell>
                  <Table.Cell>{d.status}</Table.Cell>
                  <Table.Cell>{d.distinguishingFeatures}</Table.Cell>
                  <Table.Cell>
                    {moment(d.lostDate).format("MMM d, YYYY")}
                  </Table.Cell>
                  <Table.Cell>
                    <UpdateClaim data={d} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default Claims;
