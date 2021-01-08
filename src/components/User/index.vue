<template>
  <div class="userInfo">
    <div class="u-name">{{ userInfo.userName }}</div>
    <a-button type="danger" @click="closeBtn">
      注销
    </a-button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { deleteItem } from "@/util/localStorage";
export default {
  name: "user",
  data() {
    return {
      userInfos: {}
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    closeBtn() {
      deleteItem("userInfo");
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>
<style lang="less" scope>
.userInfo {
  display: flex;
  align-items: center;
  .u-name {
    margin-right: 20px;
  }
}
</style>
