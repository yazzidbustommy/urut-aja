import React from "react";

function RecruitmentInfo() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-br from-main-choc to-main-green">
      <svg
        viewBox="-0.5 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
        className="w-20 h-20"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#CCCCCC"
          stroke-width="1.25"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M10.58 3.96997H6C4.93913 3.96997 3.92172 4.39146 3.17157 5.1416C2.42142 5.89175 2 6.9091 2 7.96997V17.97C2 19.0308 2.42142 20.0482 3.17157 20.7983C3.92172 21.5485 4.93913 21.97 6 21.97H18C19.0609 21.97 20.0783 21.5485 20.8284 20.7983C21.5786 20.0482 22 19.0308 22 17.97V13.8999"
            stroke="#ffffff"
            stroke-width="1.95"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
          <path
            d="M10.58 9.96997H2"
            stroke="#ffffff"
            stroke-width="1.95"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
          <path
            d="M5 18.9199H11"
            stroke="#ffffff"
            stroke-width="1.95"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
          <path
            d="M14 6.73995L16.76 9.73995L22 4.44995"
            stroke="#ffffff"
            stroke-width="1.95"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
        </g>
      </svg>
      <h1 className="text-5xl font-inter font-semibold text-white">
        Thanks You for Registering
      </h1>
      <h1 className="text-4xl font-inter font-semibold text-white">
        admin will contact you via email, phone number, etc. please check
        regularly.
      </h1>
    </div>
  );
}

export default RecruitmentInfo;
