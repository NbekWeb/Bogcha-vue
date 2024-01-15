<template>
  <h1>salsao</h1>
  <div>
    <el-dialog
      v-model="toggle"
      title="Mahsulotga narx belgilash"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="priceProdForm"
        :model="priceProd"
        :rules="rules"
        label-position="top"
        @submit.prevent="add(priceProdForm)"
      >
        <el-form-item label="Mahsulot narxi" prop="product">
          <el-input v-model="priceProd.product" />
        </el-form-item>

        <el-form-item label="Mahsulot birligi" prop="unit">
          <el-select v-model="priceProd.price" placeholder="Ro'yxatdan tanlang">
            <el-option
              v-for="(item, index) in priceProds"
              :key="index"
              :label="item.product.title"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Bekor qilish</el-button>
          <el-button type="primary" @click="add(priceProdForm)">
            Tasdiqlash
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useDialogStore } from "../../stores/useful/dialog.js";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import VueCookies from "vue-cookies";
import { usePriceProdStore } from "@/stores/data/priceProd.js";
import { useHelperStore } from "@/stores/helpers";
import { ElMessage } from "element-plus";

const helperStore = useHelperStore();
const { url } = helperStore;

const store = usePriceProdStore();
const { newPriceProd, savePriceProd, getPriceProd } = store;
const { priceProds } = storeToRefs(store);
const bogchaToken = VueCookies.get("bogcha-token");

const priceProd = ref({});
const rules = ref({
  price: [
    {
      required: true,
      message: "Mahsulot narxini kiriting",
      trigger: "blur",
    },
  ],
  product: [
    {
      required: true,
      message: "Mahsulot tanlang",
      trigger: "change",
    },
  ],
});

const dialogStore = useDialogStore();
const { toggle, editToggle } = storeToRefs(dialogStore);
const { setToggle, setEditToggle } = dialogStore;

const handleClose = () => {
  setToggle(false);
  setEditToggle(false);
};

const priceProdForm = ref();

const add = async (formEl) => {
  if (formEl) {
    await formEl.validate((valid) => {
      if (valid) {
        if (editToggle.value) {
          console.log(priceProd.value);
          savePriceProd(priceProd.value);
          console.log("s");
        } else {
          newPriceProd(priceProd.value);
          console.log("d");
        }
        priceProd.value = {};
        handleClose();
      } else {
        ElMessage.error("Barcha maydonlarni to'ldiring");
      }
    });
  }
};

const dialogVisible = ref(false);

watch(editToggle, async () => {
  if (editToggle.value) {
    await getPriceProd(props.id).then((res) => {
      priceProd.value = { ...res.data };
      console.log(`${url}/${priceProd.value._id}`);
    });
  }
});
</script>

<style lang=""></style>
