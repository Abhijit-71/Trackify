import React from "react";
import { TaskManagerForm, TaskTable } from "../components/tasktable";

function TaskPage() {
  return (
    <div className="flex items-center justify-center bg-background p-4 sm:p-6">
      <div className="p-4 sm:p-8 grid grid-rows-none grid-cols-1 md:grid-cols-5 gap-4 w-full ">
        {/* Data Table Section */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 md:col-span-3">
          <TaskTable />
        </div>

        {/* Task Manager Form Section */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 md:col-span-2">
          <TaskManagerForm />
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
