import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const TASK_URL = "/task";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateTask: build.mutation({
      query: (data) => ({
        url: `${TASK_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.task],
    }),

    createTask: build.mutation({
      query: (taskData) => ({
        url: TASK_URL,
        method: "POST",
        data: taskData,
      }),
      invalidatesTags: [tagTypes.task],
    }),

    markTaskAsOngoing: build.mutation({
      query: (taskId) => ({
        url: `${TASK_URL}/mark-ongoing/${taskId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.task],
    }),
    markTaskAsCompleted: build.mutation({
      query: (taskId) => ({
        url: `${TASK_URL}/mark-completed/${taskId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.task],
    }),
    getAllTasksByUser: build.query({
      query: () => ({
        url: `${TASK_URL}/`,
        method: "GET",
      }),
    }),
    getOngoingTasksByUser: build.query({
      query: () => ({
        url: `${TASK_URL}/ongoing`,
        method: "GET",
      }),
    }),
    getCompletedTasksByUser: build.query({
      query: () => ({
        url: `${TASK_URL}/completed`,
        method: "GET",
      }),
    }),
    deleteTask: build.mutation({
      query: (taskId) => ({
        url: `${TASK_URL}/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.task],
    }),
    getTaskById: build.query({
      query: (taskId) => ({
        url: `${TASK_URL}/${taskId}`, 
        method: "GET", 
      }),
    }),
  }),
});

export const {
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useMarkTaskAsOngoingMutation,
  useMarkTaskAsCompletedMutation,
  useGetAllTasksByUserQuery,
  useGetOngoingTasksByUserQuery,
  useGetCompletedTasksByUserQuery,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
} = taskApi;
