const custom = {
  state: {
    customDistanceToLeft: "", // 距离左侧间距
    customDashed: false, //是否在展示,滑动到区域展示虚线框
    allComponet: [], // 控制子组件的展示
    allComponetIndex: null, // 点击暂时区域组件，保存住下标
    eachComponetH: 0, //每次点击展示区域获取当前元素距离视窗的高度
    //店招区域
    shopSignData: {
      backImg: "", //背景图片
      headImg: "", //店铺头像
      logo: true, //店铺LOGO
      selected: true, //精选
      upNew: true, //上新
      scene: true //场景
    }
  },
  mutations: {
    changeCutomBox(state, data) {
      console.log(data)
      state.customDistanceToLeft = data;
    },
    changeCustomDashed(state, data) {
      state.customDashed = data;
    },
    changeAllComponents(state, data) {
      state.allComponet = data;
    },
    changeAllComponetIndex(state, data) {
      state.allComponetIndex = data;
    },
    changeEachComponetH(state, data) {
      state.eachComponetH = data;
    },
    changeShopSign(state, data) {
      // 直接修改state对象中的数据不会更新
      let newArr = Object.assign({}, state.shopSignData);
      Object.keys(data).forEach(key => {
        // 需要替换的值
        const val = data[key];
        const arr = key.split(".");
        if (arr.length > 1) {
          let obj = newArr;
          while (arr.length - 1 && (obj = obj[arr.shift()]));
          obj[arr[0]] = val;
        } else {
          newArr[key] = val;
        }
      });
      state.shopSignData = newArr;
    }
  },
  actions: {
    changeCutomBox(content, data) {
      content.commit("changeCutomBox", data);
    },
    changeCustomDashed(content, data) {
      content.commit("changeCustomDashed", data);
    },
    changeAllComponents(content, data) {
      content.commit("changeAllComponents", data);
    },
    changeAllComponetIndex(content, data) {
      content.commit("changeAllComponetIndex", data);
    },
    changeEachComponetH(content, data) {
      content.commit("changeEachComponetH", data);
    },
    changeShopSign(content, data) {
      content.commit("changeShopSign", data);
    }
  }
};
export default custom;
