<template>
  <HeadPage :title="title" />
  <PriceProdDialog :title="title" :id="id" />
  <PriceProdTable  @edit="edit" />
</template>
<script setup>
import PriceProdDialog from "@/components/dialog/priceProdDialog.vue";
import PriceProdTable from "./priceProdTable.vue";
import HeadPage from "@/components/useful/headPage.vue";

import { usePriceProdStore } from "@/stores/data/priceProd";
import { ref, onMounted } from "vue";

const store = usePriceProdStore();

const title = ref("Mahsulot narxi");

const id = ref("");
const edit = (val) => {
  id.value = val;
};

onMounted(() => {
  store.getAllPriceProds();
});
</script>
<style lang=""></style>
