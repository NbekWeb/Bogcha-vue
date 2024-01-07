<template>
  <aside>
    <nav>
      <router-link to="/">
        <el-icon>
          <HomeFilled />
        </el-icon>
        Bosh sahifa 
      </router-link>
      <router-link to="/product">
        <el-icon>
          <HomeFilled />
        </el-icon>
        Mahsulot
      </router-link>
    </nav>
  </aside>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import "@/styles/vars/colors.scss";

aside {
  width: 170px;
  height: 100%;
  background-color: #fff;
  padding: 15px;
  nav {
    display: flex;
    flex-direction: column;
    gap: 15px;
    a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      color: #fff;
      background-color: #f2f2f2;
      &.router-link-active {
        background-color: $green;
      }
    }
  }
}
</style>
