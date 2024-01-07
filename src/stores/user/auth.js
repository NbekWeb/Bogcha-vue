import { defineStore } from "pinia";
import { ref } from "vue";
import cookie from "vue-cookies";
import router from "@/router";
import { useApiStore } from "../helpers/api";
import { ElMessage } from "element-plus";
import { useTokenStore } from "./token";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({});
  const tokenStore = useTokenStore();
  const apiStore = useApiStore();

  const setUser = (payload) => {
    cookie.set("bocha-user", payload);
    user.value = payload;
  };

  const registration = async (payload) => {
    let res = await apiStore.postAxios({
      url: "auth/reg",
      data: payload,
    });
    console.log(res.data);
    if (res.status === 201) {
      ElMessage({
        type: "success",
        message:
          "Muvafaqqiyatli ro'yxatdan o'tdingiz.Iltimos tizimga login,parolingiz bilan kiring!",
      });

      router.push({ name: "login" });
    }
  };

  const login = async (payload) => {
    let res = await apiStore.postAxios({
      url: "auth/login",
      data: payload,
    });
    if (res.status === 200) {
      console.log(res.da);
      setUser(res.data);
      tokenStore.setToken(res.data.token);
      router.push({ name: "dashboard" });
    }
  };

  const checkUser = async () => {
    if (cookie.isKey("bogcha-token")) {
      tokenStore.setToken(cookie.get("bogcha-token"));
    }
    let res = await apiStore.getAxios({
      url: "auth/checkuser",
    });
    if (res.status === 200) {
      console.log(res.data);
    }
  };

  const checkLogin = async (data) => {
    return await apiStore.postAxios({
      url: "auth/checkLogin",
      data,
    });
  };
  return {
    login,
    registration,
    user,
    checkUser,
    checkLogin,
  };
});
