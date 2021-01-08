/**
 * @describe 页面跳转这里使用第二种方式
 * 1、this.$router.push({name:'parasetEdit',params:{pk_refinfo:'test',value:'test1'}});
 * 接收方式 this.$route.params.pk_refinfo
 * 2、this.$router.push({path:'/uapbd/paraset/edit',query:{pk_refinfo:'test',value:'test1'}});
 * 接收方式 this.$route.query.pk_refinfo
 * @param {String} pushPath  路径
 * @param {Object} params 参数对象
 */

let utils = {
  pushPage(pushPath, params) {
    this.$router.push({
      path: pushPath,
      query: params
    });
  }
};
export { utils };
