import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Divider,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { axiosInstance } from "../../lib/axsios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { TbMassage } from "react-icons/tb";

function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validasi form login
  const validateFormLogin = z.object({
    email: z
      .string()
      .min(5, "Email harus memiliki minimal 5 karakter")
      .email("Email tidak valid"),
    password: z.string().min(4, "Password harus memiliki minimal 4 karakter"),
  });

  // Form Login
  const formLogin = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validateFormLogin),
  });

  // Post ke Login
  const loginSubmit = async (data) => {
    try {
      const result = await axiosInstance.post(`auth/login`, data);
      const token = result.data.access_token;

      // Dispatch untuk menyimpan token
      dispatch({
        type: "SET_TOKEN",
        token: token,
      });

      // Decode token untuk mendapatkan role user dan email
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      const userEmail = decodedToken.email;

      // Dispatch untuk menyimpan role dan email
      dispatch({
        type: "SET_ROLE",
        role: userRole,
      });

      // Redirect user berdasarkan role
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employe-dashboard");
      }
    } catch (error) {
      // Tangani kesalahan jika ada
      if (error.response) {
        console.log("Error response:", error.response.data);
      } else if (error.request) {
        console.log("Request error:", error.request);
      } else {
        console.log("General error:", error.message);
      }
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="font-bold text-white hover:text-main-choc hover:border-none"
        variant="ghost"
      >
        Login
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-main-choc font-bold text-3xl pt-16 items-center">
                Welcome!
                <TbMassage className=" text-main-choc mt-5" size="80" />
              </ModalHeader>
              <ModalBody className="gap-2">
                <Divider className="bg-white pt-1 rounded-sm" />
                <form onSubmit={formLogin.handleSubmit(loginSubmit)}>
                  <Controller
                    name="email"
                    control={formLogin.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          label="Email"
                          size="lg"
                          variant="underlined"
                          isClearable
                          className="font-bold  mb-5"
                          placeholder="Enter your email"
                        />
                      );
                    }}
                  />

                  <Controller
                    name="password"
                    control={formLogin.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          type="password"
                          {...field}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          autoComplete="current-password"
                          label="Password"
                          variant="underlined"
                          size="lg"
                          className=" font-bold mb-5"
                          placeholder="Enter your password"
                        />
                      );
                    }}
                  />

                  <ModalFooter className="flex flex-col justify-center pt-16">
                    <Button
                      type="submit"
                      className="bg-gradient-to-br from-main-choc to-main-green text-white font-bold hover:from-main-green hover:to-main-choc"
                    >
                      Login
                    </Button>
                    <Button
                      variant="bordered"
                      onPress={onClose}
                      className=" text-main-choc font-bold"
                    >
                      Close
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

export default Login;
