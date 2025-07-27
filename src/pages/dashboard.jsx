import React, { useEffect, useState, useRef } from "react";
import { Authorization } from "./auth";
import { useNavigate } from "react-router-dom";
import Heatmap from "../components/heatmap";
import { Piechart, Areachart, Barchart } from "../components/chart";
import try_avatar from "../images/try_avatar.svg";
import { Award, BookCheck, Flame } from "lucide-react";
import Footer from "../components/footer";

function Dashboard() {
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

  const pie = 2;
  const value_heat = user?.calender;
  const data_area = user?.data_area;
  const data_bar = user?.data_bar;
  const scrollRef = useRef(null);

  useEffect(() => {
    const box = scrollRef.current;
    if (box) {
      box.scrollLeft = box.scrollWidth;
    }
  }, []);

  return (
    <div className="bg-muted">
      <div
        id="maindash"
        className="grid grid-rows-2 sm:grid-rows-5 gap-2 sm:h-svh h-[1300px] p-4"
      >
        <div
          id="panelone"
          className="w-full sm:row-span-3 grid-rows-3 grid sm:grid-cols-3 gap-2"
        >
          <div
            id="profiles"
            className="row-span-1 sm:row-span-3 bg-card flex items-center justify-center gap-2 flex-col p-2 rounded-xl"
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
          <div className="row-span-2 sm:row-span-3 sm:col-span-2 grid grid-rows-5 gap-2">
            <div className="row-span-3 grid grid-cols-5 gap-2">
              <div className="col-span-2 grid grid-rows-2 gap-2">
                <div
                  id="streaks"
                  className="bg-card flex justify-evenly items-center flex-col p-2 rounded-xl"
                >
                  <h1 className="font-degular text-white text-[3.5vw] sm:text-[2vw] flex items-center gap-[4px]">
                    Streaks
                    <Flame className="size-[3.5vw] sm:size-[2vw]" />
                  </h1>
                  <div className="grid text-gray-400 grid-cols-2 gap-[3vw] font-jetsbrain text-[2.5vw] sm:text-[1.2vw]">
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
                <div
                  id="badges"
                  className="bg-card flex justify-evenly items-center flex-col p-2 rounded-xl"
                >
                  <h1 className="font-degular text-white text-[3.5vw] sm:text-[2vw] flex items-center gap-[4px]">
                    Badges
                    <Award className="size-[3.5vw] sm:size-[2vw]" />
                  </h1>
                  <div className="font-jetsbrain  text-gray-400 text-[2.3vw] sm:text-[1.1vw]">
                    No badges earned
                  </div>
                </div>
              </div>
              <div className="col-span-3 bg-card p-2 pt-1 sm:pb-6 flex flex-col justify-evenly items-center rounded-xl">
                <div className="flex items-center justify-center">
                  <h1 className="font-degular text-accent-foreground text-[3.7vw] sm:text-[2vw] flex items-center gap-[4px]">
                    Tasks <BookCheck className="size-[3.5vw] sm:size-[2vw]" />
                  </h1>
                </div>
                <div className="flex sm:flex-row flex-col gap-[3.5vw] md:gap-[10vw]  pt-0 justify-around items-center">
                  <Piechart />
                  <div className="flex items-center gap-[10px] text-[2.5vw] sm:text-[1.1vw] font-semibold justify-around sm:flex-col">
                    <div className="p-2 rounded-xl bg-[#E38627]">
                      Easy - {pie}
                    </div>
                    <div className="p-2 rounded-xl bg-[#C13C37]">
                      Med. - {pie}
                    </div>
                    <div className="p-2 rounded-xl bg-[#6A2135]">
                      Hard - {pie}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="heatman"
              className="row-span-2 h-full bg-card flex flex-col justify-center p-2 items-center rounded-xl"
            >
              <div className="font-degular w-[80vw] sm:w-[55vw] text-accent-foreground text-[3.5vw] sm:text-[1.5vw] text-left">
                <h1>Year at a Glance</h1>
              </div>
              <div
                ref={scrollRef}
                className="w-[80vw] sm:w-[55vw] flex items-center pb-1 overflow-auto"
              >
                <Heatmap />
              </div>
            </div>
          </div>
        </div>
        <div id="paneltwo" className="sm:row-span-2 grid sm:grid-cols-2 gap-2">
          <div className="bg-card rounded-xl flex justify-around items-start flex-col pt-3">
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
          <div className="bg-card rounded-xl flex justify-around items-start flex-col pt-3">
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
      <Footer />
    </div>
  );
}

export default Dashboard;
