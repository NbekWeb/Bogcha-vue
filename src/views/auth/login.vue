<template lang="">
    <div class="reg">
        <h3 class="title">Tizimga kirish</h3>
      <el-form
        ref="regForm"
        :model="user"
        :rules="rules"
        label-position="top"
        @submit.prevent="toLogin"
      >
        <el-form-item label="Loginni kiriting" prop="login">
          <el-input v-model="user.login" />
        </el-form-item>
        <el-form-item label="Parolni kiriting" prop="password">
          <el-input
            v-model="user.password"
            type="password"
            show-password
          />
        </el-form-item>
        <router-link to="/reg">Ro'yxatdan o'tish</router-link>
        <el-button type="success" @click="toLogin"> Kirish </el-button>
      </el-form>
    </div>
  </template>
  <script setup>
  import { ref } from "vue";
  import cookie from "vue-cookies";
  import { useAuthStore } from "@/stores/user/auth";
  
  const user = ref({});
  const regForm = ref();
  const authStore = useAuthStore();
  const rules = ref({
    login: [
      {
        required: true,
        message: "Maydonni to'ldiring",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "Parolni kiriting",
        trigger: "blur",
      },
      {
        min: 5,
        max: 15,
        message: "Eng kami 5ta simvol kiriting",
        trigger: "blur",
      },
    ],
  });
  
  const toLogin = async () => {
    if (!regForm) return;
    await regForm.value.validate((valid, fields) => {
      if (valid) {
        authStore.login({ login: user.value.login, password: user.value.password });
      } else {
        console.log("error submit!", fields);
      }
    });
  };
  </script>
  <style lang=""></style>
  