import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { FaEye } from "react-icons/fa";

const ModalDetailsEmployeTransaction = ({ detailData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} variant="bordered" startContent={<FaEye />}>
        Details
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent className="max-h-[700px] overflow-y-auto font-inter">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                <h1 className="font-bold text-2xl text-center pb-3 text-main-choc">
                  Transaction Details
                </h1>
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
                      <TableCell className="font-bold font-inter text-main-choc">
                        Transaction ID
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        :
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        {detailData.id}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold font-inter text-main-choc">
                        Transaction Time
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        :
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        {detailData.time_transaction}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Divider className="w-8 mx-auto mb-4 mt-4 h-1 bg-main-choc rounded-full" />
                <h1 className="font-bold text-center font-inter text-main-choc">
                  Customer Information
                </h1>
                <Table hideHeader removeWrapper>
                  <TableHeader>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className=" font-inter font-bold text-main-choc">
                        Name
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        :
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        {detailData.name_Customer}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-inter font-bold text-main-choc">
                        Phone Number
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        :
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        {detailData.PhoneNumber_customer}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-inter font-bold text-main-choc">
                        Address
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        :
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        {detailData.addressCustomer}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-inter font-bold text-main-choc">
                        District
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        :
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        {detailData.districtCustomer}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-inter font-bold text-main-choc">
                        Email
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        :
                      </TableCell>
                      <TableCell className="text-main-choc font-inter">
                        {detailData.emailCustomer}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Divider className="w-8 mx-auto mb-4 mt-4 h-1 bg-main-choc rounded-full" />
                <h1 className="text-center font-bold text-xl text-main-choc font-inter">
                  Deal Budget: Rp. {detailData.dealBudget},-
                </h1>
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button color="danger" variant="light" onPress={onClose}>
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

export default ModalDetailsEmployeTransaction;
