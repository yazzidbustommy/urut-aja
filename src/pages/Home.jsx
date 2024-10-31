import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Image,
  Select,
  SelectItem,
  Divider,
} from "@nextui-org/react";
import Login from "./modal/Login";
import SignUp from "./modal/SignUp";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TbMassage } from "react-icons/tb";
import { context } from "../context/authContex";
import { axiosInstance } from "../lib/axsios";
import {
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaSquareInstagram,
} from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const validateForm = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  address: z.string().min(1, "Address can't be empty"),
  district: z.string().min(1, "Please select your district"),
  gender: z.string().min(1, "Please select your gender"),
  phoneNumber: z.string().min(1, "Phone number can't be empty"),
  email: z
    .string()
    .min(1, "Email can't be empty, please enter your email address")
    .email("Email not valid"),
  budget: z.string().min(1, "Budget can't be empty, please select your budget"),
});

function Home() {
  const navigate = useNavigate();

  const [prices, setPrices] = useState([]);
  const [district, setDistrict] = useState([]);
  const [gender, setGender] = useState([]);
  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      district: "",
      gender: "",
      phoneNumber: "",
      email: "",
      budget: "",
    },
    resolver: zodResolver(validateForm),
  });
  const getFetch = async () => {
    try {
      const resultPrice = await axiosInstance.get("price");
      const resultDistrict = await axiosInstance.get("district");
      const resultGender = await axiosInstance.get("gender");
      setPrices(resultPrice.data);
      setDistrict(resultDistrict.data);
      setGender(resultGender.data);
      // console.log("ini price", result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const submitForm = async (data) => {
    // console.log("Data yang akan dikirim:", data.email);
    sessionStorage.setItem("emailEmploye", data.email);
    sessionStorage.setItem("district", data.district);
    try {
      const result = await axiosInstance.post("orders", data);

      form.reset();
      navigate("/BiddingFeedback");
    } catch (error) {
      console.log(error);
      alert("Sending Failed..");
    }
  };

  useEffect(() => {
    getFetch();
  }, []);

  return (
    <div className="h-screen min-w-screen bg-white flex flex-col font-inter">
      <Navbar
        isBordered
        height={100}
        className="bg-gradient-to-l from-main-choc to-main-green w-full"
      >
        <NavbarBrand className="gap-3">
          <TbMassage className=" text-white pl-2" size="80" />
          <p className="font-bold text-inherit text-3xl text-white text-inter">
            Urut Aja!!
          </p>
          {/* <p>asdas {emailVal}</p> */}
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem className="font-bold text-2xl text-white">
            Welcome Visitors
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Login />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex justify-center py-24 px-10 flex-grow">
        <Card className="grid grid-cols-2 w-fit shadow-none">
          <CardHeader className="flex flex-col">
            <Image
              width={1000}
              height={550}
              className="object-cover"
              alt="NextUI hero Image"
              src="https://www.batiqa.com/upload/news/xl/masseur-does-back-massage-young-guy-beauty-salon-min_2076a.jpg"
            />
          </CardHeader>
          <CardBody className="text-center font-bold text-3xl ">
            <h1 className="">Find Your Best Massage Therapist</h1>
            <form onSubmit={form.handleSubmit(submitForm)}>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    type="text"
                    {...field}
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    label="Full Name"
                    size="lg"
                    variant="underlined"
                    placeholder="Enter Your Full Name"
                  />
                )}
              />
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    type="text"
                    {...field}
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    label="Address"
                    size="lg"
                    variant="underlined"
                    placeholder="Enter Your Address"
                  />
                )}
              />
              <Controller
                name="district"
                control={form.control}
                render={({ field, fieldState }) => {
                  return (
                    <Select
                      {...field}
                      size="lg"
                      label="District"
                      variant="underlined"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                      placeholder="Choose Your Nearest District To Match With Massage Theraphist"
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
                name="gender"
                control={form.control}
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
                name="phoneNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    type="text"
                    {...field}
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    label="Phone Number"
                    size="lg"
                    variant="underlined"
                    placeholder="Enter Your Phone Number"
                  />
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    type="text"
                    {...field}
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    label="Email"
                    size="lg"
                    variant="underlined"
                    placeholder="Enter Your Email"
                  />
                )}
              />
              <Controller
                name="budget"
                control={form.control}
                render={({ field, fieldState }) => {
                  return (
                    <Select
                      {...field}
                      size="lg"
                      label="Select Your Budget Range"
                      variant="underlined"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                      placeholder="Choose Your Budget"
                    >
                      {prices.map((price) => (
                        <SelectItem key={price.range} textValue={price.range}>
                          {price.range}
                        </SelectItem>
                      ))}
                    </Select>
                  );
                }}
              />

              <div className="flex justify-center pt-5">
                <Button
                  type="submit"
                  className="w-36 font-bold bg-main-green text-white hover:bg-main-choc"
                  size="lg"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>

      <div className="flex w-full bg-gradient-to-br from-main-choc to-main-green justify-center py-10">
        <div className="w-9/12  flex flex-col gap-8">
          <h1 className="text-center font-bold text-white text-6xl">
            How To Order
          </h1>
          <div className="h-fit grid grid-cols-2">
            <div className="flex justify-center items-center">
              <svg
                width="300px"
                height="300px"
                viewBox="0 0 32 32"
                fill="#ffffff"
              >
                <path d="M19,11H9V9h10V11z M23,19.414V27H5V5h18v3.586L28.414,14L23,19.414z M23.086,16.5L20.5,13.914 l-4.5,4.5V21h2.586L23.086,16.5z M23,11.414L21.914,12.5l2.586,2.586L25.586,14L23,11.414z M21,21.414L19.414,23H9v-2h5v-2H9v-2 h5.586l2-2H9v-2h9.586L21,10.586V7H7v18h14V21.414z"></path>
              </svg>
              {/* <Image
                width={500}
                height={350}
                alt="NextUI hero Image"
                src="https://static.vecteezy.com/system/resources/previews/021/272/476/original/isometric-flat-3d-illustration-concept-of-man-filling-personal-data-form-free-vector.jpg"
              /> */}
            </div>
            <div className="flex justify-center items-center">
              <p className="text-xl mr-16 text-justify text-white">
                <strong className="text-2xl">Fill Out the Form</strong>
                <br />
                In this step, simply complete the form displayed on your main
                screen.
              </p>
            </div>
          </div>
          <div className="h-96 grid grid-cols-2">
            <div className="flex justify-center items-center">
              <p className="text-xl ml-16 text-justify text-white">
                <strong className="text-2xl">Choose Your Therapist</strong>
                <br />
                In the second step, select a therapist from the options
                provided. The system will show therapists based on your location
                and price range.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <svg
                fill="#ffffff"
                width="300px"
                height="300px"
                viewBox="0 0 24 24"
              >
                <path d="M20 20h-16c-1.654 0-3-1.346-3-3v-10c0-1.654 1.346-3 3-3h16c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3zm-16-14c-.551 0-1 .449-1 1v10c0 .551.449 1 1 1h16c.551 0 1-.449 1-1v-10c0-.551-.449-1-1-1h-16zM10 15h-4c-.553 0-1-.448-1-1s.447-1 1-1h4c.553 0 1 .448 1 1s-.447 1-1 1zM10 11h-4c-.553 0-1-.448-1-1s.447-1 1-1h4c.553 0 1 .448 1 1s-.447 1-1 1z"></path>{" "}
                <circle cx="16" cy="10.5" r="2"></circle>
                <path d="M16 13.356c-1.562 0-2.5.715-2.5 1.429 0 .357.938.715 2.5.715 1.466 0 2.5-.357 2.5-.715 0-.714-.98-1.429-2.5-1.429z"></path>
              </svg>
              {/* <Image
                width={500}
                height={350}
                alt="NextUI hero Image"
                src="https://img.freepik.com/free-vector/way-concept-illustration_114360-1583.jpg?t=st=1727356136~exp=1727359736~hmac=786580950cf56c49524c631b9fde95932c04c8aea4aeb03aa960738497bcac47&w=826"
              /> */}
            </div>
          </div>
          <div className="h-96 grid grid-cols-2">
            <div className="flex justify-center items-center">
              <svg
                width="300px"
                height="300px"
                viewBox="0 0 48 48"
                fill="#ffffff"
              >
                <path d="M0 0h48v48H0z" fill="none"></path>
                <path d="M40.228,21.494L30,11.267V8c0-2.2-1.8-4-4-4H10C7.8,4,6,5.8,6,8v23.955c0,2.2,1.8,4,4,4h3.992l0.121,0.799 c0.621,4.105,4.012,7.201,7.888,7.201h20v-17C42,23.483,40.656,21.907,40.228,21.494z M26,9.185c-0.198-0.019-0.398-0.03-0.6-0.03 c-1.605,0-3.112,0.623-4.24,1.751c-1.132,1.125-1.758,2.629-1.76,4.234c-0.003,1.611,0.621,3.123,1.756,4.259L26,24.243v7.712h-7V8 h7V9.185z M10,8h3v23.955h-3V8z M38,39.955H22c-1.915,0-3.605-1.633-3.933-3.799l-0.03-0.201H26c2.2,0,4-1.8,4-4v-3.712l2.12,2.12 l2.829-2.828l-4.663-4.663L25,17.587l-1.016-1.016c-0.378-0.378-0.585-0.884-0.584-1.424c0.001-0.534,0.207-1.033,0.584-1.408 c0.423-0.423,1.024-0.6,1.604-0.548c0.455,0.04,0.897,0.217,1.228,0.548L31,17.923l6.416,6.416l-0.072-0.022l0.109,0.072 C37.584,24.586,38,25.337,38,26.955V39.955z"></path>{" "}
              </svg>
              {/* <Image
                width={500}
                height={350}
                alt="NextUI hero Image"
                src="https://static.vecteezy.com/system/resources/previews/000/684/243/non_2x/online-payment.jpg"
              /> */}
            </div>
            <div className="flex justify-center items-center">
              <p className=" text-xl mr-7 text-justify text-white">
                <strong className="text-2xl">Make the Payment</strong>
                <br />
                After making the payment, the therapist will come to your
                location. Enjoy your massage!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-96 flex justify-center items-center">
        <div className="w-[40rem] flex flex-col justify-center items-center gap-6">
          <h1 className="text-5xl font-bold font-sans text-main-green-darker">
            Join Us
          </h1>
          <p className="text-center text-xl text-main-green-darker">
            Join Our Team as a Skilled and Professional Massage Therapist! We're
            looking for passionate individuals to provide exceptional massage
            services and help improve our clients' well-being. Apply today and
            grow your career with us!
          </p>
          <SignUp />
        </div>
      </div>

      <footer className="mt-auto justify-center min-w-full flex min-h-56 bg-gradient-to-r from-main-choc to-main-green">
        <div className="w-9/12 grid grid-cols-2 text-white ">
          <div className="h-full flex flex-col items-start pl-36 justify-center gap-2 ">
            <div className="flex gap-4">
              <FaLocationDot size="25" />
              <p className="font-bold text-md mb-2 text-white">
                Jl. Raya Pahlawan No. 20, Kota Jakarta
              </p>
            </div>
            <div className="flex gap-4">
              <FaPhone size="20" />
              <p className="font-bold text-md mb-2">+6281 23456 7890</p>
            </div>
            <div className="flex gap-4">
              <IoIosMail size="26" />
              <p className="font-bold text-m ">urutaja@mail.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="font-bold text-2xl ">About Us</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis veritatis et possimus id tempore nisi aliquid
              blanditiis, deleniti fuga in?
            </p>
            <div className="flex gap-6">
              <FaFacebookSquare size="35" />
              <FaSquareInstagram size="35" />
              <FaLinkedin size="35" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
