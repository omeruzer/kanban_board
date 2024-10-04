import axios from "axios";
import { URL } from "./url";
import { CreateTask, UpdateTask } from "../types/Task/task.type";

const TaskApi = () => ({
  all() {
    return axios.get(`${URL.task}`);
  },
  detail(id: string) {
    return axios.get(`${URL.task}/${id}`);
  },
  statusList(status: string) {
    return axios.get(`${URL.taskStatus}?status=${status}`);
  },
  create(body: CreateTask) {
    return axios.post(`${URL.task}`, body);
  },
  edit(id: string, body: UpdateTask) {
    return axios.put(`${URL.task}/${id}`, body);
  },
  remove(id: string) {
    return axios.delete(`${URL.task}/${id}`);
  },
});

export const taskApi = TaskApi();
