import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStore } from "../helpers/api";
import { ElMessage } from "element-plus";

export const usePriceProdStore = defineStore("priceProd", () => {
  const priceProds = ref([]);

  const api = useApiStore();

  // Get all priceProds
  const getAllPriceProds = async () => {
    try {
      const res = await api.getAxios({
        url: "priceProd",
      });
      if (res.status === 200) {
        priceProds.value = [...res.data.priceProducts];
      }
    } catch (error) {
      console.error("Error fetching priceProds:", error);
    }
  };

  // Add new priceProd
  const newPriceProd = async (data) => {
    try {
      if (
        priceProds.value.every((priceProd) => priceProd.title !== data.title)
      ) {
        const res = await api.postAxios({
          url: "priceProd",
          data,
        });
        priceProds.value = [res.data, ...priceProds.value];
        ElMessage.success("Mahsulot qo'shildi");
      } else {
        ElMessage.error("Bu mahsulot oldinroq qo'shilgan!");
      }
    } catch (error) {
      console.error("Error adding new priceProd:", error);
    }
  };

  // Get one priceProd
  const getPriceProd = async (_id) => {
    try {
      return await api.getAxios({
        url: `priceProd/${_id}`,
      });
    } catch (error) {
      console.error("Error fetching priceProd:", error);
    }
  };

  // Change priceProd

  const savePriceProd = async (data) => {
    try {
      const res = await api.putAxios({
        url: `priceProd/${data._id}`,
        data,
      });
      console.log("sa", priceProds.value);
      priceProds.value = priceProds.value.map((priceProd) => {
        console.log(priceProd._id);
        if (priceProd._id === res.data._id) {
          return res.data;
        }
        return priceProd;
      });
      ElMessage({
        type: "success",
        message: "Mahsulot narxi yangilandi",
      });
    } catch (error) {
      console.error("Error saving priceProd:", error);
    }
  };

  // Delete priceProd
  const deletePriceProd = async (_id) => {
    try {
      await api.deleteAxios({ url: `priceProd/${_id}` });
      priceProds.value = priceProds.value.filter(
        (priceProd) => priceProd._id !== _id
      );
      ElMessage.success("Mahsulot narxi muvaffaqiyatli o'chirildi");
    } catch (error) {
      console.error("Error deleting priceProd:", error);
    }
  };

  // Change status of priceProd
  const statusPriceProd = (_id) => {
    api.getAxios({ url: `priceProd/change/${_id}` }).then(() => {
      priceProds.value = priceProds.value.map((priceProd) => {
        if (priceProd._id == _id) {
          const updatedPriceProd = {
            ...priceProd,
            status: priceProd.status == 0 ? 1 : 0,
          };
          ElMessage({
            type: "success",
            message: "Mahsulot narxi yangilandi",
          });
          return updatedPriceProd;
        }
        return priceProd;
      });
    });
  };
  return {
    priceProds,
    getAllPriceProds,
    newPriceProd,
    getPriceProd,
    savePriceProd,
    deletePriceProd,
    statusPriceProd,
  };
});
