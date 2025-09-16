"use client";

import { Table } from "flowbite-react";
import moment from "moment";
import { TClaims } from "@/app/dashboard/(userDashboard)/user/claims/[foundById]/components/Claims";
import useCategory from "@/hooks/useCategory";
import Image from "next/image";
import { useGetClaimsByUserQuery } from "@/redux/apiSlices/claimApiSlice";
import TableSkeleton from "@/components/customUI/GridSystem/TableLoading";

function MyItemClaims() {
  //const [claims, setClaims] = useState<TClaims[]>([]);
  const { mappedCategories } = useCategory();
  const { data, isLoading, isFetching } = useGetClaimsByUserQuery(null);

  if (isLoading || isFetching) return <TableSkeleton />;

  return (
    <>
      <div className="overflow-x-auto">
        <h1 className="form-title">My Claims</h1>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Found By</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Item Name</Table.HeadCell>
            <Table.HeadCell>Item Category</Table.HeadCell>
            <Table.HeadCell>Img</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Described Features</Table.HeadCell>
            <Table.HeadCell>Lost Date</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit Status</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.data &&
              data?.data?.map((d: TClaims) => {
                return (
                  <Table.Row
                    key={d?.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {d?.foundBy?.user?.name}
                    </Table.Cell>
                    <Table.Cell>{d?.foundBy?.user?.email}</Table.Cell>
                    <Table.Cell>
                      {d?.foundBy?.foundItem?.foundItemName}
                    </Table.Cell>
                    <Table.Cell>
                      {mappedCategories[d?.foundBy?.foundItem?.categoryId]}
                    </Table.Cell>
                    <Table.Cell>
                      {d?.foundBy?.foundItem?.photoUrl ? (
                        <Image
                          src={d?.foundBy?.foundItem?.photoUrl}
                          alt={d?.foundBy?.foundItem?.foundItemName}
                          width={35}
                          height={35}
                        />
                      ) : (
                        "No Image"
                      )}
                    </Table.Cell>
                    <Table.Cell>{d.status}</Table.Cell>
                    <Table.Cell>{d.distinguishingFeatures}</Table.Cell>
                    <Table.Cell>
                      {moment(d.lostDate).format("MMM d, YYYY")}
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default MyItemClaims;
