"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { Poppins } from "next/font/google";

import Human from "@/app/assets/student.png";
import Flower from "@/app/assets/flower.png";

import Login from "@/app/Login/page";

import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export default function Home() {
  const useWindowSize = () => {
    const [size, setSize] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      const updateSize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      updateSize(); // set initial size
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
  };

  const { width, height } = useWindowSize();

  const data = [
    {
      status: "Completed",
      period: "Pre Operative",
      title: "OXFORD KNEE SCORE (OKS)",
      periodShort: "PRE OP",
      questions: 14,
      duration: "10 min",
    },
    {
      status: "Pending",
      period: "6 Weeks",
      title: "KNEE SOCIETY SCORE (KSS)",
      periodShort: "6 W",
      questions: 18,
      duration: "9 min",
    },
    {
      status: "Completed",
      period: "3 Months",
      title: "KNEE INJURY AND OSTEOARTHRITIS OUTCOME SCORE (KOOS)",
      periodShort: "3 M",
      questions: 15,
      duration: "12 min",
    },
    {
      status: "Pending",
      period: "6 Months",
      title: "FORGOTTEN JOINT SCORE (FJS)",
      periodShort: "6 M",
      questions: 12,
      duration: "8 min",
    },
    {
      status: "Completed",
      period: "1 Year",
      title: "SHORT FORM 12 (SF-12)",
      periodShort: "1 YR",
      questions: 12,
      duration: "10 min",
    },
  ];

  const router = useRouter();

  return (
    <>
      <div
        className={`${poppins.className} w-screen  bg-white flex flex-col  ${width<600?"h-full p-2":"h-screen p-4"} relative`}
      >
        <div
          className={`w-full  rounded-2xl bg-[linear-gradient(to_bottom_right,_#7075DB_0%,_#7075DB_40%,_#DFCFF7_100%)] flex ${
            width < 750
              ? "flex-col h-fit justify-center items-center gap-4 p-4"
              : "flex-row h-[30%] px-10"
          }`}
        >
          <div
            className={`w-1/2 h-full flex flex-col justify-center ${
              width < 750 ? "items-center" : ""
            }`}
          >
            <p className="font-normal text-base text-white">April 09, 2025</p>
            <div
              className={`flex flex-col ${width < 750 ? "items-center" : ""}`}
            >
              <div
                className={`w-full flex flex-col ${
                  width < 750 ? "items-center" : ""
                }`}
              >
                <p
                  className={`font-semibold text-[32px] text-white ${
                    width < 750 ? "text-center" : ""
                  }`}
                >
                  Welcome Back!
                </p>
                <p
                  className={`font-semibold text-[32px] text-white ${
                    width < 750 ? "text-center" : ""
                  }`}
                >
                  APM
                </p>
              </div>
              <p
                className={`font-normal text-base text-white ${
                  width < 750 ? "text-center" : ""
                }`}
              >
                A compelete questionnaire section
              </p>
            </div>
          </div>

          <div
            className={`w-1/2 h-full flex  ${
              width < 750 ? "justify-center" : "justify-end"
            }`}
          >
            <Image src={Human} alt="human" className="w-[300px] h-full" />
          </div>
        </div>

        <div
          className={`w-full ${
            width < 600 ? "h-full" : "overflow-x-auto  h-[70%] "
          }`}
        >
          <div
            className={`${
              width < 600 ? "flex-col mx-auto" : "flex-row"
            } flex gap-4 w-max`}
          >
            {data.map((item, index) => (
              <div
                key={index}
                className={` h-[350px] bg-white rounded-2xl flex flex-col p-6 shadow-2xl gap-5 cursor-pointer ${width<350?"w-full":width<600?"w-[350px]":"w-[350px]"}`}
                onClick={() => router.push("/Questionnaire")}
                >
                <div className="w-full h-[15%] flex justify-end items-center">
                  <p
                    className={`text-white font-normal text-base rounded-2xl px-3 py-1 ${
                      item.status === "Pending"
                        ? "bg-[#FF4C4C]"
                        : "bg-[#199855]"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
                <div className="w-full h-[50%] flex justify-start flex-col">
                  <p className="font-normal text-[16px] text-[#3B3B3B]">
                    Period: {item.period}
                  </p>
                  <p className="font-semibold text-[20px] text-[#1E1E1E]">
                    {item.title}
                  </p>
                </div>
                <div className="w-full h-[35%] flex items-center flex-row">
                  <div className="w-[60%] flex flex-col items-center">
                    <p className="font-normal text-[15px] text-[#3C3C3C]">
                      No. of Questions
                    </p>
                    <p className="font-semibold text-[16px] text-black">
                      {item.questions}
                    </p>
                  </div>
                  <div className="w-[20%] flex flex-col items-center">
                    <p className="font-normal text-[15px] text-[#3C3C3C]">
                      Duration
                    </p>
                    <p className="font-semibold text-[16px] text-black">
                      {item.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-4">
            <Image src={Flower} alt="flower" className="w-32 h-32"/>
        </div>
      </div>
      {/* <Login /> */}
    </>
  );
}
