<template>
  <a-result
    :status="status"
    :title="status"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary">
        <a href="#/">Back Home</a>
      </a-button>
    </template>
  </a-result>
</template>
<script>
// 403 没有权限
// 404 找不到网络
// 500 服务器错误
export default {
  name: "404",
  data() {
    return {
      status: "404"
    };
  }
};
</script>

<style scoped></style>
