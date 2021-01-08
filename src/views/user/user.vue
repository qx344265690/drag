<template>
  <div class="user">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.user {
  height: 100%;
  p {
    height: 30px;
  }
}
</style>
