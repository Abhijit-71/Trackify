import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Heatmap from "../components/heatmap";
import { Piechart, Areachart, Barchart } from "../components/chart";
import try_avatar from "../images/try_avatar.svg";
import { Award, BookCheck, Flame } from "lucide-react";
import Footer from "../components/footer";
import { AuthWatcher, useAuth } from "./authContext";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "../components/sidepanel";

function Dashboard() {
  const[user,setUser] = useState(null)
  const {loginAction} = useAuth();
  

   useEffect(() => {
    const fetchData = async () => {
      const axiosInstance = await loginAction(); // ensures token is refreshed if needed

      try {
        const response = await axiosInstance.get('profile/');
        
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  const pie = user?.pie || {
        "no_pomo": 6,
        "L": 0,
        "M": 3,
        "H": 2
    };
  const value_heat = user?.calender || [
        {
            "date": "2025-06-28",
            "count": 1
        },
        {
            "date": "2025-07-06",
            "count": 3
        },
        {
            "date": "2025-07-10",
            "count": 0
        },
        {
            "date": "2025-07-11",
            "count": 1
        },
        {
            "date": "2025-07-12",
            "count": 4
        },
        {
            "date": "2025-07-17",
            "count": 0
        },
        {
            "date": "2025-07-21",
            "count": 0
        },
        {
            "date": "2025-07-24",
            "count": 0
        },
        {
            "date": "2025-07-28",
            "count": 0
        },
        {
            "date": "2025-08-01",
            "count": 0
        },
        {
            "date": "2025-08-03",
            "count": 0
        }
    ];
  const data_area = user?.data_area || {
        "Mon": 0,
        "Tue": 1,
        "Wed": 0,
        "Thu": 0,
        "Fri": 2,
        "Sat": 0,
        "Sun": 0
    };
  const data_bar = user?.data_bar || {
        "First": 0,
        "Second": 0,
        "Third": 0,
        "Fourth": 0,
        "Fifth": 4
    }
  const scrollRef = useRef(null);

  useEffect(() => {
    const box = scrollRef.current;
    if (box) {
      box.scrollLeft = box.scrollWidth;
    }
  }, []);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 text-accent-foreground" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
          </header>
          <div className="bg-background">
            
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
                    <h1 className="font-degular text-card-foreground h-1/6 text-[4vw] sm:text-[2vw]">
                      {user?.username || "User"}
                    </h1>
                    <p className="font-sans text-gray-400 font-normal text-[2vw] sm:text-[1vw]">
                      {user?.email || "non@gmail.com"}
                    </p>
                    <div className="grid grid-cols-3 w-3/4 text-card-foreground mt-3 text-[2.7vw] sm:text-[1.2vw] font-degular">
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
                    <p className="font-jetsbrain  text-card-foreground text-[2.3vw] sm:text-[1.1vw]">
                      bio is a very special block write your goals and aims
                      here.
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
                        <h1 className="font-degular text-card-foreground text-[3.5vw] sm:text-[2vw] flex items-center gap-[4px]">
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
                        <h1 className="font-degular text-card-foreground text-[3.5vw] sm:text-[2vw] flex items-center gap-[4px]">
                          Badges
                          <Award className="size-[3.5vw] sm:size-[2vw]" />
                        </h1>
                        <div className="font-jetsbrain  text-gray-400 text-[2.3vw] sm:text-[1.1vw]">
                          No badges earned
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 bg-card h-full w-full p-2 pt-1 sm:pb-6 flex flex-col justify-evenly items-center rounded-xl">
                      <div className="flex items-center justify-center">
                        <h1 className="font-degular text-card-foreground text-[3.7vw] sm:text-[2vw] flex items-center gap-[4px]">
                          Tasks
                          <BookCheck className="size-[3.5vw] sm:size-[2vw]" />
                        </h1>
                      </div>
                      <div className="flex w-full sm:flex-row flex-col gap-[3.5vw] md:gap-[1vw] pt-0 justify-around items-center">
                        <Piechart data_pie={pie} />
                        <div className="flex items-center gap-[10px] text-[2.3vw] sm:text-[12px] font-semibold justify-around sm:flex-col">
                          <div className="p-2 rounded-xl bg-[#E38627]">
                            Low - {pie.L}
                          </div>
                          <div className="p-2 rounded-xl bg-[#C13C37]">
                            Med. - {pie.M}
                          </div>
                          <div className="p-2 rounded-xl bg-[#6A2135]">
                            High - {pie.H}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="heatman"
                    className="row-span-2 h-full bg-card flex flex-col w-full justify-center p-2 items-center rounded-xl overflow-hidden"
                  >
                    <div className="text-card-foreground font-degular">
                      <h1>Year at a Glance </h1>
                    </div>
                    <div className="overflow-x-auto w-[85%]" ref={scrollRef}>
                      <Heatmap values={value_heat} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="paneltwo"
                className="sm:row-span-2 grid sm:grid-cols-2 gap-2"
              >
                <div className="bg-card rounded-xl flex justify-around items-start flex-col pt-3">
                  <div className="text-card-foreground flex flex-col items-start ml-[10%]">
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
                  <div className="text-card-foreground flex flex-col items-start ml-[10%]">
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
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Dashboard;
