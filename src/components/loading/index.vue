<template>
  <div class="loading">
    <a-spin class="loadContend" tip="不要着急小朋友..." />
  </div>
</template>
<script>
export default {
  name: "loading",
  data() {
    return {
      msg: "信息"
    };
  }
};
</script>
<style lang="less" scope>
.loading {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
