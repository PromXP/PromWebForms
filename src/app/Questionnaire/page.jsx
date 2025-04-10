"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { Poppins } from "next/font/google";

import Human from "@/app/assets/student.png";
import Flower from "@/app/assets/flower.png";
import Qicon from "@/app/assets/questionnaire.png";
import Qimage from "@/app/assets/qimage.png";

import Login from "@/app/Login/page";

import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const page = () => {
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
  const router = useRouter();

  const questions = [
    {
      questionText:
        "1. How would you describe the pain you usually have in your knee?",
      type: "single",
      options: ["No pain", "Very mild", "Mild", "Moderate", "Severe"],
    },
    {
      questionText: "2. Have you had any trouble washing and drying yourself?",
      type: "multiple",
      options: [
        "No trouble",
        "Little trouble",
        "Some trouble",
        "Extreme difficulty",
      ],
    },
    {
      questionText: "3. Are you able to walk down stairs normally?",
      type: "single",
      options: ["Yes", "Only with support", "No"],
    },
    {
      questionText: "4. Can you kneel down and get up again afterwards?",
      type: "single",
      options: ["Easily", "With some difficulty", "Not at all"],
    },
    {
      questionText: "5. Do you feel confident standing up from a chair?",
      type: "multiple",
      options: ["Always", "Sometimes", "Rarely", "Never"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("oks_answers");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  
  const [warning, setWarning] = useState("");

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (option) => {
    const id = currentIndex;
    const type = currentQuestion.type;
    let updatedAnswers;
  
    if (type === "single") {
      updatedAnswers = { ...answers, [id]: [option] };
    } else {
      const selected = answers[id] || [];
      if (selected.includes(option)) {
        updatedAnswers = {
          ...answers,
          [id]: selected.filter((o) => o !== option),
        };
      } else {
        updatedAnswers = {
          ...answers,
          [id]: [...selected, option],
        };
      }
    }
  
    setAnswers(updatedAnswers);
    localStorage.setItem("oks_answers", JSON.stringify(updatedAnswers));
  };
  

  const isSelected = (option) => (answers[currentIndex] || []).includes(option);

  const goNext = () => {
    setWarning(""); // Clear previous warning if any
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setWarning("");
    }
  };

  const handleSubmit = () => {
    const unanswered = questions.filter((_, idx) => {
      const ans = answers[idx];
      return !ans || ans.length === 0;
    });

    if (unanswered.length > 0) {
      setWarning("Please answer all questions before submitting.");
      setTimeout(() => setWarning(false), 2500);
    } else {
      setWarning("");
      console.log("Submitted answers:", answers);
      alert("Submitted successfully!");
    }
  };

  return (
    <div className={` bg-white flex flex-col relative ${width<850 && width>=700?"h-screen  w-screen":width<700?"h-full  w-full":"h-screen  w-screen"}`}>
      <div className={`w-full  flex flex-col bg-white ${width<850?"h-[30%]":"h-[12%]"}`}>
        <div
          className={`w-full flex items-center px-[30px]  ${width<850?"flex-col h-fit justify-center gap-4 py-[20px]":"flex-row h-[95%] justify-between py-[20px]"}`}
        >
          <p
            className={` font-bold text-base text-black flex items-center ${width<850?"w-full h-fit justify-center":"w-[45%] h-full "}`}
          >
            OXFORD KNEE SCORE (OKS)
          </p>
          <div className={`w-[5%]  flex justify-center items-center ${width<850?"h-fit":"h-full"}`}>
            <Image src={Qicon} alt="qicon" className="w-10 h-10" />
          </div>
          <div
            className={`h-full flex flex-col font-bold text-sm text-[#545454] ${width<850?"w-full gap-2":"w-[45%]"}`}
          >
            <p className={`w-full  ${width<850?"text-center h-fit":"text-end h-1/2 "}`}>PATIENT NAME: APM</p>
            <p className={`w-full  ${width<850?"text-center  h-fit":"text-end  h-1/2"}`}>PATIENT ID: 12345678</p>
          </div>
        </div>
        <div className={`w-full h-3 bg-[#7075DB]`} />
      </div>

      <div
        className={`w-full flex  justify-center bg-white   gap-10 ${width<850 && width>=700?"h-full items-start pt-0 flex-row px-20":width<700?"flex-col py-10 px-10":"h-[80%] pt-10 flex-row px-30"}`}
      >

<div className={`h-full ${width<850 && width>=700?"w-1/2":width<700?"w-full":"w-1/3"}`}>
          <div
            className={`w-full  bg-[#7075DB] rounded-2xl flex flex-col p-6 gap-2 ${width<700?"h-full":"h-3/5"}`}
          >
            <p className={`w-full  text-white text-base font-semibold ${width<1200&& width>=700?"h-fit":width<700?"h-full":"h-[20%]"}`}>
              {questions[currentIndex].questionText}
            </p>

            <div className={`w-full  flex flex-col gap-2 text-white overflow-y-auto ${width<1200 && width>=700?"h-fit":width<700?"h-full":"h-[70%]"}`}>
              {currentQuestion.options.map((option, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {currentQuestion.type === "single" ? (
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      value={option}
                      checked={isSelected(option)}
                      onChange={() => handleOptionClick(option)}
                      className="accent-[#005585]"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      value={option}
                      checked={isSelected(option)}
                      onChange={() => handleOptionClick(option)}
                      className="accent-[#005585]"
                    />
                  )}
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
            {warning && (
              <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
                  {warning}
                </div>
              </div>
            )}
            <div className={`w-full h-[10%]`}>
              <div className="w-full flex flex-row justify-center items-center pt-2">
                <div className="w-1/2 flex flex-row justify-start items-center">
                  {currentIndex !== 0 && (
                    <p
                      className="font-semibold text-black text-sm cursor-pointer"
                      onClick={goPrev}
                    >
                      PREVIOUS
                    </p>
                  )}
                </div>
                <div className="w-1/2 flex flex-row justify-end items-center">
                  <p
                    className="font-semibold rounded-full px-3 py-[1px] cursor-pointer text-center text-white text-sm border-[#005585] border-2"
                    style={{ backgroundColor: "rgba(0, 85, 133, 0.9)" }}
                    onClick={() => {
                      if (currentIndex === questions.length - 1) {
                        // On last question, validate all answers
                        const unanswered = questions.filter((_, idx) => {
                          const ans = answers[idx];
                          return !ans || ans.length === 0;
                        });

                        if (unanswered.length > 0) {
                          setWarning(
                            "Please answer all questions before submitting."
                          );
                          setTimeout(() => {
                            setWarning("");
                          }, 2500);
                        } else {
                          setWarning("");
                          localStorage.removeItem("oks_answers");
                          router.push("/")
                          console.log("Submitted answers:", answers);
                          alert("Submitted successfully!");
                        }
                      } else {
                        setWarning("");
                        goNext(); // Just move to next question if not last
                      }
                    }}
                  >
                    {currentIndex === questions.length - 1 ? "SEND" : "NEXT"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={` h-full ${width<850 && width>=700?"w-1/2":width<700?"w-full":"w-1/3"}`}>
          <Image src={Qimage} alt="qicon" className="w-full h-full" />
        </div>

        
      </div>

      <div className="absolute bottom-0 left-4">
        <Image src={Flower} alt="flower" className="w-40 h-32" />
      </div>
    </div>
  );
};

export default page;
