import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Input,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../lib/axsios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ModalInputOffer({ kirimIdEmploye, kirimBid }) {
  const token = useSelector((state) => state.auth.token);
  const [order, setOrder] = useState(null);
  const [dealBudget, setDealBudget] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const getOrder = async () => {
    try {
      const result = await axiosInstance(`orders`);
      const ressDataOrder = result.data.filter((item) => item.id == kirimBid);
      setOrder(ressDataOrder[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmploye = async () => {
    try {
      const result = await axiosInstance.get(`users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postBidAccept = async (employe, order) => {
    const dataBaru = {
      name: order.name,
      address: order.address,
      district: order.district,
      phoneNumber: order.phoneNumber,
      email: order.email,
      budget: order.budget,
      dealBudget: dealBudget,
      employeName: employe.email,
      employeInfo: {
        email: employe.email,
        password: employe.password,
        name: employe.name,
        address: employe.address,
        district: employe.district,
        age: employe.age,
        phoneNumber: employe.phoneNumber,
        gender: employe.gender,
        ktp: employe.ktp,
        kk: employe.kk,
        role: employe.role,
      },
    };

    try {
      const result = await axiosInstance.post("bidPending", dataBaru);
      const saveCustomerEmailOnStorage = sessionStorage.setItem(
        "emailCustomer",
        dataBaru.email
      );
    } catch (error) {
      console.log(error);
    }

    navigate("/employe-waiting-approval-page");
  };

  useEffect(() => {
    getEmploye();
    getOrder();
  }, []);
  useEffect(() => {});
  return (
    <>
      <Button
        variant="solid"
        size="sm"
        onPress={onOpen}
        className="animate-pulse bg-white font-bold text-[#926d57] hover:animate-none hover:bg-neutral-300 hover:bg-[#926d57] hover:text-white hover:border hover:border-2"
      >
        Bid
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        closeButton="white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col bg-[#926d57] text-white font-inter">
                Modal Title
              </ModalHeader>
              <ModalBody className="flex items-center justify-center p-5">
                <Table hideHeader removeWrapper className="text-neutral-900">
                  <TableHeader>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="font-prompt">
                      <TableCell className="font-bold text-[#664f3d]">
                        Email
                      </TableCell>
                      <TableCell className="font-bold text-[#926d57]">
                        :
                      </TableCell>
                      <TableCell className="font-prompt text-[#926d57]">
                        {order.email}
                      </TableCell>
                    </TableRow>
                    <TableRow className="font-prompt text-wrap">
                      <TableCell className="font-bold text-[#664f3d]">
                        Address
                      </TableCell>
                      <TableCell className="font-bold text-[#926d57]">
                        :
                      </TableCell>
                      <TableCell className="font-prompt text-[#926d57]">
                        {order.address.length > 20
                          ? `${order.address.substring(0, 20)}...`
                          : order.address}
                      </TableCell>
                    </TableRow>
                    <TableRow className="font-prompt">
                      <TableCell className="font-bold text-[#664f3d]">
                        Phone Number
                      </TableCell>
                      <TableCell className="font-bold text-[#926d57]">
                        :
                      </TableCell>
                      <TableCell className="font-prompt text-[#926d57]">
                        {order.phoneNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow className="font-prompt">
                      <TableCell className="font-bold text-[#664f3d]">
                        Budget Range
                      </TableCell>
                      <TableCell className="font-bold text-[#926d57]">
                        :
                      </TableCell>
                      <TableCell className="font-prompt text-[#926d57]">
                        {order.budget}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Divider />
                <h1>
                  <strong className="text-[#664f3d]">
                    Do You Want To Bid This Order?
                  </strong>
                </h1>
                <Input
                  value={dealBudget}
                  onChange={(e) => setDealBudget(e.target.value)}
                  label="Input Your Offer Here"
                  variant="underlined"
                  color="primary"
                  size="lg"
                />

                <Button
                  onClick={() => postBidAccept(kirimIdEmploye, order)}
                  onPress={onClose}
                  className="bg-[#926d57] mt-5 text-medium text-white font-inter hover:bg-white hover:border-5 hover:border-[#926d57] hover:text-[#926d57] "
                >
                  Bid
                </Button>
              </ModalBody>
              <ModalFooter className="flex justify-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalInputOffer;
