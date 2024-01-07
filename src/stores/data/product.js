import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStoreF } from "../helpers/api";

export const useProductStore = defineStore("product", () => {
  const product = ref({});

  const getAllProducts = async () => {
    let res=await api.getAxis({
        url:'product',
  })
  if(res.status===200){
    product.value=[...res.data]
  }
  };
});
