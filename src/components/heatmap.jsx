import React from "react";
import HeatMap from "@uiw/react-heat-map";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

//fix tootip

function Heatmap({ values }) {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );
  return (
    <div className="">
      <HeatMap
        style={{
          display: "block",
          margin: "0 auto",
          paddingLeft: "10px",
          color: "#bdbdbd",
          "--rhm-rect-active": "grey",
        }}
        rectSize={11}
        legendCellSize={0}
        startDate={startDate}
        endDate={today}
        value={values}
        width={740}
        height={110}
        weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
        panelColors={{
          0: "#393939",
          3: "#005540",
          6: "#00aa80",
          9: "#00ffc0",
        }}
        rectProps={{ rx: 2 }}
        rectRender={(props, data) => {
          const options = { year: "numeric", month: "long", day: "numeric" };
          const dateStr = data.date
            ? new Date(data.date).toLocaleDateString("en-IN", options)
            : "N/A";
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <rect {...props} />
              </TooltipTrigger>
              <TooltipContent side="top">
                {`${data.count || 0} pomos on ${dateStr}`}
              </TooltipContent>
            </Tooltip>
          );
        }}
      />
    </div>
  );
}

export default Heatmap;
