import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axsios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const IncomingMassage = () => {
  const email = sessionStorage.getItem("emailEmploye");
  const [dataPayment, setDataPayment] = useState([]);
  const navigate = useNavigate();
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const formattedTime = date.toLocaleString();

  const getBidAccept = async () => {
    try {
      const result = await axiosInstance.get(`transactions`);
      const findData = result.data.filter((find) => find.emailCustomer === email);
      setDataPayment(findData);
    } catch (error) {
      console.log("Failed to fetch data", error);
    }
  };

  const postHistory = async (data, time) => {
    const dataSend = {
      name_Customer: data.nameCustomer,
      PhoneNumber_customer: data.PhoneNumber_customer,
      addressCustomer: data.addressCustomer,
      dealBudget: data.dealBudget,
      districtCustomer: data.districtCustomer,
      emailCustomer: data.emailCustomer,
      emailEmploye: data.emailEmploye,
      time_transaction: time,
      employeInfo: {
        address: data.employeInfo.address,
        age: data.employeInfo.age,
        district: data.employeInfo.district,
        email: data.employeInfo.email,
        gender: data.employeInfo.gender,
        name: data.employeInfo.name,
        phoneNumber: data.employeInfo.phoneNumber,
      },
    };
    try {
      await axiosInstance.post(`history`, dataSend);
      await axiosInstance.delete(`transactions/${data.id}`);
      sessionStorage.removeItem("emailCustomer")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Transaction Succeed",
        showConfirmButton: false,
        timer: 1000,
        color: "#FFFFFF",
        background: "#57663d",
      });
      navigate("/");
    } catch (error) {
      console.log("Failed to post data", error);
    }
  };

  useEffect(() => {
    getBidAccept();
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-main-choc to-main-green">
      {dataPayment.length > 0 ? (
        dataPayment.map((data) => (
          <div
            key={data.id}
            className="flex flex-col justify-center text-center items-center h-screen"
          >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                className="h-20 w-20 mb-10 animate-spin"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#ffffff"
                    stroke-width="1.5"
                  ></circle>{" "}
                  <circle
                    cx="12"
                    cy="12"
                    r="6"
                    stroke="#ffffff"
                    stroke-width="1.5"
                  ></circle>{" "}
                  <circle
                    cx="12"
                    cy="12"
                    r="2"
                    stroke="#ffffff"
                    stroke-width="1.5"
                  ></circle>{" "}
                  <path
                    opacity="0.5"
                    d="M6 12L10 12"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    opacity="0.5"
                    d="M14 12L18 12"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    opacity="0.5"
                    d="M9 17.1963L11 13.7322"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    opacity="0.5"
                    d="M13 10.2681L15 6.80396"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    opacity="0.5"
                    d="M15 17.1963L13 13.7322"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    opacity="0.5"
                    d="M11 10.2681L9 6.80396"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
            <h1 className="text-4xl text-white font-inter font-semibold">
              Please wait for our Massage Therapist to arrive soon.
            </h1>

            <Button
              onClick={() => postHistory(data, formattedTime)}
              className="bg-white flex flex-col text-main-green h-20 mt-10"
            >
              <h1 className="font-prompt font-bold text-lg">ATTENTION:</h1>
              <h2 className="font-prompt font-bold text-md">
                Click Here When The Massage is COMPLETE.
              </h2>
            </Button>
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center text-center items-center h-screen">
          <h1 className="text-9xl">Please proceed with payment</h1>
        </div>
      )}
    </div>
  );
};

export default IncomingMassage;
