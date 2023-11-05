import React from "react";
import { Task } from "./ShowTask";
import { format } from "date-fns";

type TaskCardProps = {
  task: Task;
  onStart: (taskId: React.Key | null | undefined) => void;
  onComplete: (taskId: React.Key | null | undefined) => void;
  onDelete: (taskId: React.Key | null | undefined) => void;
  onUpdate: (taskId: React.Key | null | undefined) => void;
};

const TaskCard = ({
  task,
  onStart,
  onComplete,
  onDelete,
  onUpdate,
}: TaskCardProps) => {
  const formattedCreatedAt = format(
    new Date(task.createdAt),
    "MM/dd/yyyy HH:mm:ss"
  );

  const isOngoing = task.status === "ongoing";
  const isCompleted = task.status === "completed";
  const startButtonDisabled = isOngoing || isCompleted;
  const allButtonsDisabled = isCompleted;

  return (
    <div className="bg-gray-100 rounded p-8 relative">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title my-4 font-serif text-xl">
            {task.taskName}
          </h2>
          <p className="card-text mb-5 ">{task.description}</p>
          <p className="card-text mb-2">Status: {task.status}</p>
          <p className="card-text mb-6">Created at: {formattedCreatedAt}</p>

          <div className="space-y-2 sm:space-y-0 lg:flex lg:flex-row flex flex-col gap-2 justify-between">
            <button
              className={`bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
                startButtonDisabled ? "cursor-not-allowed bg-gray-400" : ""
              }`}
              onClick={() => onStart(task._id)}
              disabled={startButtonDisabled}
            >
              Start
            </button>
            <button
              className={`bg-transparent sm:mx-0 sm:my-2 hover:bg-green-700 text-green-700 hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded ${
                allButtonsDisabled ? "cursor-not-allowed bg-gray-400" : ""
              }`}
              onClick={() => onComplete(task._id)}
              disabled={allButtonsDisabled}
            >
              Complete
            </button>
            <button
              className={`bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded ${
                allButtonsDisabled ? "cursor-not-allowed bg-gray-400" : ""
              }`}
              onClick={() => onDelete(task._id)}
              disabled={allButtonsDisabled}
            >
              Delete
            </button>
          </div>

          <button
            className={`absolute top-2 right-2 cursor-pointer ${
              allButtonsDisabled ? "cursor-not-allowed" : ""
            }`}
            onClick={() => onUpdate(task._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
