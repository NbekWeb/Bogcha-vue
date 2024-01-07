<template>
    <HeadPage :title="title"/>
    <ProductDialog :title="title"/>
</template>
<script setup>
import  HeadPage from "@/components/useful/headPage.vue";
import ProductDialog from "@/components/dialog/productDialog.vue";
import {ref } from 'vue';

const title=ref("Mahsulot");
</script>
<style lang="scss">
    
</style>