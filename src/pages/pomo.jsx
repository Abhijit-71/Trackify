import React, { useRef, useState } from "react";
import "./pomo.css";
import { TablePomo } from "../components/tasktable";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import Clock from "../components/clock";
import {
  Maximize,
  Minimize,
  CirclePlay,
  CirclePause,
  BookCheck,
  Music2,
  LogOut,
} from "lucide-react";

function date() {
  const currentDate = new Date();
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day_week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; //check doc for ind 0
  const year = currentDate.getFullYear();
  const month = monthName[currentDate.getMonth()];
  const day = currentDate.getDate();
  const weekday = day_week[currentDate.getDay()];
  return (
    <div>
      <span>
        {weekday} , {day} {month} {year}
      </span>
    </div>
  );
}

function Pomo() {
  //taskbar view
  const taskbar = useRef(null);
  function showPanel() {
    taskbar.current.classList.toggle("active");
  }
  function hidePanel() {
    taskbar.current.classList.remove("active");
  }

  //full screen mode
  const divRef = useRef(null);
  const [fullButtton, setfullButton] = useState(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      divRef.current.requestFullscreen();
      setfullButton((prev) => !prev);
    } else {
      document.exitFullscreen();
      setfullButton((prev) => !prev);
    }
  };

  //handling timer
  const [startTime, setstartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const intervalRef = useRef(null);

  const handleStart = () => {
    const time = new Date().getTime() + 45 * 60 * 1000;
    setstartTime(time);
    setTimeLeft(0);

    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev + 1000);
      }, 1000);
    }
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setstartTime(new Date().getTime() + 0);
  };

  const handleResume = () => {
    setstartTime(new Date().getTime() + (45 * 60 * 1000 - timeLeft));
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev + 1000);
      }, 1000);
    }
  };

  const [toggle, setToggle] = useState(true);
  const handlePR = () => {
    if (toggle) {
      handlePause();
    } else {
      handleResume();
    }
    setToggle(!toggle);
  };

  //getting data from task_table.js
  const [taskData, setTaskData] = useState(null);
  const handleResult = (data) => {
    setTaskData(data);
  };
  //handling api submission
  function submitTask() {}

  return (
    <div className="h-lvh w-lvw">
      <div className="h-full w-full flex items-center flex-col justify-around">
        <div
          className="w-[90%] h-5/6 flex flex-col items-center justify-center gap-[1vh] rounded-lg "
          id="main_pomo"
          ref={divRef}
        >
          <div
            id="date-time-rep"
            className="h-1/5 flex items-center justify-center flex-col text-zinc-800 font-bold font-degular"
          >
            <h1 className="text-[min(3.7vw,3.7vh)]" id="time">
              <Clock hour12={false} />
            </h1>
            <h4 className="text-[min(4vw,4vh)]" id="date">
              {date()}
            </h4>
          </div>
          <div
            id="timer"
            className="flex flex-col items-center backdrop-blur-lg rounded-xl border border-white/30 shadow-lg shadow-black"
          >
            <div className="mt-4 text-slate-600">
              <h1 className="text-[min(3vw,3vh)] font-sans font-semibold">
                {taskData ? taskData[1] : "Select task from table"}
              </h1>
              <p className="text-[min(2.5vw,2.5vh)] font-sans leading-none">
                {taskData ? taskData[2] : ""}
              </p>
            </div>
            <div className="m-4 mb-2">
              <FlipClockCountdown
                hideOnComplete={false}
                to={startTime}
                onComplete={submitTask()}
                renderMap={[false, true, true, true]}
                className="timer-cards"
              />
            </div>
            <div
              id="button-timer"
              className="w-3/5 flex flex-row justify-center m-4 mt-0 gap-3 text-slate-100"
            >
              <button
                className="p-2 text-[min(2vw,2vh)] bg-[rgba(184,246,232,0.33)] border-[1px] border-white rounded-md font-degular font-light"
                onClick={handleStart}
              >
                Start
              </button>
              <button
                className="p-2 text-[min(2vw,2vh)] bg-[rgba(184,246,232,0.33)] border-[1px] border-white rounded-md flex items-center justify-center gap-[2px] font-degular font-light"
                onClick={handlePR}
              >
                {toggle ? (
                  <CirclePause className="size-[min(2vw,2vh)]" />
                ) : (
                  <CirclePlay className="size-[min(2vw,2vh)]" />
                )}
                {toggle ? "Pause" : "Resume"}
              </button>
              <button
                className="p-2 text-[min(2vw,2vh)] bg-[rgba(184,246,232,0.33)] border-[1px] border-white rounded-md flex items-center justify-center gap-[4px] font-degular font-light"
                onClick={toggleFullscreen}
              >
                {fullButtton ? (
                  <Maximize className="size-[min(2vw,2vh)]" />
                ) : (
                  <Minimize className="size-[min(2vw,2vh)]" />
                )}
                {fullButtton ? "Full" : "Exit"}
              </button>
            </div>
          </div>
          <div id="end-bar" className="flex justify-center mt-[5px]">
            <div
              className="rounded-xl cursor-pointer bg-[conic-gradient(from_var(--conic-deg),_#0f0,_#ff0,_#0ff,_#f0f,_#0ff)] p-[2px]"
              id="grad_div"
            >
              <div className=" bg-[#bdbdbd] p-2 rounded-xl flex">
                <button
                  className="group rounded-lg bg-white flex items-center justify-center pr-[7px] pl-[7px] p-[4px] mr-4"
                  onClick={showPanel}
                >
                  <p>
                    <BookCheck className="size-[min(3vw,3vh)]" />
                  </p>
                  <p className="hidden group-hover:block pl-[2px] text-[min(2vw,2vh)]">
                    Task
                  </p>
                </button>
                <button
                  className="group rounded-lg bg-white flex items-center justify-center pr-[7px] pl-[7px] p-[4px]"
                  onClick={showPanel}
                >
                  <p>
                    <Music2 className="size-[min(3vw,3vh)]" />
                  </p>
                  <p className="bg-white hidden group-hover:block pl-[2px] text-[min(2vw,2vh)]">
                    Music
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div
            id="taskbar"
            className="h-[80vh] w-[80vw] backdrop-blur-3xl rounded-xl bg-slate-800/50 border-white/30 border p-4"
            ref={taskbar}
          >
            <h2 className="text-[max(4vh,3vw)] font-degular text-white">
              Tasks
            </h2>
            <div className="w-[75%] overflow-auto">
              <TablePomo />
            </div>
            <button
              type="button"
              name=""
              id=""
              className="p-[6px] text-[13px] text-white bg-[rgba(177,200,194,0.65)] border-[1px] border-white flex items-center gap-1 rounded-lg"
              onClick={hidePanel}
            >
              Close<LogOut className="size-[13px]"></LogOut>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomo;
