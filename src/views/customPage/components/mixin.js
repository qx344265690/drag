import { mapGetters } from "vuex";
export const Mixin = {
  data() {
    return {
      msgg: "mixins",
      vuexAllComponent: []
    };
  },
  props: {
    classStyle: {
      type: String,
      default: "none"
    },
    childIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["allComponet"])
  },
  watch: {
    allComponet: {
      handler: function(newVal) {
        this.vuexAllComponent = newVal;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    changeActive() {
      // console.log("mixins中的方法changeActive");
    },
    /**
     * @describe 子组件控制父组件传递点击参数
     */
    cahngeFather() {
      this.$emit("valueUpdated", this.componentData, this.childIndex);
    }
  }
};
