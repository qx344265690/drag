const datas = {
  list: [
    { title: "首页", iconType: "user", key: "1", urls: "/" },
    {
      title: "人员管理",
      iconType: "video-camera",
      key: "2",
      urls: "/personnel"
    },
    {
      title: "订单管理",
      iconType: "upload",
      key: "3",
      urls: "/order"
    },
    {
      title: "店铺管理",
      iconType: "user",
      key: "4",
      children: [
        {
          title: "地球店",
          iconType: "user",
          key: "1.1",
          urls: "/shop/earth"
        },
        {
          title: "月球店",
          iconType: "user",
          key: "1.2",
          urls: "/shop/moon"
        }
      ]
    }
  ]
};
export default datas;
