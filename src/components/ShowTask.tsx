import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;

  useEffect(() => {
    if (tasks) {
      paginate(1);
    }
  }, [tasks]);

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

  const onUpdate = (taskId: React.Key | null | undefined | string) => {
    router.push(`edit/${taskId}`);
  };

  const filterTasksByStatus = (status: string) => {
    return tasks.filter((task: Task) => task.status === status);
  };

  const filteredTasks = tasks?.filter((task: Task) => {
    const matchesSearch = task.taskName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (statusFilter === "all") {
      return matchesSearch;
    } else {
      return task.status.toLowerCase() === statusFilter && matchesSearch;
    }
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks =
    filteredTasks?.slice(indexOfFirstTask, indexOfLastTask) || [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="lg:flex lg:flex-row justify-between items-center">
        <div className="md:flex  justify-between items-center my-8">
          <div className="md:btn-group grid md:grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row flex-col gap-2">
            {["All", "Pending", "Ongoing", "Completed"].map((status) => (
              <button
                key={status}
                className={`${
                  statusFilter.toLowerCase() === status.toLowerCase()
                    ? "bg-rose-400 text-white"
                    : "bg-transparent hover:bg-red-200 text-black hover:text-black"
                } text-lg py-2 px-4 border border-blue-50 hover:border-transparent rounded font-serif`}
                onClick={() => setStatusFilter(status.toLowerCase())}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="md:mb-4 mb-4">
          <input
            type="text"
            placeholder="Search by Task Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96 py-3 px-3 text-sm rounded-md border border-gray-200"
          />
        </div>
      </div>

      <div className="flex justify-center my-6">
        {Array(Math.ceil((filteredTasks?.length || 0) / tasksPerPage))
          .fill(0)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "bg-red-200 text-black"
                  : "bg-transparent hover-bg-black text-black hover:text-white"
              } px-3 py-2 mx-1 border  rounded-full`}
            >
              {index + 1}
            </button>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {isLoading
          ? "Loading..."
          : currentTasks.map((task: Task) => (
              <div key={task._id}>
                <TaskCard
                  task={task}
                  onStart={() => onStart(task._id)}
                  onComplete={() => onComplete(task._id)}
                  onDelete={() => onDelete(task._id)}
                  onUpdate={() => onUpdate(task._id)}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default ShowTask;
