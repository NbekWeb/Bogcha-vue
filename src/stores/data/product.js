import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStoreF } from "../helpers/api";
import { ElMessage } from "element-plus";

export const useProductStore = defineStore("product", () => {
  const products = ref({});
  const productsCount = ref({});
  const units = ref(['kg','dona','g','l','ml','mg']);

  // get all products
  const getAllProducts = async () => {
    let res = await api.getAxis({
      url: "product",
    });
    if (res.status === 200) {
      products.value = [...res.data.products];
      productsCount.value = [...res.data.count];
    }
  };

  //add new product
  const newProduct = async (data) => {
    await api
      .postAxios({
        url: "product",
        data,
      })
      .then((res) => {
        products.value = [res.data, ...product.value];
        productsCount.value += 1;
      });
  };

  // get one product
  const getProduct = async (_id) => {
    return await api.getAxios({
      url: `product/${_id}`,
    });
  };


  //change product
  const saveProduct = async (data) => {
    await api
      .putAxios({
        url: "product",
        data,
      })
      .then((res) => {
        products.value = products.value.map((product) => {
          if (product._id === res.data._id) {
            return res.data;
          }

          return product;
        });
        ElMessage({
          type: "success",
          message: "Mahsulot yangilandi",
        });
      });
  };

  //delete product
  const deleteProduct = async (_id) => {
    await api.deleteAxios({ url: `product/${_id}` })
    .then(() => {
    products.value = products.value.filter((product) => product._id !== _id);
    productsCount -= 1;
  })};


  //change status of product
  const statusProduct = async (_id) => {
    await api.getAxios({ url: `product/change/${_id}` })
    .then(()=>{
        products.value = products.value.map(product=>{
            if(product._id==_id) {
                return {
                    ...product,
                    status: product.status==0 ? 1:0
                }
            }
            return product
        })
    });
  };

  return{
    products,
    productsCount,
    units,
    getAllProducts,
    newProduct,
    getProduct,
    saveProduct,
    deleteProduct,
    statusProduct,
  }
});
