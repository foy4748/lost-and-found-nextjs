"use client";

import { revalidatePathFromClient } from "@/actions/revalidatingData";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type TCreateClaimPayload = {
  foundbyId: string;
  distinguishingFeatures: string;
  lostDate: Date;
};

export default function CreateClaim({
  foundById,
  foundItemId,
}: {
  foundById: string;
  foundItemId: string;
}) {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm<TCreateClaimPayload>();

  const handleClaimIssue = async (data: TCreateClaimPayload) => {
    try {
      data.lostDate = new Date(data.lostDate);
      const payload = { ...data, foundById } as TCreateClaimPayload;
      console.log(payload);
      const res = await fetch(`http://localhost:3001/api/claims`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log(result);
      if (result.success) {
        revalidatePathFromClient(`/lost-items/${foundItemId}`);
        setOpenModal(false);
        toast.success("Reported a claim successfully");
      } else {
        toast.error("Already Claimed");
      }
    } catch (error) {}
  };

  return (
    <>
      <Button className="flex-1" onClick={() => setOpenModal(true)}>
        Issue a Claim
      </Button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit(handleClaimIssue)}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Issue a claim
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="distinguishingFeatures"
                    value="Distinguishing Features"
                  />
                </div>
                <Textarea
                  id="distinguishingFeatures"
                  {...register("distinguishingFeatures", {
                    validate: {
                      pattern: (value: string) => !/[!]/.test(value),
                    },
                  })}
                  rows={6}
                  placeholder="For example: There is a crack on the screen of the phone"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lostDate" value="Lost Date" />
                </div>
                <TextInput
                  {...register("lostDate")}
                  id="lostDate"
                  type="date"
                  required
                />
              </div>
              <div className="flex justify-between"></div>
              <div className="w-full">
                <Button type="submit" className="w-full">
                  Claim
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
