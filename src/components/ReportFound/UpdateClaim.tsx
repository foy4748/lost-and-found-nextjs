"use client";

import { Button, Select, Label, Modal } from "flowbite-react";
import { Key, useState } from "react";
import { STATUS, TStatus, TClaims } from "./Claims";
import { useForm } from "react-hook-form";

export function UpdateClaim({ data }: { data: TClaims }) {
  const [openModal, setOpenModal] = useState(false);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      status: data.status,
    },
  });

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleUpdate = async (d: { status: TStatus }) => {
    console.log(d);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/claims/${data.id}`,
      {
        method: "PUT",
        body: JSON.stringify(d),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const { data: isUpdated } = await res.json();
    console.log(isUpdated);
  };

  return (
    <>
      <Button size={"xs"} onClick={() => setOpenModal(true)}>
        Resolve
      </Button>
      <Modal
        dismissible
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update Claim Status
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="status" value="Select Current Status" />
              </div>
              <Select {...register("status")} name="status">
                {STATUS?.map((s: string, idx: Key) => {
                  return (
                    <option key={idx} value={s}>
                      {s}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="w-full">
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
