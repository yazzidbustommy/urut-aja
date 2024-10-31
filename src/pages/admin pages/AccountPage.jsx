import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import ModalViewAccount from "./modal/ModalViewAccount";
import ModalEditAccount from "./modal/ModalEditAccount";
import ModalDeleteAccount from "./modal/ModalDeleteAccount";
import ModalAddAccount from "./modal/ModalAddAccount";
import { axiosInstance } from "../../lib/axsios";
import { useSelector } from "react-redux";
import { IoMdPeople } from "react-icons/io";

const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const getUser = async () => {
    try {
      const result = await axiosInstance.get("users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(
        result.data.users.filter((item) => {
          return item.role !== "admin";
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center pt-10">
        <h1 className="font-bold text-4xl text-main-choc">
          Therapist Account List
        </h1>
      </div>
      <div className="w-full grid grid-cols-2 px-6">
        <div className="flex">
          <div className="h-28 shadow-md flex">
            <div className="bg-main-choc w-28 h-full flex items-center justify-center">
              <IoMdPeople size="70" className="text-white" />
            </div>
            <div className="bg-white w-56 flex flex-col justify-center items-center text-main-choc font-semibold">
              <p className="text-xl font-inter">Total Employe</p>
              <p className="text-5xl font-inter">{accounts.length}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-end">
          <ModalAddAccount trigerAccount={getUser} />
        </div>
      </div>
      <Table
        isStriped
        className="p-6 w-full h-[700px] overflow-y-auto z-[1]"
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn className="bg-main-choc text-white text-center font-inter font-normal">
            USERNAME
          </TableColumn>
          <TableColumn className="bg-main-choc text-white text-center font-inter font-normal">
            EMAIL
          </TableColumn>
          <TableColumn className="bg-main-choc text-white text-center font-inter font-normal">
            ADDRESS
          </TableColumn>
          <TableColumn className="bg-main-choc text-white text-center font-inter font-normal">
            ACTION
          </TableColumn>
        </TableHeader>
        <TableBody>
          {accounts &&
            accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="text-center">{account.name}</TableCell>
                <TableCell className="text-center">{account.email}</TableCell>
                <TableCell className="text-center">{account.address}</TableCell>
                <TableCell className="flex gap-1 justify-center">
                  <ModalViewAccount info={account} trigerDelete={getUser} />
                  <ModalEditAccount info={account} trigerDelete={getUser} />
                  <ModalDeleteAccount
                    info={account.id}
                    trigerDelete={getUser}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 z-[0]"
      >
        <path
          fill="#9ca3af"
          fill-opacity="0.1"
          d="M0,256L60,234.7C120,213,240,171,360,154.7C480,139,600,149,720,128C840,107,960,53,1080,48C1200,43,1320,85,1380,106.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default AccountPage;
