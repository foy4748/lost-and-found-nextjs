"use client";

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

export type TCreateClaimPayload = {
  distinguishingFeatures: string;
  lostDate: Date;
};

export default function CreateClaim({ foundItemId }: { foundItemId: string }) {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm<TCreateClaimPayload>();

  const handleClaimIssue = (data: TCreateClaimPayload) => {
    data.lostDate = new Date(data.lostDate);
    console.log(JSON.stringify(data));
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Issue a Claim</Button>
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
