import {
  Avatar,
  button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { a } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../lib/axsios";
import { useSelector } from "react-redux";
import { FaRegAddressCard } from "react-icons/fa";

const AvailabilityPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const email = sessionStorage.getItem("email");
  const [FilteredOrders, setFilteredOrders] = useState(0);
  const [user, setUser] = useState([]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const fetchData = async () => {
    try {
      const fetchOrders = await axiosInstance.get("orders");
      const fetchUsers = await axiosInstance.get(`users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filtered = fetchUsers.data.users.filter((item) => {
        return item.email == email;
      });

      const filterOrder = fetchOrders.data.filter((item) => {
        return item.district == filtered[0].district;
      });
      setUser(filtered);

      setFilteredOrders(filterOrder.length);
    } catch (error) {
      console.log(error);
    }
  };

  if (isChecked == true) {
    fetchData();
  }
  // const available = () => {
  //   if (isChecked) {

  //   } else {
  //     // alert("merah");
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   available();
  // }, [isChecked]);

  // useEffect(() => {
  //   console.log("Updated orders:", FilteredOrders);
  // }, [FilteredOrders]);

  return (
    <div className="flex justify-center pl-64 pb-16 w-full h-screen items-center bg-gray-200 gap-10">
      {isChecked ? (
        <Link
          to="employe-offer-page"
          className="flex justify-center w-96 top-0 right-0 p-10 absolute"
        >
          <div
            id="toast-notification"
            className="group mt-5 w-full max-w-xs p-4 bg-[#926d57] rounded-lg shadow hover:bg-[#57663d] animate-pulse hover:animate-none relative"
            role="alert"
          >
            <div>
              <div className="flex items-center mb-3">
                <span className="mb-1 text-sm font-prompt text-white group-hover:text-white">
                  New notification
                </span>
                <button
                  type="button"
                  className="ms-auto -mx-1.5 -my-1.5 justify-center items-center flex-shrink-0 inline-flex h-8 w-8"
                  data-dismiss-target="#toast-notification"
                  aria-label="Close"
                >
                  <IoMdCloseCircle className="w-10 h-10 group-hover:text-white group-hover:hover:text-neutral-300" />
                </button>
              </div>
              <div className="flex items-center">
                <div className="ms-3 text-sm font-normal">
                  <div className="text-lg font-prompt text-white group-hover:text-yellow-400">
                    Order Incoming...
                  </div>
                  <div className="bg-white font-prompt w-[40px] h-[40px] rounded flex justify-center items-center text-[#926d57] group-hover:text-main-green absolute top-2 right-2">
                    <h4>{FilteredOrders}</h4>
                  </div>
                  <span className="text-xs font-prompt text-white">
                    a few seconds ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <></>
      )}

      <Card
        className={` z-[1] w-[50%] h-[60%] overflow-visible flex items-center mr-24  ${
          isChecked ? "bg-main-green" : "bg-[#926d57]"
        } border-none hover:transition hover:duration-900 hover:scale-110  `}
      >
        <CardHeader
          className={`flex h-52 transition duration-1000 ${
            isChecked ? "bg-main-green" : "bg-[#926d57]"
          } z-0`}
        >
          <Divider className="bg-white h-1.5 rounded-full w-10 mt-36 mx-auto z-1000 text-white" />
        </CardHeader>

        <Avatar
          className={`w-64 h-64 border-solid border-8 border-white ${
            isChecked ? "animate-bounce" : "animate-none"
          } -top-32 absolute z-auto`}
          src="https://picsum.photos/seed/picsum/1000/1000"
        />

        {user &&
          user.map((data) => (
            <CardBody
              key={data.id}
              className={`flex items-center h-44 w-full transition duration-1000 ${
                isChecked ? "bg-main-green" : "bg-[#926d57]"
              }`}
            >
              <h1 className="text-white font-prompt font-bold text-2xl">
                Hi' {data.name} {":)"}
              </h1>
            </CardBody>
          ))}
        <Divider />
        <CardFooter className="bg-white border-none h-60 flex justify-center">
          <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <span
              className={`label flex items-center text-xl font-inter forn-bold  transition duration-1000  ${
                isChecked ? "text-main-green" : "text-[#926d57]"
              }`}
            >
              Not Available
            </span>
            <span
              className={`slider mx-4 flex h-20 w-[172px] items-center rounded-full p-1 duration-200 border-5 border-[#926d57]  transition duration-1000  ${
                isChecked
                  ? "bg-white  border-main-green"
                  : "bg-white border-[#926d57] "
              }`}
            >
              <span
                className={`dot h-16 w-16 rounded-full transition duration-1000 ${
                  isChecked ? "bg-main-green animate-pulse" : "bg-[#926d57]"
                } duration-200 ${
                  isChecked ? "translate-x-[90px] bg-[#926d57]" : ""
                }`}
              ></span>
            </span>
            <span
              className={`label flex items-center text-xl font-inter forn-bold transition duration-1000 ${
                isChecked ? "text-main-green" : "text-[#926d57]"
              }`}
            >
              Available
            </span>
          </label>
        </CardFooter>
      </Card>
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

export default AvailabilityPage;
