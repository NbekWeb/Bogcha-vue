<template>
  <div class="main">
    <headerLayout />
    <div class="wrapper">
      <sideVue />
      <div class="content">
      <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import headerLayout from "@/components/layout/header.vue";
import sideVue from "@/components/layout/aside.vue";
</script>
<style lang="scss">
@import "../styles/layout/main.scss";
</style>
