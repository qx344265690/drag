const getters = {
  userInfo: state => state.user.userinfo,
  load: state => state.load.isload,
  customDistanceToLeft: state => state.custom.customDistanceToLeft,
  customDashed: state => state.custom.customDashed,
  allComponet: state => state.custom.allComponet,
  allComponetIndex: state => state.custom.allComponetIndex,
  eachComponetH: state => state.custom.eachComponetH,
  shopSignData: state => state.custom.shopSignData
};

export default getters;
