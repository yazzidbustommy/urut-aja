import {
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
import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axsios";
import { Link, useNavigate } from "react-router-dom";

const FinishPayment = () => {
  const navigate = useNavigate();
  const [dataPayment, setDataPayment] = useState([]);
  const email = sessionStorage.getItem("email");

  const getTransaction = async () => {
    try {
      const result = await axiosInstance.get(`transactions`);
      const findData = result.data.filter((find) => {
        return find.emailEmploye === email;
      });

      setDataPayment(findData);
      return findData;
    } catch (error) {
      console.log("gagal get", error);
    }
  };

  const handleClick = async () => {
    const transactionData = await getTransaction();
    if (transactionData.length === 0) {
      navigate("/employe-dashboard");
    } else {
      console.log("Data ditemukan");
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-white ">
      <svg
        viewBox="0 0 32 32"
        enable-background="new 0 0 32 32"
        version="1.1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="#000000"
        className="w-[10rem] h-[10rem] mt-2"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="Layer_2"></g> <g id="Layer_3"></g> <g id="Layer_4"></g>{" "}
          <g id="Layer_5"></g> <g id="Layer_6"></g> <g id="Layer_7"></g>{" "}
          <g id="Layer_8"></g> <g id="Layer_9"></g> <g id="Layer_10"></g>{" "}
          <g id="Layer_11"></g> <g id="Layer_12"></g> <g id="Layer_13"></g>{" "}
          <g id="Layer_14"></g> <g id="Layer_15"></g> <g id="Layer_16"></g>{" "}
          <g id="Layer_17"></g> <g id="Layer_18"></g>{" "}
          <g id="Layer_19">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <polygon
                  fill="#a3722e"
                  points="10.11,26.7284 10,26.787 10,26.6918 "
                ></polygon>{" "}
              </g>{" "}
              <path
                d="M30.45,9.0999c-0.34-0.1245-0.75-0.1026-1.05,0.066L22,13.2323l-0.11,0.0586l-11.44-4.191 c-0.14-0.0513-0.3-0.0806-0.45-0.0806H9.99c-0.05,0-0.09,0-0.13,0.0073C9.81,9.034,9.77,9.034,9.73,9.0486 C9.68,9.056,9.64,9.0706,9.59,9.0852c-0.04,0.0147-0.07,0.0293-0.11,0.044H9.47C9.44,9.1439,9.42,9.1512,9.4,9.1659l-8,4.3961 C1.15,13.7012,1,13.921,1,14.1482v16.1192c0,0.2784,0.21,0.5348,0.55,0.6521C1.69,30.978,1.85,31,2,31 c0.21,0,0.42-0.0513,0.6-0.1465L10,26.787v-0.0953l0.11,0.0366l11.44,4.191C21.69,30.978,21.85,31,22,31 c0.09,0,0.18-0.0073,0.27-0.0293c0.02,0,0.03-0.0073,0.04-0.0073c0.07-0.0147,0.14-0.0367,0.2-0.066 c0.01,0,0.01-0.0073,0.02-0.0073c0.03-0.0147,0.05-0.022,0.0699-0.0366l8-4.3961c0.25-0.1392,0.4-0.359,0.4-0.5861V9.752 C31,9.4736,30.79,9.2171,30.45,9.0999z"
                fill="#926d57"
              ></path>{" "}
              <path
                d="M22,13.3349V31c-0.15,0-0.31-0.0293-0.45-0.0806l-11.44-4.191L10,26.6918V9.0193 c0.15,0,0.31,0.0293,0.45,0.0806l11.44,4.191L22,13.3349z"
                fill="#ffead6"
              ></path>{" "}
            </g>{" "}
            <path
              d="M22,1c-3.86,0-7,3.09-7,6.89c0,3.58,5.66,9.2,6.3,9.83C21.5,17.91,21.75,18,22,18s0.5-0.09,0.7-0.28 c0.64-0.63,6.3-6.25,6.3-9.83C29,4.09,25.86,1,22,1z"
              fill="#d99e6d"
            ></path>{" "}
            <path
              d="M24,7.89c0,1.11-0.9,2-2,2s-2-0.89-2-2c0-1.1,0.9-2,2-2S24,6.79,24,7.89z"
              fill="#ffead6"
            ></path>{" "}
          </g>{" "}
          <g id="Maps_11_"></g> <g id="Maps_10_"></g> <g id="Maps_9_"></g>{" "}
          <g id="Maps_8_"></g> <g id="Maps_7_"></g> <g id="Maps_6_"></g>{" "}
          <g id="Maps_5_"></g> <g id="Maps_4_"></g> <g id="Maps_3_"></g>{" "}
          <g id="Maps_2_"></g> <g id="Maps_1_"></g> <g id="Maps"></g>{" "}
        </g>
      </svg>
      <h1 className="text-5xl font-inter font-semibold text-main-choc mt-2">
        Please Go To The Customer's Location Immediately
      </h1>

      <div className="w-10 h-10 z-[1]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
          display="block"
          className="h-[30rem] w-[30rem] border-2 border-main-choc absolute bottom-5 right-5 "
          disabled
        />
      </div>
      {dataPayment &&
        dataPayment.map((data) => (
          <Card className="max-w-[800px] w-[500px] h-[500px]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <h1 className="text-md text-main-choc font-inter">
                  Customer Name: <strong></strong>
                </h1>
                <p className="text-sm font-inter text-neutral-400">
                  <strong className="">Transactions Code :</strong>{" "}
                  dfsa321dsaf3er53dsg43
                </p>
              </div>
            </CardHeader>
            <Divider className="h-1.5 " />
            <CardBody>
              <Table hideHeader removeWrapper className="text-neutral-900">
                <TableHeader>
                  <TableColumn></TableColumn>
                  <TableColumn></TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow className="font-prompt">
                    <TableCell className="font-inter">Email</TableCell>
                    <TableCell className="font-inter">:</TableCell>
                    <TableCell className="font-inter">
                      {data.nameCustomer}
                    </TableCell>
                  </TableRow>
                  <TableRow className="font-prompt text-wrap">
                    <TableCell className="font-inter">Address</TableCell>
                    <TableCell className="font-inter">:</TableCell>
                    <TableCell className="font-inter">
                      {data.addressCustomer}
                    </TableCell>
                  </TableRow>
                  <TableRow className="font-prompt">
                    <TableCell className="font-inter">Phone Number</TableCell>
                    <TableCell className="font-inter">:</TableCell>
                    <TableCell className="font-inter">
                      {data.PhoneNumber_customer}
                    </TableCell>
                  </TableRow>
                  <TableRow className="font-prompt">
                    <TableCell className="font-inter">Deal Price</TableCell>
                    <TableCell className="font-inter">:</TableCell>
                    <TableCell className="font-inter">
                      {data.dealBudget}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="h-32"></div>
              <h1 className="font-inter text-red-600">
                You can go back after customer click done service button
              </h1>
              <Button
                className="font-inter font-semibold text-white bg-main-choc text-xl hover:bg-main-green-darker"
                onClick={handleClick}
              >
                Back To Dashboard
              </Button>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link isExternal={true} showAnchorIcon={true}>
                Any Problem? Contact Admin Phone Number.
              </Link>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default FinishPayment;
