import React, { useState } from "react";
import {
  useDeleteTaskMutation,
  useGetAllTasksByUserQuery,
  useMarkTaskAsCompletedMutation,
  useMarkTaskAsOngoingMutation,
} from "@/redux/api/taskApi";
import { getUserInfo } from "@/services/auth.service";
import TaskCard from "./TaskCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Task = {
  isOngoing: any;
  isCompleted: any;
  _id: string;
  taskName: string;
  description: string;
  createdAt: string;
  status: string; 
};

const ShowTask = () => {
  const { data: tasks, isLoading } = useGetAllTasksByUserQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 2000,
    }
  );

  const [ongoing] = useMarkTaskAsOngoingMutation();
  const [completed] = useMarkTaskAsCompletedMutation();
  const [remove] = useDeleteTaskMutation();

  const [statusFilter, setStatusFilter] = useState("all");

  const onStart = async (taskId: React.Key | null | undefined | string) => {
    try {
      const res = await ongoing(taskId);
      if (res) {
        toast.success("Your task is started");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onComplete = async (taskId: React.Key | null | undefined | string) => {
    try {
      const res = await completed(taskId);
      if (res) {
        toast.success("Your task is now completed!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onDelete = async (taskId: React.Key | null | undefined | string) => {
    try {
      const res = await remove(taskId);
      if (res) {
        toast.success("Your task is deleted!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filterTasksByStatus = (status: string) => {
    return tasks.filter((task: Task) => task.status === status);
  };

  return (
    <div>
      <div className="btn-group mx-auto my-8 grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row flex-col justify-center gap-2">
        {["All", "Pending", "Ongoing", "Completed"].map((status) => (
          <button
            key={status}
            className={`${
              statusFilter.toLowerCase() === status.toLowerCase()
                ? "bg-blue-500 text-white"
                : "bg-transparent hover:bg-black text-black hover:text-white"
            } text-lg py-2 px-4 border border-blue-50 hover:border-transparent rounded font-serif`}
            onClick={() => setStatusFilter(status.toLowerCase())}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {isLoading
          ? "Loading..."
          : statusFilter === "all"
          ? tasks.map((task: Task) => (
              <div key={task._id}>
                <TaskCard
                  task={task}
                  onStart={() => onStart(task._id)}
                  onComplete={() => onComplete(task._id)}
                  onDelete={() => onDelete(task._id)}
                />
              </div>
            ))
          : filterTasksByStatus(statusFilter).map((task: Task) => (
              <div key={task._id}>
                <TaskCard
                  task={task}
                  onStart={() => onStart(task._id)}
                  onComplete={() => onComplete(task._id)}
                  onDelete={() => onDelete(task._id)}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default ShowTask;
