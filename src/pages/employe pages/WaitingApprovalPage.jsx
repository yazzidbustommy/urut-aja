import {
  Button,
 
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MdPersonPinCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosInstance } from "../../lib/axsios";
import { Route, Routes, useNavigate } from "react-router-dom";

function WaitingApprovalPage() {
  const history = useNavigate();
  const email = sessionStorage.getItem("email");
  const [checkOrder, setCheckOrder] = useState(null);
  const [nonApproved, setNonApproved] = useState(true);
  const [check, setCheck] = useState(false);
  // const [dataPayment, setDataPayment] = useState(null);
  const [bidPending, setBidPending] = useState([]);
  const [bidAccept, setBidAccept] = useState([]);
  const navigate = useNavigate();
  const takeEmailCustomer = sessionStorage.getItem("emailCustomer");

  // let intervalId;

  // const getFetch = async () => {
  //   const resultBidPending = await axiosInstance.get(`bidPending`);
  //   const resultBidAccept = await axiosInstance.get(`bidAccept`);
  //   setBidPending(resultBidPending);
  //   setBidAccept(resultBidAccept);
  // };

   const goBack = async (filteredOrders, resultBidPending) => {
    if (filteredOrders.length === 0) {
      const filteredBidPending = resultBidPending.data.filter((employe) => {
        return employe.employeInfo.email === email;
      });
  
      
      if (filteredBidPending.length > 0) {
        await axiosInstance.delete(`bidPending/${filteredBidPending[0].id}`);
        navigate("/employe-dashboard");
      } else {
        console.log("No bid pending data found for this employee.");
      }
    }
  };



  const getBidAccept = async () => {
    // console.log(bidAccept);
    const resultBidPending = await axiosInstance.get("bidPending");
    const resultBidAccept = await axiosInstance.get("transactions");
    const resultOrder = await axiosInstance.get("orders");

    let filteredOrders = resultOrder.data.filter((customer) => {
      return customer.email == takeEmailCustomer;
    });

    // setCheckOrder(filteredOrders);
    // console.log("filtered orders", filteredOrders);
    await goBack(filteredOrders,resultBidPending)
    let emailValue = resultBidAccept.data.filter((employe) => {
      return employe.emailCustomer == takeEmailCustomer;
    });
   
    // console.log(emailValue);
    
    if (emailValue[0].emailEmploye == email) {
      console.log("sama bro");
      Swal.fire({
        position: "center",
        icon: "success",
        //   iconColor: "white"
        title: "Transaction Approved",
        showConfirmButton: false,
        timer: 1000,
        color: "#FFFFFF",
        background: "#57663d",
      });
      navigate("/finish-payment");
    } else if (
      emailValue[0].emailEmploye !== email &&
      takeEmailCustomer == emailValue[0].emailCustomer
    ) {
      const filteredBidPending = resultBidPending.data.filter((employe) => {
        return employe.employeInfo.email === email;
      });

      const deleteBidPending = await axiosInstance.delete(
        `bidPending/${filteredBidPending[0].id}`
      );
      
      navigate("/employe-dashboard");
    } else {
      console.log(check);
      setCheck(!check);
    }
   

    return resultBidAccept;
  };

  useEffect(() => {
    const notBack = async () => {
      const get = await getBidAccept();
      // console.log(get, "data yang diterima server");
      window.history.pushState(null, null, window.location.href);
      const handleBackButton = (event) => {
        if (get && get.data && get.data.length > 0) {
          event.preventDefault(event);
          window.history.pushState(null, null, window.location.href);
          alert("tidak bisa kembali karena data approve sudah ada");
        }
        window.addEventListener("popstate", handleBackButton);
        return () => {
          window.removeEventListener("popstate", handleBackButton);
        };
      };
    };
    notBack();

    const intervalId = setInterval(() => {
      window.history.pushState(null, null, window.location.href);
      // console.log("jalan");
    }, 1000); // Setiap 1 detik

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // useEffect(() => {
  //   console.log("ini state null", checkOrder);
  // }, []);

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-main-choc to-main-green gap-4">
        <div></div>
        <MdPersonPinCircle className="w-60 h-60 text-neutral-200 animate-bounce" />
        <div className="text-white font-inter font-semibold text-5xl animate-pulse">
          Waiting Approval Page Loading...
        </div>
        <div>
          {/* <p>Count: {count}</p> */}
          <Button
            className="flex justify-center items-center text-lg font-inter font-semibold  text-main-green w-20 h-16 rounded-xl bg-white mt-20 transition duration-1000 hover:scale-110 hover:duration-900 hover:transition hover:animate-pulse"
            onClick={getBidAccept}
          >
            Refresh
          </Button>
          {/* <Button onClick={handleClick}> stop</Button> */}
        </div>
      </div>
    </>
  );
}

export default WaitingApprovalPage;
