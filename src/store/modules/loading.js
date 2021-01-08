const load = {
  state: {
    isload: false
  },
  mutations: {
    changeLoad(state) {
      state.isload = !state.isload;
    }
  },
  actions: {
    changeLoad(content) {
      content.commit("changeLoad");
    }
  }
};
export default load;
