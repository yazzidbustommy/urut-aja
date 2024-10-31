import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import barcode from "../image/barcode.jpg";
import { axiosInstance } from "../../lib/axsios";
import { data } from "autoprefixer";
import { Navigate, useNavigate } from "react-router-dom";
import { h1 } from "framer-motion/client";

export default function BiddingPayment() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const email = sessionStorage.getItem("emailEmploye");
  const [dataPayment, setDataPayment] = useState([]);
  const navigate = useNavigate();

  const getTransaction = async () => {
    try {
      const result = await axiosInstance.get(`bidAccept`);
      const findData = result.data.filter((find) => {
        return find.emailCustomer == email;
      });
      setDataPayment(findData);

      console.log(result);
      console.log("ini find data", findData);
    } catch (error) {
      console.log("gagal get", error);
    }
  };

  const submitPayment = async (data, close) => {
    const dataaBid = {
      nameCustomer: data.nameCustomer,
      addressCustomer: data.addressCustomer,
      districtCustomer: data.districtCustomer,
      emailCustomer: data.emailCustomer,
      PhoneNumber_customer: data.PhoneNumber_customer,
      dealBudget: data.dealBudget,
      emailEmploye: data.emailEmploye,

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
      const postData = await axiosInstance.post(`transactions`, dataaBid);

      const deleteData = await axiosInstance.delete(`bidAccept/${data.id}`);

      close();
      navigate(`/IncomingMassage`);
    } catch (error) {
      console.log("gagal jalanin bro", error);
    }
  };
  useEffect(() => {
    getTransaction();
    console.log("ini email :", email);
  }, []);

  useEffect(() => {
    console.log("ini data pada state ", dataPayment);
  });

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-main-choc to-main-green">
      {dataPayment &&
        dataPayment.map((data) => (
          <div key={data.id} className="bg-white shadow-lg rounded-lg p-6 flex">
            <div className="w-1/2 p-4 border-r-4 border-r-main-choc">
              <h2 className="text-2xl font-inter font-semibold text-main-choc">
                Detail Pembayaran
              </h2>
              {paymentMethod === "qris" && (
                <div className="">
                  <h3 className="text-lg font-inter text-main-choc">
                    Bayar dengan <strong className="text-sky-600">QRIS</strong>
                  </h3>

                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    className="h-56 w-56"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M3 9h6V3H3zm1-5h4v4H4zm1 1h2v2H5zm10 4h6V3h-6zm1-5h4v4h-4zm1 1h2v2h-2zM3 21h6v-6H3zm1-5h4v4H4zm1 1h2v2H5zm15 2h1v2h-2v-3h1zm0-3h1v1h-1zm0-1v1h-1v-1zm-10 2h1v4h-1v-4zm-4-7v2H4v-1H3v-1h3zm4-3h1v1h-1zm3-3v2h-1V3h2v1zm-3 0h1v1h-1zm10 8h1v2h-2v-1h1zm-1-2v1h-2v2h-2v-1h1v-2h3zm-7 4h-1v-1h-1v-1h2v2zm6 2h1v1h-1zm2-5v1h-1v-1zm-9 3v1h-1v-1zm6 5h1v2h-2v-2zm-3 0h1v1h-1v1h-2v-1h1v-1zm0-1v-1h2v1zm0-5h1v3h-1v1h-1v1h-1v-2h-1v-1h3v-1h-1v-1zm-9 0v1H4v-1zm12 4h-1v-1h1zm1-2h-2v-1h2zM8 10h1v1H8v1h1v2H8v-1H7v1H6v-2h1v-2zm3 0V8h3v3h-2v-1h1V9h-1v1zm0-4h1v1h-1zm-1 4h1v1h-1zm3-3V6h1v1z"></path>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                    </g>
                  </svg>
                </div>
              )}

              {paymentMethod === "cash" && (
                <div>
                  <h3 className="text-lg font-inter text-main-choc">
                    Bayar dengan{" "}
                    <strong className="text-main-green">Cash</strong>
                  </h3>
                  <p className="text-sm mt-5 font-inter text-main-choc">
                    Customer akan membayar <br />
                    setelah massage selesai.
                  </p>
                </div>
              )}

              {paymentMethod === "" && (
                <p className="text-gray-600">
                  Silakan pilih metode pembayaran di sebelah kanan.
                </p>
              )}
            </div>

            {/* Bagian kanan untuk pilihan metode pembayaran */}
            <div className="w-1/2 p-4 flex flex-col">
              <h2 className="text-2xl font-inter font-semibold text-main-choc mb-8">
                Pilih Metode Pembayaran
              </h2>

              <div>
                <label className="text-main-green font-inter font-bol">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />{" "}
                  Cash
                </label>
                <br />
                <label className="text-sky-700 font-inter font-bold">
                  <input
                    type="radio"
                    value="qris"
                    checked={paymentMethod === "qris"}
                    onChange={() => setPaymentMethod("qris")}
                  />{" "}
                  QRIS
                </label>
              </div>

              <h3 className="font-semibold font-inter text-main-green mt-16 text-3xl mx-auto">
                Rp. {data.dealBudget},-
              </h3>

              <Button
                onPress={onOpen}
                className="mt-2 mx-auto font-inter font-semibold text-lg bg-main-green text-white"
                auto
              >
                Konfirmasi Pembayaran
              </Button>

              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        <h3 className="text-lg font-inter text-main-choc">
                          Konfirmasi Pembayaran
                        </h3>
                      </ModalHeader>
                      <ModalBody>
                        {paymentMethod === "qris" ? (
                          <p className="text-main-choc">
                            Anda memilih untuk membayar dengan QRIS.
                          </p>
                        ) : (
                          <p className="text-main-choc">
                            Anda memilih untuk membayar dengan Cash.
                          </p>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          onPress={onClose}
                          className="font-inter"
                        >
                          Close
                        </Button>
                        <Button
                          color="success"
                          onClick={() => submitPayment(data, onClose)}
                          className="text-white font-inter"
                        >
                          Confirm
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        ))}
    </div>
  );
}
