import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FaMapMarkerAlt, FaRegMap } from "react-icons/fa";
import { axiosInstance } from "../../lib/axsios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdRefresh } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

function BiddingFeedback() {
  const sesion = sessionStorage.getItem("emailEmploye");
  const district = sessionStorage.getItem("district");
  const [dataEmploye, setDataEmploye] = useState([]);
  const navigate = useNavigate();
  const takeEmailCustomer = sessionStorage.getItem("emailEmploye");

  const fetchData = async () => {
    try {
      const fetchPending = await axiosInstance.get("bidPending");
      if (fetchPending) {
        const filtered = fetchPending.data.filter((item) => {
          return item.email == sesion;
        });
        console.log(filtered);
        setDataEmploye(filtered);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBack = async () => {
    const resultOrder = await axiosInstance.get("orders");
    const filteredOrder = resultOrder.data.filter((customer) => {
      return customer.email === takeEmailCustomer;
    });
    const deleteBidPending = await axiosInstance.delete(
      `orders/${filteredOrder[0].id}`
    );

    sessionStorage.removeItem("emailCustomer");
    console.log(filteredOrder);
    console.log(resultOrder);
    navigate("/");
  };

  const postBidAccept = async (data, email) => {
    const dataBid = {
      nameCustomer: data.name,
      addressCustomer: data.address,
      districtCustomer: data.district,
      emailCustomer: data.email,
      PhoneNumber_customer: data.phoneNumber,
      dealBudget: data.dealBudget,
      emailEmploye: data.employeInfo.email,
      employeInfo: {
        name: data.employeInfo.name,
        address: data.employeInfo.address,
        district: data.employeInfo.district,
        email: data.employeInfo.email,
        phoneNumber: data.employeInfo.phoneNumber,
        age: data.employeInfo.age,
        gender: data.employeInfo.gender,
      },
    };

    try {
      const result = await axiosInstance.post("bidAccept", dataBid);
      const deletBidPending = await axiosInstance.delete(
        `bidPending/${data.id}`
      );
      const ordersResponse = await axiosInstance.get("orders");
      const orders = ordersResponse.data;

      const orderToDelete = orders.find((order) => order.email === email);
      if (orderToDelete) {
        await axiosInstance.delete(`orders/${orderToDelete.id}`);
      }
      navigate(`/BiddingPayment`);
    } catch (error) {
      console.error("Error during transaction or order deletion:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-h-screen bg-gradient-to-br from-main-choc to-main-green flex flex-col justify-center items-center">
      <h1 className="font-inter mt-5 font-semibold text-[1.5rem] text-white">
        Bidding Page
      </h1>
      <h1 className="font-inter font-semiBold text-[2rem] text-white mt-2">
        Choose Massage Theraphist You Prefer :
      </h1>
      <Divider className="w-16 h-2 rounded-full bg-white mt-4" />
      <Button
        onClick={() => fetchData()}
        className="flex justify-center items-center w-32 h-32 rounded-xl bg-white mt-20 transition duration-1000 hover:scale-110 hover:duration-900 hover:transition hover:animate-pulse"
      >
        <MdRefresh className="text-main-green w-20 h-20 " />
        <h1 className=" font-inter font-semibold text-lg text-main-green">
          Refresh
        </h1>
      </Button>
      <Button
        onClick={() => getBack()}
        className="absolute left-2 top-2 flex justify-center items-center w-20 h-20 rounded-xl bg-white transition duration-1000 hover:scale-110 hover:duration-900 hover:transition hover:animate-pulse"
      >
        <IoMdArrowRoundBack className="text-main-green w-20 h-20 " />
      </Button>
      <div className="w-full h-[100vh] flex flex-wrap justify-center gap-8 mt-48">
        {dataEmploye?.length > 0 ? (
          dataEmploye.map((employe, index) => (
            <Card
              key={employe.id}
              className=" flex w-[400px] max-h-[350px] items-center transition duration-1000 hover:scale-110 hover:duration-900 hover:transition overflow-visible"
            >
              <Avatar
                className="w-40 h-40 border-solid border-8 border-white -top-32 absolute z-1000"
                src="https://picsum.photos/seed/picsum/200/300"
              />

              <CardHeader className="h-10 justify-between z-0"></CardHeader>
              <Divider className="border-solid border-3 border-main-green" />
              <CardBody className="px-3 pt-4 text-small text-default-400">
                <Table hideHeader removeWrapper className="text-neutral-900">
                  <TableHeader>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        Name
                      </TableCell>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        :
                      </TableCell>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        {employe.employeInfo.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        Address
                      </TableCell>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        :
                      </TableCell>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        {employe.employeInfo.address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        Phone Number
                      </TableCell>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        :
                      </TableCell>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        {employe.employeInfo.phoneNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow className="font-prompt">
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        Budget Range
                      </TableCell>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        :
                      </TableCell>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        {employe.dealBudget}
                      </TableCell>
                    </TableRow>
                    <TableRow className="font-prompt">
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        Age
                      </TableCell>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        :
                      </TableCell>
                      <TableCell className="font-prompt font-bold text-main-green text-lg">
                        {employe.employeInfo.age}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
              <CardFooter className="flex justify-center gap-3 h-20">
                <Button
                  className="w-64 bg-[#926d57] animate-pulse text-white font-prompt text-lg hover:border-3 hover:border-[#926d57] hover:bg-white hover:text-[#926d57] hover:animate-none"
                  onClick={() => postBidAccept(employe, employe.email)}
                >
                  {" "}
                  Choose{" "}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
              transform="rotate(0)"
              className="animate-bounce"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#6c4b4b"
                stroke-width="0.4800000000000001"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="#ffffff"
                  stroke-width="1.9440000000000002"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <strong className="font-inter text-white text-[2rem]">
              Searching for Massage Theraphist...
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default BiddingFeedback;
