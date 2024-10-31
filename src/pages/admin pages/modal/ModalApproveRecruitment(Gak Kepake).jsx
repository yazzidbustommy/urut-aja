import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Divider,
  Link,
} from "@nextui-org/react";

const ModalApproveRecruitment = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button color="success" onPress={onOpen}>
        Approve
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                <h1 className="font-bold text-2xl text-center pb-3">
                  Add New Massage Therapist
                </h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="username"
                  variant="bordered"
                  size="sm"
                />
                <Input
                  type="password"
                  label="Password"
                  variant="bordered"
                  size="sm"
                />
                <Divider />
                <h1 className="text-center font-bold text-2xl">Documents</h1>
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button color="success" className="text-md" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalApproveRecruitment;
