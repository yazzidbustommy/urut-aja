import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { axiosInstance } from "../../../lib/axsios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ModalDeleteAccount = ({ info, trigerDelete }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const token = useSelector((state) => state.auth.token);

  const handleDelete = async (id) => {
    try {
      const result = await axiosInstance.delete(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "ACCEPTED",
        text: "User has been deleted",
        icon: "success",
      });
      trigerDelete();
    } catch (error) {
      alert("error");
    }
  };

  return (
    <>
      <Tooltip content="Delete">
        <Button
          isIconOnly
          variant="light"
          color="danger"
          onPress={onOpen}
          startContent={<FaTrash />}
        ></Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex items-center justify-center p-8">
                <p className="font-inter font-bold text-main-choc">
                  Are you sure that you want delete this account?
                </p>
                <Divider className="h-1 w-8 bg-main-choc mx-auto rounded-full" />
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  color="danger"
                  onPress={onClose}
                  onClick={() => {
                    handleDelete(info);
                  }}
                  className="font-inter font-bold text-white"
                >
                  Yes
                </Button>
                <Button
                  color="primary"
                  variant="light"
                  className="bg-main-choc text-white font-inter font-bold"
                  onPress={onClose}
                >
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalDeleteAccount;
