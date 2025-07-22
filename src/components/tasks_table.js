import React , { useState } from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

function Tasktable({taskData}) {
  //data from api
  const [tasks, setTasks] = useState([
    { id: 1, level: 1, title: "dolais are very dois", status: 1, description: "2", pomo: 1 },
    { id: 2, level: 2, title: "another task", status: 0,description: "2", pomo: 2 },
    { id: 3, level: 1, title: "dolais are very dois",description: "2", status: 1, pomo: 1 },
    { id: 4, level: 2, title: "another task", status: 0,description: "2", pomo: 2 },
    { id: 5, level: 1, title: "dolais are very dois",description: "2", status: 1, pomo: 1 },
    { id: 6, level: 2, title: "another task", status: 0,description: "2", pomo: 2 },
    { id: 7, level: 1, title: "dolais are very dois",description: "2", status: 1, pomo: 1 },
    { id: 8, level: 2, title: "another task", description: "2",status: 0, pomo: 2 },
  ])
  
  //maps status of api
  const isComplete=(val)=>{
    if (val == true) {
      return "Done"
    } else {
      return "Pending"
    }
  }
  
  //checkbox and datasending to pomo.js
  const [checkedState, setCheckedState] = useState(
    new Array(tasks.length).fill(false)
  );
  const handleChange = (id,title,description) => (event) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === id-1 ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const sendData = (data) => {
      const result = data;
      taskData(result);
    };
    sendData([id,title,description])
  };
  const hasAnyChecked = checkedState.some(Boolean);

return (
    <div className='h-2/3 w-5/6 overflow-x-auto overflow-y-auto rounded'>
      <Table className='w-full h-full bg-stone-800 text-xs' hoverable>
        <TableHead className='text-nowrap sticky top-0 z-10 '>
          <TableRow>
            <TableHeadCell>Id</TableHeadCell>
            <TableHeadCell>Select</TableHeadCell>
            <TableHeadCell>Level</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>No. of pomo</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className='text-nowrap'>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className='p-6'> {task.id}</TableCell>
              <TableCell className='p-6'><input type="checkbox" disabled={hasAnyChecked && !checkedState[task.id-1]} checked={checkedState[task.id-1]} onChange={handleChange(task.id,task.title,task.description)}/></TableCell>
              <TableCell>{task.level}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{isComplete(task.status)}</TableCell>
              <TableCell>{task.pomo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Tasktable
