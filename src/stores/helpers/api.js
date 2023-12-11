import axios from "axios";
import { defineStore } from "pinia";
import { useHElperStore } from ".";
import { useTokenStore } from "../user/token";
import { ElMessage } from "element-plus";
import router from "@/router";

export const useApiStore = defineStore("api", () => {
  const helperStore = useHElperStore();
  const { url } = helperStore;

  const tokenStore = useTokenStore();
  const { header ,token} = tokenStore;
  const getAxios = (payload) => {
    console.log(payload);
    return axios
      .get(`${url}/${payload.url}`, {
      headers:header,
  })
      .catch((e) => {
        ElMessage({
          type: "error",
          message: e.response.data?.messsage,
        });
        if (e.response.status === 401) {
          console.log('dabba');
          router.push({ name: "login" });
        }
      });
  };

  const postAxios = (payload) => {
    return axios
      .post(`${url}/${payload.url}`, payload.data, {
        headers: { ...header },
      })
      .catch((e) => {
        ElMessage({
          type: "error",
          message: e.response.data?.message,
        });
      });
  };

  const putAxios = (payload) => {
    return axios
      .put(`${url}/${payload.url}`, payload.data, {
        headers: { ...header },
      })
      .catch((e) => {
        ElMessage({
          type: "error",
          message: e.response.data?.message,
        });
      });
  };

  const deleteAxios = (payload) => {
    return axios
      .delete(`${url}/${payload.url}`, {
        headers: { ...header },
      })
      .catch((e) => {
        ElMessage({
          type: "error",
          message: e.response.data?.message,
        });
      });
  };
  return {
    getAxios,
    postAxios,
    putAxios,
    deleteAxios,
  };
});
