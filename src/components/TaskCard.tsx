import React from "react";
import { Task } from "./ShowTask";
import { format } from "date-fns";

type TaskCardProps = {
  task: Task;
  onStart: (taskId: React.Key | null | undefined) => void;
  onComplete: (taskId: React.Key | null | undefined) => void;
  onDelete: (taskId: React.Key | null | undefined) => void;
};

const TaskCard = ({ task, onStart, onComplete, onDelete }: TaskCardProps) => {
  const formattedCreatedAt = format(
    new Date(task.createdAt),
    "MM/dd/yyyy HH:mm:ss"
  );

  return (
    <div className="bg-gray-100 rounded p-8 ">
      <div className="card ">
        <div className="card-body">
          <h2 className="card-title my-4 font-serif text-xl">
            {task.taskName}
          </h2>
          <p className="card-text mb-5 ">{task.description}</p>
          <p className="card-text mb-2">status: {task.status}</p>
          <p className="card-text mb-6">Created at: {formattedCreatedAt}</p>

          <div className="space-y-2 sm:space-y-0 lg:flex lg:flex-row flex flex-col gap-2 justify-between ">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => onStart(task._id)}
            >
              Start
            </button>
            <button
              className="bg-transparent  sm:mx-0 sm:my-2 hover:bg-green-700 text-green-700  hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              onClick={() => onComplete(task._id)}
            >
              Complete
            </button>
            <button
              className="bg-transparent hover:bg-red-500 text-red-700  hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
