<template>
  <div>
    <el-dialog
      v-model="toggle"
      :title="`Yangi  ${title.toLowerCase()} qo'shish`"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="productForm"
        :model="product"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="Mahsulot nomi" prop="title">
          <el-input v-model="product.title" />
        </el-form-item>
        <el-form-item label="Mahsulot birligi" prop="unit">
          <el-select v-model="product.unit"  placeholder="Ro'yxatdan tanlang">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose"> Bekor qilish </el-button>
          <el-button type="primary"> Tasdiqlash </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useDialogStore } from "../../stores/useful/dialog.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const product = ref({});
const rules = ref({
  title: [
    {
      required: true,
      message: "Mahsulot nomini kiriting",
      trigger: "blur",
    },
  ],
  unit: [
    {
      required: true,
      message: "Mahsulot birligini tanlang",
      trigger: "change",
    },
  ],
  img: [
    {
      required: true,
      message: "Mahsulot rasmini yuklang",
      trigger: "blur",
    },
  ],
});

const dialogStore = useDialogStore();
const { toggle } = storeToRefs(dialogStore);
const { setToggle } = dialogStore;
defineProps(["title"]);
const handleClose = () => {
  setToggle(false);
};
</script>

<style lang=""></style>
