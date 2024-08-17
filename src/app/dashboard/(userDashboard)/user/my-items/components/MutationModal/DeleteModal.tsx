"use client";
import { useDeleteReportFoundItemMutation } from "@/redux/apiSlices/reportFoundItemApiSlice";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
function DeleteModal({ foundItemId }: { foundItemId: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [deleteReportFoundItem, result] = useDeleteReportFoundItemMutation();
  const handleDelete = async () => {
    try {
      await deleteReportFoundItem(foundItemId);
      console.log(result);
    } catch (error) {
      toast.error("Failed to delete Item");
      console.log("Result\n", result);
      console.log(error);
    }
    setOpenModal(false);
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} size={"xs"}>
        🗑
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <p className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200">
              {" "}
              ❗{" "}
            </p>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteModal;
