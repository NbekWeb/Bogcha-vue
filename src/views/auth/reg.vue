<template lang="">
  <div class="reg">
    <h3 class="title">Ro'yxatdan o'tish</h3>
    <el-form
      ref="regForm"
      :model="user"
      :rules="rules"
      label-position="top"
      @submit.prevent="regis"
    >
      <el-form-item label="Loginni kiriting" prop="login">
        <el-input v-model="user.login"
         @blur="loginCheck"
          />
      </el-form-item>
      <el-form-item label="Parolni kiriting" prop="password">
        <el-input v-model="user.password" type="password" show-password />
      </el-form-item>
      <router-link to="/login">Ro'yxatdan o'tganmisiz</router-link>
      <el-button 
       type="success" 
       @click="regis"
       :disabled="status"
      > Kirish </el-button>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/user/auth";
import { ElMessage } from "element-plus";

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

const regis = async () => {
  if (!regForm) return;
  await regForm.value.validate((valid, fields) => {
    if (valid) {
      authStore.registration({
        login: user.value.login,
        password: user.value.password,
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const loginCheck = async () => {
  let res = await authStore.checkLogin({
    login: user.value.login,
  });
  if (res.status == 200) {
    if(res.data=='yes'){
      status.value = true;
      ElMessage({
        type:'warning',
        message: 'Bunday nomdagi foydalanuvchi mavjud!'
      })
    }
    else if(res.data=='no'){
      status.value = false;
    }
  }
};

const status=ref(false)
</script>
<style lang=""></style>
