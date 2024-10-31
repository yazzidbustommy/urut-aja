import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import ModalDetailsEmployeTransaction from "./modal/ModalDetailsEmpleyeTransaction";
import { axiosInstance } from "../../lib/axsios";
import { FaMoneyBillTransfer } from "react-icons/fa6";
const email = sessionStorage.getItem("email");

function EmployeTransaction() {
  const [datas, setDatas] = useState([]);

  const getHistory = async () => {
    try {
      const result = await axiosInstance.get("history");

      const filterData = result.data.filter((user) => {
        return user.emailEmploye == email;
      });

      setDatas(filterData);
    } catch (error) {
      console.log("ini eroor", error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);
  useEffect(() => {});

  return (
    <div className="h-screen flex flex-col pt-10 ">
      <div className="flex justify-center">
        <h1 className="font-bold text-4xl text-main-choc">
          Your Transaction History
        </h1>
      </div>

      <div className="flex px-6">
        <div className="h-28 shadow-md flex">
          <div className="bg-main-choc w-28 h-full flex items-center justify-center">
            <FaMoneyBillTransfer size="80" className="text-white" />
          </div>
          <div className="bg-white w-56 flex flex-col justify-center items-center text-main-green-darker font-semibold">
            <p className="text-xl text-main-choc">Total Transaction</p>
            <p className="text-5xl text-main-choc">{datas.length}</p>
          </div>
        </div>
      </div>

      <Table
        isStriped
        className="p-6 w-full max-h-screen overflow-y-auto z-[1]"
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn className="bg-main-choc font-inter text-center text-white">
            TRANSACTION ID
          </TableColumn>
          <TableColumn className="bg-main-choc font-inter text-center text-white">
            CUSTOMER NAME
          </TableColumn>

          <TableColumn className="bg-main-choc font-inter text-center text-white">
            PRICE
          </TableColumn>
          <TableColumn className="bg-main-choc font-inter text-center text-white">
            ACTION
          </TableColumn>
        </TableHeader>
        <TableBody>
          {datas &&
            datas.map((data) => (
              <TableRow key={data.id} className="text-center">
                <TableCell className="text-center font-inter">
                  {data.id}
                </TableCell>
                <TableCell className="text-center font-inter">
                  {data.name_Customer}
                </TableCell>
                <TableCell className="text-center font-inter">
                  {data.dealBudget}
                </TableCell>
                <TableCell className="text-center font-inter">
                  <ModalDetailsEmployeTransaction detailData={data} />
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
}

export default EmployeTransaction;
