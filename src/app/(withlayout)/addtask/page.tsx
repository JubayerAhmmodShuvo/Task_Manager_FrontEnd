"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormTextArea from "@/components/Forms/FormTextArea";
import { taskSchema } from "@/schemas/task";
import { useCreateTaskMutation } from "@/redux/api/taskApi";
import { getUserInfo } from "@/services/auth.service";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";

const TaskPage = () => {
  const userInfo = getUserInfo() as { id: string };
  const { id: user } = userInfo;
  const router = useRouter();
  const [task, { error }] = useCreateTaskMutation();

  const onSubmit = async (values: any) => {
    try {
      const taskData = {
        taskName: values.taskName,
        description: values.description,
        userId: user,
      };

      const res = await task(taskData).unwrap();

      if (res?._id) {
        toast.success("Task created successfully!");
      } else {
        toast.error("Task creation failed.");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="mt-6 border-2 rounded">
      <h1 className="text-2xl text-center text-violet-700 font-bold my-6">
        Add a New Task
      </h1>
      <div className="mb-6 lg:w-96 mx-auto px-3">
        <Form
          submitHandler={onSubmit}
          defaultValues={{ taskName: "", description: "" }}
          resolver={yupResolver(taskSchema)}
        >
          <div className="mb-4 ">
            <FormInput
              name="taskName"
              type="text"
              size="large"
              label="Task Name"
              required
              disabled={false}
              className="w-full py-2 px-3 bg-gray-50 text-sm font-serif rounded-md"
            />
          </div>
          <div className="mb-4">
            <FormTextArea
              name="description"
              label="Task Description"
              required
              rows={4}
              className="w-full py-2 px-3 bg-gray-50 text-sm font-serifrounded-md"
            />
          </div>
          <button
            className="text-black cursor-pointer bg-transparent hover-bg-violet-700 flex justify-center mx-auto items-center font-semibold hover-text-white py-2 px-4 border border-blue-500 hover-border-transparent rounded"
            type="submit"
          >
            Add Task
          </button>
        </Form>
      </div>
    </div>
  );
};

export default TaskPage;
