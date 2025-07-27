import React from 'react'
import { PieChart} from 'react-minimal-pie-chart';
import { AreaChart , XAxis , CartesianGrid , Area, Tooltip , BarChart ,Bar , ResponsiveContainer} from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="custom-tooltip" style={{ background: "#393939", border: "1px solid #ccc", padding: "8px", borderRadius: "4px" }}>
      <p className="text-white">{`${label}`}</p>
      {payload.map((entry, idx) => (
        <p key={idx} style={{ color: entry.color || "#333", margin: 0 }}>
          {`${entry.name || "Value"}: ${entry.value}`}
        </p>
      ))}
    </div>
  );
};




function Piechart() {
  return (
    <div className='size-[25vw] sm:size-[20vw] md:size-[11vw]'>
      <PieChart
        className='w-full h-full'
        data={[
          { title: 'One', value: 50, color: '#E38627',total:70  },]}
        viewBoxSize={[200,200]}
        radius={100}
        center={[100,100]}
        lineWidth={40}
        rounded={true}
        animate={true}
        animationDuration={1000}
        totalValue={70}
        background='#393939'
        labelPosition={0}
        label={({ dataEntry }) => `${dataEntry.value}/${dataEntry.total}`}
        labelStyle={{fontSize : "min(6vw,3vh)",fontFamily : "Segoe UI",fill : "#E38627",fontWeight:"bold"}}
      />
    </div>
  )
}






function Areachart({data}){
  //map data to format 
  let data_area = []
  for (let key in data) {
    data_area.push({name:key,pomo:data[key]});}

  return(
    <div className= 'h-full w-full flex justify-around items-center'>
      <ResponsiveContainer width="90%" height="80%">
        <AreaChart data={data_area} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
          <defs>
            <linearGradient id="graph" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ffc0" stopOpacity={0.8}/>
              <stop offset="98%" stopColor="00ffc0" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke='#383838' />
          <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} tick={{fill:'#BDBDBD'}}/>
          <Tooltip cursor={false} content={CustomTooltip}/>
          <Area type="monotone" dataKey="pomo" stroke="#00d4a0" fillOpacity={1} fill="url(#graph)" />
        </AreaChart>
      </ResponsiveContainer>
      			
    </div>
  )  
}






function Barchart({data}){
//parse the data by mapping
  let data_bar = []
  for (let key in data) {
    data_bar.push({week:key,tasks:data[key],left:10-data[key]});}

  return(
    <div className='h-full w-full flex items-center justify-around'>
      <ResponsiveContainer width="80%" height="80%">
        <BarChart data={data_bar} margin={{ top: 0, right: 25, left: 25, bottom: 0 }}>
          <CartesianGrid vertical={false}  stroke='#383838'/>
          <Bar dataKey="tasks" barSize={40} fill='#00f4b8' radius={[0,0,4,4]} stackId={"a"} />
          <Bar dataKey="left" barSize={40} fill='#393939' radius={[4,4,0,0]} stackId={"a"}/>
          <XAxis dataKey="week" tickLine={false} tickMargin={10} axisLine={false} tick={{fill:'#BDBDBD'}}/>
          <Tooltip cursor={false} content={CustomTooltip}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}



export  {Piechart,Areachart,Barchart}
