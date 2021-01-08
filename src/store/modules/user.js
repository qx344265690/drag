const user = {
  state: {
    userinfo: {}
  },
  mutations: {
    changeInfo(state, data) {
      state.userinfo = data;
    }
  },
  actions: {
    Login() {
      let cc = 1;
      return new Promise((resolve, reject) => {
        if (cc === 1) {
          resolve("成功");
        } else {
          reject("失败");
        }
      });
    },
    changeInfo(content, data) {
      content.commit("changeInfo", data);
    }
  }
};
export default user;
