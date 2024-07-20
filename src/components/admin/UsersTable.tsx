"use client";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "@/redux/apiSlices/authApiSlice";

import { Table } from "flowbite-react";
import { TUser } from "../profile/Profile";
import moment from "moment";
import LoadingToast from "../ui/LoadingToast";
import toast from "react-hot-toast";

function UsersTable() {
  const { data: users } = useAllUsersQuery(null);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const usersData: TUser[] = users?.data;
  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Joined Since</Table.HeadCell>
            <Table.HeadCell>Last Update</Table.HeadCell>
            <Table.HeadCell>Active</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {usersData &&
              usersData?.length &&
              usersData.map((d) => (
                <Table.Row
                  key={d?.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {d?.name}{" "}
                    {d?.isAdmin ? (
                      <span className="text-cyan-500">(Admin)</span>
                    ) : (
                      ""
                    )}
                  </Table.Cell>
                  <Table.Cell>{d?.email}</Table.Cell>
                  <Table.Cell>{moment(d?.createdAt).fromNow()}</Table.Cell>
                  <Table.Cell>{moment(d?.updatedAt).fromNow()}</Table.Cell>
                  <Table.Cell
                    className="cursor-pointer"
                    onClick={() => {
                      if (!d?.isAdmin)
                        deleteUser({ isDeleted: !d?.isDeleted, userId: d?.id });
                      else {
                        toast.error("You can't delete an admin that easy");
                        return;
                      }
                      if (d.isDeleted) toast(`Activating user ${d?.name}`);
                      else toast(`Deactivating user ${d?.name}`);
                    }}
                  >
                    {d?.isDeleted ? <>🔴</> : <>🟢</>}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        <LoadingToast isLoading={isLoading} />
      </div>
    </>
  );
}

export default UsersTable;
