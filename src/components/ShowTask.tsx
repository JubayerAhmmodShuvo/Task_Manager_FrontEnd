import React, { useState } from "react";
import { useGetAllTasksByUserQuery } from "@/redux/api/taskApi";
import { getUserInfo } from "@/services/auth.service";
import TaskCard from "./TaskCard";

export type Task = {
  isOngoing: any;
  isCompleted: any;
  id: string;
  taskName: string;
  description: string;
  createdAt: string;
  status: string;
};

const ShowTask = () => {
  const { id: userId } = getUserInfo() as any;
  const { data: tasks, isLoading } = useGetAllTasksByUserQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 2000,
    }
  );

  const [statusFilter, setStatusFilter] = useState("all");

  const onStart = (taskId: React.Key | null | undefined) => {
    // Implement your onStart logic here
  };

  const onComplete = (taskId: React.Key | null | undefined) => {
    // Implement your onComplete logic here
  };

  const onDelete = (taskId: React.Key | null | undefined) => {
    // Implement your onDelete logic here
  };

  return (
    <div>
      <div className="btn-group">
        <button
          className={`${
            statusFilter === "all"
              ? "bg-blue-500 text-white"
              : "bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white"
          } font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
          onClick={() => setStatusFilter("all")}
        >
          All
        </button>
        <button
          className={`${
            statusFilter === "pending"
              ? "bg-blue-500 text-white"
              : "bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white"
          } font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
          onClick={() => setStatusFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`${
            statusFilter === "ongoing"
              ? "bg-blue-500 text-white"
              : "bg-transparent hover-bg-blue-500 text-blue-700 hover:text-white"
          } font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
          onClick={() => setStatusFilter("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`${
            statusFilter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white"
          } font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
          onClick={() => setStatusFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {isLoading
          ? "Loading..."
          : tasks
              .filter((task: Task) => {
                if (statusFilter === "all") return true;
                if (statusFilter === "pending")
                  return !task.isOngoing && !task.isCompleted;
                if (statusFilter === "ongoing") return task.isOngoing;
                if (statusFilter === "completed") return task.isCompleted;
                return true;
              })
              .map((task: Task) => (
                <div key={task.id}>
                  <TaskCard
                    task={task}
                    onStart={() => onStart(task.id)}
                    onComplete={() => onComplete(task.id)}
                    onDelete={() => onDelete(task.id)}
                  />
                </div>
              ))}
      </div>
    </div>
  );
};

export default ShowTask;
