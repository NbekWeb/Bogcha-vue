<template>
  <el-table :data="priceProds">
    <el-table-column type="index" />
    <el-table-column prop="product.title" label="Mahsulot nomi" width="180" />
    <el-table-column prop="price" label="Mahsulot narxi" width="180" />
    <el-table-column prop="status" label="Mahsulot holati">
      <template #default="scope">
        <el-button
          :type="scope.row.status === 1 ? 'success' : 'danger'"
          @click="changeStatus(scope.row._id)"
        >
          <el-icon>
            <check v-if="scope.row.status === 1" />
            <close v-else />
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <el-dropdown>
          <el-button type="primary">
            <el-icon>
              <More />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="remove(scope.row._id)">
                <el-icon>
                  <Delete />
                </el-icon>
                O'chirish
              </el-dropdown-item>
              <el-dropdown-item @click="editPrice(scope.row._id)">
                <el-icon>
                  <Edit />
                </el-icon>
                Tahrirlash
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { defineEmits } from "vue";
import { usePriceProdStore } from "@/stores/data/priceProd";
import { storeToRefs } from "pinia";
import { useDialogStore } from "@/stores/useful/dialog";

const store = usePriceProdStore();
const { statusPriceProd, deletePriceProd } = store;
const { priceProds } = storeToRefs(store);
const dialog = useDialogStore();
const emit = defineEmits(["edit"]);

const changeStatus = (_id) => {
  statusPriceProd(_id);
};

const remove = (_id) => {
  deletePriceProd(_id);
};

const editPrice = (_id) => {
  emit("edit", _id);
  dialog.setEditToggle(true);
  dialog.setToggle(true);
};
</script>

<style lang=""></style>
