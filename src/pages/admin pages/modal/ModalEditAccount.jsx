import React, { useEffect } from "react";
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
  Tooltip,
} from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { axiosInstance } from "../../../lib/axsios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// Schema validation
const validateForm = z.object({
  email: z.string().email("Email invalid"),
  password: z.string().min(2, "Password must have at least 8 characters"),
  address: z.string().min(5, "Address must have at least 10 characters"),
  district: z.string().min(3, "Address must have at least 10 characters"),
  name: z.string().min(3, "Name must have at least 3 characters"),
  age: z.string().min(1, "Age must be a positive number"),
  gender: z.string().min(3, "Gender must have at least 3 characters"),
  phoneNumber: z.string().min(1, "Phone number must be a positive number"),
  ktp: z.string().min(3, "NIK must have at least 3 characters"),
  kk: z.string().min(3, "NIK must have at least 3 characters"),
});

const ModalEditAccount = ({ info, trigerDelete }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const token = useSelector((state) => state.auth.token);

  const form = useForm({
    defaultValues: {
      id: "",
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
    resolver: zodResolver(validateForm),
  });

  useEffect(() => {
    form.reset({
      id: info.id,
      name: info.name.replace(/\b\w/g, (match) => match.toUpperCase()),
      email: info.email,
      password: info.password,
      address: info.address,
      district: info.district,
      age: info.age,
      phoneNumber: info.phoneNumber,
      gender: info.gender,
      ktp: info.ktp,
      kk: info.kk,
      role: info.role,
    });
  }, []);
  const updateAccount = async (data) => {
    console.log("cari data", info.id);
    try {
      const result = await axiosInstance.put(`users/${info.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("sukses", result.data);
      // alert("sukses");
      Swal.fire({
        title: "success!",
        text: "account updated",
        icon: "success",
      });

      onOpenChange(false);
      trigerDelete();
    } catch (error) {
      console.error(error.message);
      // console.error(data);
      // alert("gagal");
      Swal.fire({
        title: "success!",
        text: "account update failed",
        icon: "success",
      });
    }
  };

  return (
    <>
      <Tooltip content="Edit">
        <Button
          isIconOnly
          onPress={onOpen}
          variant="light"
          startContent={<FaEdit />}
        ></Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent className="overflow-y-auto h-[700px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                <h1 className="font-bold text-2xl text-center pb-3">
                  Edit Massage Therapist Details
                </h1>
                <Avatar src="" className="w-32 h-32 text-large" />
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={form.handleSubmit(updateAccount)}
                  className="flex flex-col gap-3 pt-5"
                >
                  <strong className="font-inter font-bold text-main-choc">{`ID : ${info.id}`}</strong>

                  {/* Name */}
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="Name"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />

                  {/* Email */}
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="Email"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />

                  {/* Password */}
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="Password"
                        type="text"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />

                  {/* Address */}
                  <Controller
                    name="address"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="Address"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />
                  <Controller
                    name="district"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="District"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />
                  {/* Age */}
                  <Controller
                    name="age"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="Age"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />

                  {/* Phone Number */}
                  <Controller
                    name="phoneNumber"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="Phone Number"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />

                  {/* Gender */}
                  <Controller
                    name="gender"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="Gender"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />

                  {/* KTP */}
                  <Controller
                    name="ktp"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="KTP"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />

                  {/* KK */}
                  <Controller
                    name="kk"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="KK"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />

                  <Controller
                    name="role"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        color="primary"
                        label="Role"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="border-4 rounded-xl bg-main-grey border-main-choc text-main-choc font-inter"
                      />
                    )}
                  />
                  <Divider />
                  <h1 className="text-center font-bold font-inter text-main-choc text-2xl">
                    Documents
                  </h1>
                  <Link href="#">
                    <Button
                      isDisabled
                      className="bg-main-choc text-white font-inter font-bold"
                    >
                      Upload KTP
                    </Button>
                  </Link>
                  <Link href="#">
                    <Button
                      isDisabled
                      className="bg-main-choc text-white font-inter font-bold"
                    >
                      Upload KK
                    </Button>
                  </Link>

                  <ModalFooter className="justify-center">
                    <Button
                      type="submit"
                      color="success"
                      className=" w-72 text-xl bg-main-choc text-white font-inter font-bold "
                    >
                      Update
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

export default ModalEditAccount;
