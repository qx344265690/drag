<template>
  <div class="operation" v-show="isOperation" ref="operation">
    <a-button
      type="primary"
      size="small"
      v-for="(item, index) in operationList"
      :key="index"
      @click="changeOperation(item.val)"
      >{{ item.name }}</a-button
    >
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// 操作组件
export default {
  name: "operation",
  data() {
    return {
      operationList: [
        { name: "上", val: "up" },
        { name: "下", val: "down" },
        { name: "删", val: "del" }
      ],
      isOperation: false, //是否展示操作按钮
      operationNum: 0, //需要操作的下标
      newArrOperation: [], // 声明新数组
      allComponetVuex: []
    };
  },
  props: {
    operation: {
      type: Number,
      default: null
    }
  },
  computed: {
    ...mapGetters(["allComponet", "eachComponetH"])
  },
  watch: {
    /**
     * @derection 监听父传过来的下标
     * 如果是不需要操作的禁止展示
     */
    operation: {
      handler: function(newVal) {
        this.operationNum = newVal;
        this.$store.dispatch("changeAllComponetIndex", newVal);
        this.isOperation = newVal == null || newVal == 88 ? false : true;
        let itemName =
          this.allComponetVuex[newVal] === undefined
            ? ""
            : this.allComponetVuex[newVal].componentName;
        //  itemName === "flashSale" || itemName === "deposit")
        let operationList = [];
        if (this.allComponetVuex[newVal] && itemName === "coupon") {
          operationList = [{ name: "删", val: "del" }];
        } else {
          operationList = [
            { name: "上", val: "up" },
            { name: "下", val: "down" },
            { name: "删", val: "del" }
          ];
        }
        this.operationList = operationList;
      },
      immediate: true,
      deep: true
    },
    // 监听vuex-选中后的数组
    allComponet: {
      handler: function(newVal) {
        this.allComponetVuex = newVal;
      },
      immediate: true,
      deep: true
    },
    // 监听展示区域元素高度
    // 如果上下移动还需要更改top值
    eachComponetH: {
      handler: function(newVal) {
        this.changeTop(newVal);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    changeTop(newTop) {
      if (this.$refs.operation === undefined) {
        return;
      }
      let operationDiv = this.$refs.operation;
      newTop = newTop <= 194 ? 194 : newTop;
      operationDiv.style.top = newTop - 89 + "px";
    },
    //  绑定上面循环事件
    changeOperation(type) {
      let childInde = this.operationNum; //传过来的选中的下标
      let oldArr = this.allComponetVuex; // vuex中数组
      let newChildInde = 0; //本页面声明的下标
      // 需要增加是不是可以移动到顶部和底部的组件
      console.log("---------------------");
      console.log(oldArr);
      console.log("---------------------");
      if (type === "up") {
        if (oldArr[childInde - 1].componentName === "coupon") {
          this.$message.warning("优惠券必须第一位");
          return;
        }
        if (oldArr.length > 1 && childInde !== 0) {
          newChildInde = childInde - 1;
          this.newArrOperation = this.swapItems(
            oldArr,
            childInde,
            childInde - 1
          );
        } else {
          newChildInde = 0;
        }
      } else if (type === "down") {
        if (oldArr.length > 1 && childInde !== oldArr.length - 1) {
          newChildInde = childInde + 1;
          this.newArrOperation = this.swapItems(
            oldArr,
            childInde,
            childInde + 1
          );
        } else {
          newChildInde = oldArr.length - 1;
        }
      } else {
        // 是否刚进来就点击了删除
        // 是否是操作了上面才删除
        if (this.newArrOperation.length === 0) {
          oldArr.splice(childInde, 1);
        } else {
          this.newArrOperation.splice(childInde, 1);
        }
        newChildInde = childInde == 0 ? childInde : childInde - 1;
      }
      let newA =
        this.newArrOperation.length === 0 ? oldArr : this.newArrOperation;
      // 修改或者不修改时候的下标
      this.$store.dispatch("changeAllComponetIndex", newChildInde);
      // 修改上下移动下标
      this.$emit("subscript", newChildInde);
      // 修改后更新vuex中数组
      this.$store.dispatch("changeAllComponents", newA);
    },
    // 操作数组内部上下移动
    swapItems(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    }
  }
};
</script>
<style lang="less" scoped>
.operation {
  position: absolute;
  top: 235px;
  left: 10px;
  display: flex;
  flex-direction: column;
  button:nth-child(2) {
    margin: 10px 0;
  }
}
</style>
