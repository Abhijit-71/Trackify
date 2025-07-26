import React, { useEffect, useState, useRef } from "react";
import { Authorization } from "./auth";
import { useNavigate } from "react-router-dom";
import Heatmap from "../components/heatmap";
import { Piechart, Areachart, Barchart } from "../components/chart";
import try_avatar from "../images/try_avatar.svg";
import "./dashboard.css";
import { Award, BookCheck, Flame } from "lucide-react";

function Dashboard() {
  //const navigate = useNavigate()
  const [user, setuser] = useState(null);

  const api = Authorization();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace '' with your endpoint, e.g., 'dashboard/'
        const response = await api.get("profile/");
        setuser(response.data);
        console.log(user.calender);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const scrollRef = useRef(null);

  useEffect(() => {
    const box = scrollRef.current;
    if (box) {
      box.scrollLeft = box.scrollWidth;
    }
  }, []);

  const value_heat = user?.calender;
  const data_area = user?.data_area;
  const data_bar = user?.data_bar;
  const pie = 2;

  //implement calender

  //JSON.stringify(user, null, 2)
  return (
    <div className="bg-slate-800">
      <div
        className="flex flex-col gap-6 pl-6 pr-6 pt-3 pb-3 h-lvh w-lvw min-h-[700px] "
        id="main"
      >
        <div className="h-3/5 flex flex-row gap-6 " id="panel1">
          <div
            className="h-full w-1/3 min-w-[0px] rounded-xl backdrop-blur-xl backdrop-saturate-100 bg-white/20 border border-white border-opacity-40 shadow-2xl shadow-black flex items-center justify-center gap-2 flex-col p-2"
            id="profile"
          >
            <div className="flex justify-center w-full items-center flex-col">
              <img
                src={try_avatar}
                className="sm:size-[max(5vw,7vh)] size-[7vw]"
              ></img>
              <h1 className="font-degular text-white h-1/6 text-[4vw] sm:text-[2vw]">
                {user?.username}
              </h1>
              <p className="font-sans text-gray-400 font-normal text-[2vw] sm:text-[1vw]">
                {user?.email}
              </p>
              <div className="grid grid-cols-3 w-3/4 text-white mt-3 text-[2.7vw] sm:text-[1.2vw] font-degular">
                <div className="flex flex-col">
                  <h1>Badges</h1>
                  <p>0</p>
                </div>
                <div className="flex flex-col">
                  <h1>Tasks</h1>
                  <p>0</p>
                </div>
                <div className="flex flex-col">
                  <h1>Weeks</h1>
                  <p>0</p>
                </div>
              </div>
            </div>
            <div className="h-1/4 w-2/3 flex items-center justify-center flex-col">
              <p className="font-jetsbrain  text-white text-[2.3vw] sm:text-[1.1vw]">
                bio is a very special block write your goals and aims here.
              </p>
            </div>
          </div>
          <div className="h-full w-2/3 flex flex-col gap-3" id="points">
            <div className="h-2/3 w-full flex flex-row gap-3" id="piemom">
              <div className="h-full w-1/3 flex flex-col gap-3" id="streaks">
                <div className="h-1/2 w-full rounded-xl backdrop-blur-md backdrop-saturate-100 bg-white/20 border border-white border-opacity-40 shadow-2xl shadow-black flex justify-center gap-[1vh] items-center flex-col p-2 text-white">
                  <h1 className="font-degular text-[3.5vw] sm:text-[2vw] flex items-center gap-[4px]">
                    Streaks
                    <Flame className="size-[3.5vw] sm:size-[2vw]" />
                  </h1>
                  <div className="grid grid-cols-2 gap-[2vw] font-jetsbrain text-[2vw] sm:text-[1.2vw]">
                    <div className="flex flex-col">
                      <h1>Current</h1>
                      <p>{user?.streak}</p>
                    </div>
                    <div className="flex flex-col">
                      <h1>Highest</h1>
                      <p>0</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white h-1/2 w-full rounded-xl backdrop-blur-md backdrop-saturate-100/20 border border-white border-opacity-40 shadow-2xl shadow-black flex justify-center gap-[1.5vh] items-center flex-col p-2 text-white">
                  <h1 className="font-degular text-[3.5vw] sm:text-[2vw] flex items-center gap-[4px]">
                    Badges
                    <Award className="size-[3.5vw] sm:size-[2vw]" />
                  </h1>
                  <div className="font-jetsbrain  text-gray-400 text-[2.3vw] sm:text-[1.1vw]">
                    No badges earned
                  </div>
                </div>
              </div>
              <div
                className="backdrop-blur-md backdrop-saturate-100 bg-white/20 border border-white border-opacity-40 h-full w-2/3 rounded-xl shadow-2xl shadow-black text-white p-[2vw]"
                id="piechart"
              >
                <div className="h-1/6 w-full flex items-center justify-center">
                  <h1 className="font-degular text-[3.5vw] sm:text-[2vw] flex items-center gap-[4px]">
                    Tasks <BookCheck className="size-[3.5vw] sm:size-[2vw]" />
                  </h1>
                </div>
                <div className="h-5/6 w-full flex flex-row gap-[3vw]  pt-0 justify-around items-center">
                  <Piechart />
                  <div className="h-full w-1/3 flex items-center justify-around flex-col">
                    <div
                      className="p-1 w-3/4 flex items-center justify-center text-[min(2vw,1.15rem)] rounded-xl font-semibold"
                      style={{ backgroundColor: "#E38627" }}
                    >
                      Easy - {pie}{" "}
                    </div>
                    <div
                      className="p-1 w-3/4 flex items-center justify-center text-[min(2vw,1.15rem)] rounded-xl font-semibold"
                      style={{ backgroundColor: "#C13C37" }}
                    >
                      Med. - {pie}{" "}
                    </div>
                    <div
                      className="p-1 w-3/4 flex items-center justify-center rounded-xl text-[min(2vw,1.15rem)] font-semibold"
                      style={{ backgroundColor: "#6A2135" }}
                    >
                      Hard - {pie}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="h-1/3 backdrop-blur-md backdrop-saturate-100 bg-white/20 border border-white border-opacity-40  rounded-xl flex justify-evenly shadow-2xl shadow-black"
              id="heatmap"
            >
              <div
                ref={scrollRef}
                className="h-full w-90 flex items-center pb-2 overflow-auto"
              >
                <Heatmap values={value_heat} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="h-2/5 flex min-h-36 flex-row items-center justify-around gap-6"
          id="panel2"
        >
          <div
            className="rounded-xl w-1/2 flex justify-around h-full backdrop-blur-md backdrop-saturate-100 bg-white/20 border border-white border-opacity-40 shadow-2xl shadow-black items-start flex-col pt-3"
            id="archart"
          >
            <div className="text-white flex flex-col items-start ml-[10%]">
              <h1 className="font-degular text-[4vw] sm:text-[1.5vw]">
                Weekly Wins
              </h1>
              <p className="font-jetsbrain  text-gray-400 text-[2.3vw] sm:text-[1.1vw]">
                tasks submitted this week.
              </p>
            </div>
            <Areachart data={data_area} />
          </div>
          <div
            className="rounded-xl w-1/2 flex justify-around h-full backdrop-blur-md backdrop-saturate-100 bg-white/20 border border-white border-opacity-40 shadow-2xl shadow-black items-start flex-col pt-3"
            id="brchart"
          >
            <div className="text-white flex flex-col items-start ml-[10%]">
              <h1 className="font-degular text-[4vw] sm:text-[1.5vw]">
                Monthly Highlights
              </h1>
              <p className="font-jetsbrain  text-gray-400 text-[2.3vw] sm:text-[1.1vw]">
                tasks submitted this month.
              </p>
            </div>
            <Barchart data={data_bar} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
