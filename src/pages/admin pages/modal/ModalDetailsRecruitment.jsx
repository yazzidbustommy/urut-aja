import React, { useEffect } from "react";
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
import { axiosInstance } from "../../../lib/axsios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ModalDetailsRecruitment = ({ recruitment, trigerADD }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const token = useSelector((state) => state.auth.token);

  const postUsers = async (dataByid) => {
    const data = {
      email: dataByid.email,
      password: "password",
      name: dataByid.name,
      address: dataByid.address,
      district: dataByid.district,
      age: dataByid.age,
      phoneNumber: dataByid.phoneNumber,
      gender: dataByid.gender,
      ktp: dataByid.ktp,
      kk: dataByid.kk,
      role: "employe",
    };

    try {
      const result = await axiosInstance.post(`auth/register`, data);
      Swal.fire({
        title: "Success !",
        text: "Successfully added employe !",
        icon: "success",
      }).then(() => {
        onClose();
      });
      deleteRecruitment(dataByid.id);
    } catch (error) {
      if (error.response.data.message === "Email already exists") {
        Swal.fire({
          title: "Error!",
          text: "Email already exists",
          icon: "error",
        });
        deleteRecruitment(dataByid.id);
      } else {
        console.log(error.response);
        alert("gagal");
      }
      console.log(data);
    }
  };

  const deleteRecruitment = async (id) => {
    try {
      const result = await axiosInstance.delete(`recruitment/${id}`);
      trigerADD();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <>
      <Tooltip content="Details">
        <Button onPress={onOpen} variant="ghost" startContent={<FaEye />}>
          Details
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          <ModalHeader className="flex flex-col items-center gap-1">
            <h1 className="font-inter font-semibold text-main-choc text-2xl text-center pb-3">
              Therapist Details
            </h1>
            <Avatar
              src="https://picsum.photos/seed/view/200/300"
              className="w-32 h-32 text-large border-4 border-main-choc"
            />
          </ModalHeader>
          <ModalBody>
            <Divider className="w-8 mx-auto mb-4 mt-4 h-1 bg-main-choc rounded-full" />

            <Table hideHeader removeWrapper>
              <TableHeader>
                <TableColumn></TableColumn>
                <TableColumn></TableColumn>
                <TableColumn></TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-inter text-main-choc">
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell className="font-inter text-main-choc">:</TableCell>
                  <TableCell className="font-inter text-main-choc">
                    {recruitment.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-inter text-main-choc">
                    <strong>Age</strong>
                  </TableCell>
                  <TableCell className="font-inter text-main-choc">:</TableCell>
                  <TableCell className="font-inter text-main-choc">
                    {recruitment.age}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-inter text-main-choc">
                    <strong>Gender</strong>
                  </TableCell>
                  <TableCell className="font-inter text-main-choc">:</TableCell>
                  <TableCell className="font-inter text-main-choc">
                    {recruitment.gender}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-inter text-main-choc">
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell className="font-inter text-main-choc">:</TableCell>
                  <TableCell className="font-inter text-main-choc">
                    {recruitment.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-inter text-main-choc">
                    <strong>Phone Number</strong>
                  </TableCell>
                  <TableCell className="font-inter text-main-choc">:</TableCell>
                  <TableCell className="font-inter text-main-choc">
                    {recruitment.phoneNumber}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-inter text-main-choc">
                    <strong>Address</strong>
                  </TableCell>
                  <TableCell className="font-inter text-main-choc">:</TableCell>
                  <TableCell className="font-inter text-main-choc">
                    {recruitment.address}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-inter text-main-choc">
                    <strong>District</strong>
                  </TableCell>
                  <TableCell className="font-inter text-main-choc">:</TableCell>
                  <TableCell className="font-inter text-main-choc">
                    {recruitment.district}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Divider className="w-8 mx-auto mb-4 mt-4 h-1 bg-main-choc rounded-full" />
            <h1 className="text-center font-inter font-semibold text-main-choc text-2xl">
              Documents
            </h1>
            <Link href="#" className="font-inter font-semibold text-main-choc">
              No KTP : {recruitment.ktp}
            </Link>
            <Link className="font-inter font-semibold text-main-choc" href="#">
              No KK : {recruitment.kk}
            </Link>
          </ModalBody>
          <ModalFooter className="justify-center">
            <Button
              onClick={() => postUsers(recruitment)}
              className="bg-main-choc text-white font-inter w-32 text-lg "
            >
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDetailsRecruitment;
