<template>
  <el-table :data="products">
    <el-table-column type="index" />
    <el-table-column prop="title" label="Mahsulot nomi" width="180">
      <template #default="scope">
        <div class="df al-it gap-1">
          <el-image
            style="width: 50px; height: 50px"
            :src="`${url}/${scope.row.img[0].response}`"
            fit="cover"
          />
          {{ scope.row.title }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="unit" label="Mahsulot birligi" width="180" />
    <el-table-column prop="status" label="Mahsulot holati">
      <template #default="scope">
        <el-button
          :type="scope.row.status == 1 ? 'success' : 'danger'"
          @click="changeStatus(scope.row._id)"
        >
          <el-icon>
            <check v-if="scope.row.status == 1" />
            <close v-else />
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <el-dropdown>
          <el-button type="primary"
            ><el-icon><More /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="remove(scope.row._id)">
                <el-icon><Delete /></el-icon>
                O'chirish
              </el-dropdown-item>
              <el-dropdown-item @click="editProduct(scope.row._id)">
                <el-icon><edit /></el-icon>
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
import { useProductStore } from "@/stores/data/product";
import { storeToRefs } from "pinia";
import { useHelperStore } from "@/stores/helpers";
import { useDialogStore } from "@/stores/useful/dialog";

const emit=defineEmits([ 
  'edit'
])

const helperStore = useHelperStore();
const { url } = helperStore;

const store = useProductStore();

const { products } = storeToRefs(store);
const { statusProduct, deleteProduct } = store;

const changeStatus = (_id) => {
  statusProduct(_id);
};

const remove = (_id) => {
  deleteProduct(_id);
};

const dialog=useDialogStore()

const editProduct=(_id) => {
  emit('edit',_id)
  dialog.setEditToggle(true)
  dialog.setToggle(true)
}


</script>
<style lang=""></style>
