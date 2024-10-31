import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import ModalDetailsRecruitment from "./modal/ModalDetailsRecruitment";
import { axiosInstance } from "../../lib/axsios";
import { FaRegAddressCard } from "react-icons/fa";

const RecruitmentPage = () => {
  const [recruitments, setRecruitments] = useState([]);

  const getRecruitment = async () => {
    try {
      const result = await axiosInstance.get("recruitment");
      setRecruitments(result.data);
    } catch (error) {
      console.log("Error fetching recruitment:", error);
    }
  };
  useEffect(() => {
    getRecruitment();
  }, []);

  return (
    <div>
      <div className="h-screen flex flex-col pt-10 ">
        <div className="flex justify-center">
          <h1 className="font-bold text-4xl text-main-choc">
            Therapist Recruitment
          </h1>
        </div>
        <div className="w-full px-6">
          <div className="flex">
            <div className="h-28 shadow-md flex">
              <div className="bg-main-choc w-28 h-full flex items-center justify-center">
                <FaRegAddressCard size="80" className="text-white" />
              </div>
              <div className="bg-white w-56 flex flex-col justify-center items-center text-main-choc font-semibold">
                <p className="text-xl font-inter text-main-choc">
                  Total Recruitment
                </p>
                <p className="text-5xl font-inter">{recruitments.length}</p>
              </div>
            </div>
          </div>
        </div>
        <Table
          isStriped
          className="p-6 w-full max-h-full overflow-y-auto"
          isHeaderSticky
        >
          <TableHeader>
            <TableColumn className="bg-main-choc text-white text-center font-inter font-normal">
              NAME
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
            {recruitments &&
              recruitments.map((recruitment) => (
                <TableRow key={recruitment.id}>
                  <TableCell className="text-center">
                    {recruitment.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {recruitment.email}
                  </TableCell>
                  <TableCell className="text-center">
                    {recruitment.address}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <ModalDetailsRecruitment
                      recruitment={recruitment}
                      trigerADD={getRecruitment}
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
    </div>
  );
};

export default RecruitmentPage;
