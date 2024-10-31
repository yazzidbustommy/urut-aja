import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  user,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ModalInputOffer from "./modal/ModalInputOffer";
import { RiBillFill } from "react-icons/ri";
import { axiosInstance } from "../../lib/axsios";
import { context } from "../../context/authContex";
import { useSelector } from "react-redux";

function OfferPage() {
  // const [orders, setOrders] = useState();
  const token = useSelector((state) => state.auth.token);
  const contextValue = context();
  const emailVal = contextValue ? contextValue.emailVal : null;
  const [users, setUsers] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const fetchData = async () => {
    try {
      const fetchOrders = await axiosInstance.get("orders");
      const fetchUsers = await axiosInstance.get(`users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (fetchUsers) {
        const userByEmail = fetchUsers.data.users.filter((item) => {
          return item.email == emailVal;
        });
        setUsers(userByEmail[0]);
        const filtered = fetchOrders.data.filter((item) => {
          return (
            item.district === userByEmail[0].district &&
            item.gender === userByEmail[0].gender
          );
        });
        setFilteredOrders(filtered);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log("ini filter order", filteredOrders);
  });

  return (
    <div className="w-full p-10 h-screen flex flex-wrap justify-center items-center gap-8">
      {filteredOrders &&
        filteredOrders.map((order) => (
          <Card
            key={order.id}
            className=" flex w-[400px] items-center hover:transition hover:duration-900 hover:scale-110 transition duration-1000 rounded-md bg-[#926d57] shadow-xl"
            radius="none"
          >
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <RiBillFill className="text-white w-8 h-8" />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className=" font-semibold leading-none text-neutral-200 font-inter">
                    {order.name.replace(/\b\w/g, (match) =>
                      match.toUpperCase()
                    )}
                  </h4>
                </div>
              </div>

              {/* //===>>>>>> */}

              <ModalInputOffer kirimIdEmploye={users} kirimBid={order.id} />
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400 bg-white">
              <Table hideHeader removeWrapper className="text-neutral-900">
                <TableHeader>
                  <TableColumn></TableColumn>
                  <TableColumn></TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow className="font-prompt text-[#926d57]">
                    <TableCell>Email</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>{order.email}</TableCell>
                  </TableRow>
                  <TableRow className="font-prompt text-[#926d57]">
                    <TableCell>Address</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>
                      {order.address.length > 20
                        ? `${order.address.substring(0, 20)}...`
                        : order.address}
                    </TableCell>
                  </TableRow>
                  <TableRow className="font-prompt text-[#926d57]">
                    <TableCell>Phone Number</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>{order.phoneNumber}</TableCell>
                  </TableRow>
                  <TableRow className="font-prompt text-[#926d57]">
                    <TableCell>Budget Range</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>{order.budget}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
            <CardFooter radius="none" className="h-1 bg-white"></CardFooter>
          </Card>
        ))}

      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}

export default OfferPage;
