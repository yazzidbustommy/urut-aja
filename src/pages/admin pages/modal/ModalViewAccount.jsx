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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import React from "react";

const ModalViewAccount = ({ info }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // console.log(info);

  return (
    <>
      <Tooltip content="Details">
        <Button
          data-testid="open-detailAccount-button"
          isIconOnly
          onPress={onOpen}
          variant="light"
          startContent={<FaEye size="15" />}
        ></Button>
      </Tooltip>
      <Modal
        data-testid="add-modal-package"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        className="h-5/6 overflow-y-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                <h1 className="font-bold text-2xl text-center pb-3 font-inter text-main-choc">
                  Massage Therapist Details
                </h1>
                <Avatar
                  src="https://picsum.photos/seed/per/200/300"
                  className="w-32 h-32 mt-4 text-large border-5 border-main-choc"
                />
                <Divider className="mt-8 w-8 h-1.5 rounded-full bg-main-choc" />
              </ModalHeader>
              <ModalBody>
                <Table hideHeader removeWrapper>
                  <TableHeader>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-inter text-main-choc">
                        ID
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        :
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        {info.id}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-inter text-main-choc">
                        Email
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        :
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        {info.email}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-inter text-main-choc">
                        Username
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        :
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        {info.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-inter text-main-choc">
                        Password
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        :
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        {info.password}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-inter text-main-choc">
                        Name
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        :
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        {info.name.replace(/\b\w/g, (match) =>
                          match.toUpperCase()
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-inter text-main-choc">
                        Age
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        :
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        {info.age}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-inter text-main-choc">
                        Gender
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        :
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        {info.gender}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-inter text-main-choc">
                        Address
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        :
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        {info.address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-inter text-main-choc">
                        District
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        :
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        {info.district}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-inter text-main-choc">
                        Phone Number
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        :
                      </TableCell>
                      <TableCell className="font-inter text-main-choc">
                        {info.phoneNumber}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Divider className="h-1 bg-main-choc rounded-full" />
                <h1 className="text-center font-inter font-bold text-main-choc text-2xl ">
                  Documents
                </h1>
                <Link href="#">
                  <Button
                    isDisabled
                    className="bg-main-choc text-white font-inter font-bold"
                  >
                    Show KTP
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    isDisabled
                    className="bg-main-choc text-white font-inter font-bold"
                  >
                    Show KK
                  </Button>
                </Link>
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button
                  color="danger"
                  onPress={onClose}
                  className="bg-main-choc text-white font-inter font-bold "
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalViewAccount;
