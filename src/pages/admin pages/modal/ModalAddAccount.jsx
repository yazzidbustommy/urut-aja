import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Divider,
  Link,
  Input,
} from "@nextui-org/react";

import React from "react";
import { FaPlus } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../../../lib/axsios";
import Swal from "sweetalert2";
const ModalAddAccount = ({ trigerAccount }) => {
  const validateFormsignUp = z.object({
    email: z
      .string()
      .min(5, "Email must have at least 5 characters")
      .email("Email invalid"),
    password: z.string(),
    name: z.string().min(3),
    address: z.string().min(5),
    district: z.string().min(5),
    age: z.string(),
    phoneNumber: z.string().min(3),
    gender: z.string().min(1),
    ktp: z.string().min(3),
    kk: z.string().min(3),
    role: z.string(),
  });
  // Form SignUp
  const formSignUp = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      district: "",
      age: "",
      phoneNumber: "",
      gender: "",
      ktp: "",
      kk: "",
      role: "",
    },
    resolver: zodResolver(validateFormsignUp),
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const postEmploye = async (data) => {
    try {
      const result = await axiosInstance.post(`auth/register`, data);
      await Swal.fire({
        title: "success!",
        text: "add account",
        icon: "success",
      });
      trigerAccount();
    } catch (error) {
      console.log(data);
      Swal.fire({
        title: "error!",
        text: "add failed",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="solid"
        color="success"
        size="lg"
        startContent={<FaPlus />}
        className="text-white bg-main-choc"
      >
        Add New Therapist
      </Button>
      <Modal
        datates
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        className="flex overflow-y-auto h-[700px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex h-72 flex-col items-center bg-main-choc text-white font-inter font-normal">
                <h1 className="font-bold text-2xl text-center pb-3">
                  Add New Massage Therapist
                </h1>
                <Avatar
                  src="https://picsum.photos/seed/person/200/300"
                  className="w-32 h-32 text-large border-4 border-white"
                />
              </ModalHeader>
              <ModalBody className="">
                <form
                  onSubmit={formSignUp.handleSubmit(postEmploye)}
                  className="flex flex-col gap-3 pt-5"
                >
                  <Controller
                    name="name"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="Name"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
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
                          type="email"
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="Email"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="password"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          type="text"
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="Password"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
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
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="Address"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="district"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="District"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                        />
                      );
                    }}
                  />

                  <Controller
                    name="age"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="Age"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
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
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="Phone Number"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="gender"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="Gender"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="ktp"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="Nik"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
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
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="No KK"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                        />
                      );
                    }}
                  />
                  <Controller
                    name="role"
                    control={formSignUp.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          color="primary"
                          label="Role"
                          className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                        />
                      );
                    }}
                  />

                  <Divider className="h-1 rounded-full bg-main-choc mt-4 w-20 mx-auto" />
                  <h1 className="text-center font-bold text-2xl font-inter text-main-choc">
                    Upload Documents
                  </h1>

                  <label className="font-inter text-main-choc font-semibold">
                    Upload KTP
                  </label>
                  <Input
                    isDisabled
                    id="ktp_input"
                    type="file"
                    className="font-inter"
                  />
                  <label className="font-inter text-main-choc font-semibold">
                    Upload KK
                  </label>
                  <Input
                    isDisabled
                    id="kk_input"
                    type="file"
                    className="font-inter"
                  />
                  <ModalFooter className="justify-center">
                    <Button
                      type="submit"
                      className="w-72 bg-main-choc hover:border-4 hover:text-main-choc text-white font-inter text-xl hover:bg-white hover:border-main-choc"
                    >
                      Add
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
};

export default ModalAddAccount;
