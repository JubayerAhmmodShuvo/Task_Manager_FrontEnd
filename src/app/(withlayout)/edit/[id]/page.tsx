"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useGetTaskByIdQuery, useUpdateTaskMutation } from "@/redux/api/taskApi";
import FormTextArea from "@/components/Forms/FormTextArea";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "@/schemas/task";

type IDProps = {
  params: any;
};

const EditTask = ({ params }: IDProps) => {
  const { id } = params;
  const router = useRouter();
  const [updatedTask, setUpdatedTask] = useState(null);

  const { data: task } = useGetTaskByIdQuery(id);

  const [update] = useUpdateTaskMutation();

  const TaskData = updatedTask || task;
  
  const defaultValues = {
    taskName: TaskData?.taskName || "",
    description: TaskData?.description || "",
  };

   const onSubmit = async (values: any) => {
   
     try {
       const res = await update({
         id: id,
         body: values,
       }).unwrap();
     
       if (res?._id) {
         setUpdatedTask(res);
         toast.success("Task Successfully Updated!");
         router.push("/home");
       }
     } catch (err: any) {
    
      toast.error(err.message || "Failed to update task");
     }
   };
  return (
    <div>
      <div className="mt-6 border-2 rounded">
        <h1 className="text-2xl text-center text-violet-700 font-bold my-6">
          Update Task
        </h1>
        <div className="mb-6 lg:w-96 mx-auto px-3">
          <Form
            submitHandler={onSubmit}
            defaultValues={defaultValues}
            resolver={yupResolver(taskSchema)}
          >
            <div className="mb-4 ">
              <FormInput
                name="taskName"
                type="text"
                size="large"
                label="Task Name"
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
              className="text-black cursor-pointer hover:bg-violet-600 hover:text-white bg-transparent hover-bg-violet-700 flex justify-center mx-auto items-center font-semibold hover-text-white py-2 px-4 border border-blue-500 hover-border-transparent rounded"
              type="submit"
            >
              Update
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
