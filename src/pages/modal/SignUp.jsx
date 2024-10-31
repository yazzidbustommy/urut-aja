import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { address } from "framer-motion/client";
import { axiosInstance } from "../../lib/axsios";
import { useNavigate } from "react-router-dom";

// Validation form login
const validateFormLogin = z.object({
  name: z.string().min(3),
  email: z
    .string()
    .min(5, "Email must have at least 5 characters")
    .email("Email invalid"),
  address: z.string().min(5),
  district: z.string(),
  age: z.string(),
  phoneNumber: z.string().min(3),
  gender: z.string().min(1),
  ktp: z.string().min(3),
  kk: z.string().min(3),
});

function SignUp() {
  const [district, setDistrict] = useState([]);
  const [gender, setGender] = useState([]);


  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Form SignUp
  const navigate = useNavigate();
  const formSignUp = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      district: "",
      age: "",
      phoneNumber: "",
      gender: "",
      ktp: "",
      kk: "",
    },
    resolver: zodResolver(validateFormLogin),
  });

  const getFetch =async ()=>{
    try {
      const resultDistrict = await axiosInstance.get("district");
      const resultGender = await axiosInstance.get("gender");

      console.log(resultDistrict)
      setDistrict(resultDistrict.data)
      console.log(resultGender)
      setGender(resultGender.data)
    } catch (error) {
      console.log("gagal get" ,error)
    }
  }

  // Post to the recruitment
  const signUpSubmit = async (data) => {
    try {
      const result = await axiosInstance.post(`recruitment`, data);
      alert("berhasil");
      navigate("/recruitment-info");
    } catch (error) {
      if (error.response) {
        console.log("Error response:", error.response.data);
      } else if (error.request) {
        console.log("Request error:", error.request);
      } else {
        console.log("General error:", error.message);
      }
    }
  };


  useEffect(()=>{
    getFetch()
  },[])
  return (
    <>
      {/* <h1>hello signup</h1> */}
      <Button
        color="primary"
        onPress={onOpen}
        size="lg"
        className="text-xl font-bold bg-main-green text-white hover:bg-main-choc"
      >
        Join With Us
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="overflow-y-auto h-[40rem] bg-gradient-to-tr from-gray-300 to-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center font-bold text-3xl text-main-choc">
                Sign Up
              </ModalHeader>
              <ModalBody>
                <Divider />

                <form
                  onSubmit={formSignUp.handleSubmit(signUpSubmit)}
                  className="flex flex-col gap-4"
                >
                  <Controller
                    name="name"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          className="font-bold border-4 border-main-choc rounded-xl text-main-choc text-inter"
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          label="Full Name"
                          color="primary"
                        />
                      );
                    }}
                  />

                  <Controller
                    name="email"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          className="font-bold border-4 border-main-choc rounded-xl text-main-choc text-inter"
                          type="email"
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          label="Email"
                          color="primary"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="address"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          className="font-bold border-4 border-main-choc rounded-xl text-main-choc text-inter"
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          label="Address"
                          color="primary"
                        />
                      );
                    }}
                  />
                 <Controller
                name="district"
                control={formSignUp.control}
                render={({ field, fieldState }) => {
                  return (
                    <Select
                      {...field}
                      size="lg"
                      label="District"
                      variant="underlined"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                      placeholder="Choose Your District "
                    >
                      {district.map((item) => (
                        <SelectItem
                          key={item.district}
                          textValue={item.district}
                        >
                          {item.district}
                        </SelectItem>
                      ))}
                    </Select>
                  );
                }}
              />

                  <Controller
                    name="age"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          className="font-bold border-4 border-main-choc rounded-xl text-main-choc text-inter"
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          label="Age"
                          color="primary"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="phoneNumber"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          className="font-bold border-4 border-main-choc rounded-xl text-main-choc text-inter"
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          label="Phone Number"
                          color="primary"
                        />
                      );
                    }}
                  />
                  <Controller
                name="gender"
                control={formSignUp.control}
                render={({ field, fieldState }) => {
                  return (
                    <Select
                      {...field}
                      size="lg"
                      label="Gender"
                      variant="underlined"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                      placeholder="Choose Your Gender"
                    >
                      {gender.map((item) => (
                        <SelectItem key={item.gender} textValue={item.gender}>
                          {item.gender}
                        </SelectItem>
                      ))}
                    </Select>
                  );
                }}
              />
                  <Controller
                    name="ktp"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          className="font-bold border-4 border-main-choc rounded-xl text-main-choc text-inter"
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          label="NIK KTP"
                          color="primary"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="kk"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          className="font-bold border-4 border-main-choc rounded-xl text-main-choc text-inter"
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          label="KK Number"
                          color="primary"
                        />
                      );
                    }}
                  />
                  <ModalFooter className="flex justify-center">
                    {/* <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button> */}
                    <Button
                      className="w-72 font-bold bg-main-choc hover:border-4 hover:text-main-choc text-white font-inter text-xl hover:bg-white hover:border-main-choc"
                      type="submit"
                      onPress={onClose}
                      isDisabled={!formSignUp.formState.isValid}
                    >
                      Sign Up
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignUp;
