"use client";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "@/components/FORMS/Form";
import FormInput from "@/components/FORMS/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { taskSchema } from "@/schemas/task";

type FormValues = {
  taskName: string;
  description: string;
};

const TaskPage = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Here you can perform any action you want with the task data
    console.log(data);

    // Show a success toast
    toast.success("Task added successfully!");
  };

  return (
    <div className="mt-6 border-2 rounded">
      <h1 className="text-2xl text-center text-violet-700 font-bold mb-4">
        Add a New Task
      </h1>
      <div className="mb-6 lg:w-96 mx-auto">
        <Form submitHandler={onSubmit} resolver={yupResolver(taskSchema)}>
          <div className="mb-4">
            <FormInput
              name="taskName"
              type="text"
              size="large"
              label="Task Name"
              required
              disabled={false}
              className="w-full py-2 px-3 bg-gray-100 text-lg rounded-md"
            />
          </div>
          <div className="mb-4">
            <FormTextArea
              name="description"
              label="Task Description"
              required
              rows={4}
              className="w-full py-2 px-3 bg-gray-100 text-lg rounded-md"
            />
          </div>
          <button
            className="text-black cursor-pointer bg-transparent hover:bg-violet-700 flex justify-center mx-auto items-center  font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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