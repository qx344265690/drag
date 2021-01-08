<template>
  <div class="toConfigure" ref="toConfigure" v-if="isOperation">
    <div class="cardPosition" ref="toConfigCardPosition">
      <a-card
        size="small"
        :title="newObject.title + '区域'"
        style="width: 375px"
      >
        <!-- 店招区域 -->
        <template v-if="newObject.title === '店招'">
          <ul class="shopBox">
            <li v-for="(item, index) in shopList" :key="index">
              <div class="itemTitle">
                <h4>{{ item.title }}</h4>
                <a-switch
                  v-if="item.isSwitch"
                  :default-checked="item.changeCheck"
                  @change="onChange(index, $event)"
                />
              </div>
              <p>{{ item.text }}</p>
              <template v-if="item.isUpload">
                <div
                  v-for="(items, indexs) in item.bannerImgList"
                  :key="indexs"
                >
                  <upload
                    :fileLists="items.img || []"
                    :itemIndex="indexs"
                    :isBackground="item.isBackground"
                    :types="newObject.title"
                    @changeImg="changeImg"
                  />
                </div>
              </template>
            </li>
          </ul>
        </template>
        <!-- 轮播区域 banner -->
        <template v-if="newObject.title === '轮播'">
          <ul class="bannerPicture">
            <li v-for="(item, index) in bannerList" :key="index">
              <div class="itemTitle">
                <h4>
                  {{ item.title }}
                  <p v-if="item.willPass" class="aa"></p>
                </h4>
                <a-switch
                  v-if="item.isSwitch"
                  default-checked
                  @change="onChangeBanner(index, $event)"
                />
              </div>
              <p>{{ item.text }}</p>
              <div v-if="item.isUpload">
                <ul class="bannerUpload">
                  <li
                    v-for="(items, indexs) in item.bannerImgList"
                    :key="indexs"
                  >
                    <div class="banner_opaction">
                      <a-icon
                        @click="upAndDown('up', indexs)"
                        type="arrow-up"
                      />
                      <a-icon
                        @click="upAndDown('down', indexs)"
                        type="arrow-down"
                      />
                    </div>
                    <upload
                      :types="newObject.title"
                      :fileLists="items.img || []"
                      :itemIndex="indexs"
                      @changeBannerImg="changeBannerImg"
                      v-if="forceif"
                    />
                    <div class="banner_select">
                      <a-select
                        v-if="forceif"
                        :default-value="items.selValue"
                        style="width: 145px"
                        size="small"
                        @change="handleChangeSelect(indexs, $event)"
                      >
                        <a-select-option
                          v-for="item in bannerSelect"
                          :value="item.id"
                          :key="item.id"
                        >
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                      <div class="b_s_input">
                        <a-input
                          v-if="items.selValue !== '2'"
                          placeholder="请输入"
                          v-model="items.text"
                        />
                      </div>
                    </div>
                    <div class="banner_delete" @click="bannerDele(indexs)">
                      <a-icon type="delete" />
                    </div>
                  </li>
                </ul>
                <div
                  class="address"
                  @click="addressPush(item.bannerImgList.length)"
                >
                  <a-icon type="plus" />
                  <p>添加 {{ item.bannerImgList.length }}/4</p>
                </div>
              </div>
            </li>
          </ul>
        </template>
        <!-- 单列图片区域 oneSinglePicture -->
        <template v-if="newObject.title === '单列图片'">
          <div class="oneSinglePicture">
            <ul>
              <li v-for="(item, index) in oneSinglePictureList" :key="index">
                <div class="itemTitle">
                  <h4>
                    {{ item.title }}
                    <p v-if="item.willPass" class="aa"></p>
                  </h4>
                  <a-switch
                    v-if="item.isSwitch"
                    default-checked
                    @change="onChangeBanner(index, $event)"
                  />
                </div>
                <p>{{ item.text }}</p>
                <div v-if="item.isUpload">
                  <ul class="bannerUpload">
                    <li
                      v-for="(items, indexs) in item.bannerImgList"
                      :key="indexs"
                    >
                      <upload
                        :types="newObject.title"
                        :fileLists="items.img || []"
                        :itemIndex="indexs"
                        @changeBannerImg="changeBannerImg"
                        v-if="forceif"
                      />
                      <div class="banner_select">
                        <a-select
                          v-if="forceif"
                          :default-value="items.selValue"
                          style="width: 145px"
                          size="small"
                          @change="handleChangeSelect(indexs, $event)"
                        >
                          <a-select-option
                            v-for="item in singlePictureSelect"
                            :value="item.id"
                            :key="item.id"
                          >
                            {{ item.name }}
                          </a-select-option>
                        </a-select>
                        <div class="b_s_input">
                          <a-input
                            v-if="items.selValue !== '2'"
                            placeholder="请输入"
                            v-model="items.text"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <!-- 双列图片区域 twoSinglePicture -->
        <template v-if="newObject.title === '双列图片'">
          <div class="twoSinglePicture">
            <ul>
              <li v-for="(item, index) in twoSinglePictureList" :key="index">
                <div class="itemTitle">
                  <h4>
                    {{ item.title }}
                    <p v-if="item.willPass" class="aa"></p>
                  </h4>
                </div>
                <p>{{ item.text }}</p>
                <div v-if="item.isUpload">
                  <ul class="bannerUpload">
                    <li
                      v-for="(items, indexs) in item.bannerImgList"
                      :key="indexs"
                    >
                      <div class="banner_opaction">
                        {{ indexs === 0 ? "左" : "右" }}
                      </div>
                      <upload
                        :types="newObject.title"
                        :fileLists="items.img || []"
                        :itemIndex="indexs"
                        @changeBannerImg="changeBannerImg"
                        v-if="forceif"
                      />
                      <div class="banner_select">
                        <a-select
                          v-if="forceif"
                          :default-value="items.selValue"
                          style="width: 145px"
                          size="small"
                          @change="handleChangeSelect(indexs, $event)"
                        >
                          <a-select-option
                            v-for="item in singlePictureSelect"
                            :value="item.id"
                            :key="item.id"
                          >
                            {{ item.name }}
                          </a-select-option>
                        </a-select>
                        <div class="b_s_input">
                          <a-input
                            v-if="items.selValue !== '2'"
                            placeholder="请输入"
                            v-model="items.text"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <!-- 三列图片区域 threeSinglePicture -->
        <template v-if="newObject.title === '三列图片'">
          <div class="threeSinglePicture">
            <ul>
              <li v-for="(item, index) in threeSinglePictureList" :key="index">
                <div class="itemTitle">
                  <h4>
                    {{ item.title }}
                    <p v-if="item.willPass" class="aa"></p>
                  </h4>
                </div>
                <p>{{ item.text }}</p>
                <div v-if="item.isUpload">
                  <ul class="bannerUpload">
                    <li
                      v-for="(items, indexs) in item.bannerImgList"
                      :key="indexs"
                    >
                      <div class="banner_opaction">
                        {{ indexs === 0 ? "左" : indexs === 1 ? "中" : "右" }}
                      </div>
                      <upload
                        :types="newObject.title"
                        :fileLists="items.img || []"
                        :itemIndex="indexs"
                        @changeBannerImg="changeBannerImg"
                        v-if="forceif"
                      />
                      <div class="banner_select">
                        <a-select
                          v-if="forceif"
                          :default-value="items.selValue"
                          style="width: 145px"
                          size="small"
                          @change="handleChangeSelect(indexs, $event)"
                        >
                          <a-select-option
                            v-for="item in singlePictureSelect"
                            :value="item.id"
                            :key="item.id"
                          >
                            {{ item.name }}
                          </a-select-option>
                        </a-select>
                        <div class="b_s_input">
                          <a-input
                            v-if="items.selValue !== '2'"
                            placeholder="请输入"
                            v-model="items.text"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <!-- 推荐商品区域 pickShop -->
        <template v-if="newObject.title === '推荐商品'">
          <div class="pickShop">
            <ul>
              <li v-for="(item, index) in pickShopList" :key="index">
                <div class="itemTitle">
                  <h4>
                    {{ item.title }}
                    <p v-if="item.willPass" class="aa"></p>
                  </h4>
                </div>
                <p>{{ item.text }}</p>
                <div>
                  <ul class="pickShopUl">
                    <li
                      v-for="(items, indexs) in item.pickShopTextList"
                      :key="indexs"
                    >
                      <div class="pickShop_text">
                        <div class="p_t_input">
                          <span>SKU:</span>
                          <a-input placeholder="请输入" v-model="items.sku" />
                        </div>
                        <div class="p_t_input">
                          <span>序号:</span>
                          <a-input
                            placeholder="请输入"
                            v-model="items.serialNumber"
                          />
                        </div>
                      </div>
                      <div
                        class="pickShop_delete"
                        @click="deletePickShop(indexs, 'pickShop')"
                      >
                        <a-icon type="delete" />
                      </div>
                    </li>
                  </ul>
                  <div class="address" @click="addressPickShop('pickShop')">
                    <a-icon type="plus" />
                    <p>添加</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <!-- 可配置1 ecology -->
        <template v-if="newObject.title === '可配置1'">
          <div class="pickShop">
            <ul>
              <li v-for="(item, index) in ecologyList" :key="index">
                <div class="itemTitle">
                  <h4>
                    {{ item.title }}
                    <p v-if="item.willPass" class="aa"></p>
                  </h4>
                </div>
                <p>{{ item.text }}</p>
                <div>
                  <ul class="pickShopUl">
                    <li
                      v-for="(items, indexs) in item.pickShopTextList"
                      :key="indexs"
                    >
                      <div class="pickShop_text">
                        <div class="p_t_input">
                          <span>SKU:</span>
                          <a-input placeholder="请输入" v-model="items.sku" />
                        </div>
                        <div class="p_t_input">
                          <span>序号:</span>
                          <a-input
                            placeholder="请输入"
                            v-model="items.serialNumber"
                          />
                        </div>
                      </div>
                      <div
                        class="pickShop_delete"
                        @click="deletePickShop(indexs, 'ecology')"
                      >
                        <a-icon type="delete" />
                      </div>
                    </li>
                  </ul>
                  <div class="address" @click="addressPickShop('ecology')">
                    <a-icon type="plus" />
                    <p>添加</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <!-- 预约报名 birdOrder -->
        <template v-if="newObject.title === '订单提报'">
          <div class="oneSinglePicture birdOrder">
            <ul>
              <li v-for="(item, index) in birdOrderList" :key="index">
                <div class="itemTitle">
                  <h4>
                    {{ item.title }}
                    <p v-if="item.willPass" class="aa"></p>
                  </h4>
                  <a-switch
                    v-if="item.isSwitch"
                    default-checked
                    @change="onChangeBanner(index, $event)"
                  />
                </div>
                <p>{{ item.text }}</p>
                <div v-if="item.isUpload">
                  <ul class="bannerUpload">
                    <li
                      v-for="(items, indexs) in item.bannerImgList"
                      :key="indexs"
                    >
                      <upload
                        :types="newObject.title"
                        :fileLists="items.img || []"
                        :itemIndex="indexs"
                        @changeBannerImg="changeBannerImg"
                        v-if="forceif"
                      />
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <!-- 图片和文字 VrPreview -->
        <template v-if="newObject.title === '图片和文字'">
          <div class="threeSinglePicture vrPreview">
            <ul>
              <li v-for="(item, index) in vrPreviewList" :key="index">
                <div class="itemTitle">
                  <h4>
                    {{ item.title }}
                    <p v-if="item.willPass" class="aa"></p>
                  </h4>
                </div>
                <p>{{ item.text }}</p>
                <div v-if="item.isUpload">
                  <ul class="bannerUpload">
                    <li
                      v-for="(items, indexs) in item.bannerImgList"
                      :key="indexs"
                    >
                      <upload
                        :types="newObject.title"
                        :fileLists="items.img || []"
                        :itemIndex="indexs"
                        @changeBannerImg="changeBannerImg"
                        v-if="forceif"
                      />
                      <div class="banner_select">
                        <div class="b_s_input">
                          <a-input
                            v-if="items.selValue !== '2'"
                            placeholder="请输入标题"
                            v-model="items.title"
                          />
                        </div>
                        <div class="b_s_input">
                          <a-input
                            v-if="items.selValue !== '2'"
                            placeholder="请输入链接"
                            v-model="items.url"
                          />
                        </div>
                        <div class="b_s_input">
                          <a-input
                            v-if="items.selValue !== '2'"
                            placeholder="请输入序号"
                            v-model="items.code"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="address" @click="addressPickShop('vrPreview')">
              <a-icon type="plus" />
              <p>添加</p>
            </div>
          </div>
        </template>
      </a-card>
      <a-button style="margin: 5px 0" @click="storageShopSign(newObject)">
        保存
      </a-button>
    </div>
  </div>
</template>
<script>
import upload from "../uploadImg/index";
import { mapGetters } from "vuex";
// 操作组件
export default {
  name: "toConfigure",
  data() {
    return {
      allComponetVuex: [],
      newObject: {}, // 当前页面的数据
      isOperation: false, //是否展示操作按钮
      //店招需要保存的数据
      signData: {
        backImg: "", //背景图片
        headImg: "", //店铺头像
        logo: true, //店铺LOGO
        selected: true, //精选
        upNew: true, //上新
        scene: true //场景
      },
      // 店招区域配置
      shopList: [
        {
          title: "店招背景图",
          isSwitch: false, //是否展示开关按钮
          isUpload: true, // 是否是上传图片
          isBackground: true, // 是否展示背景图
          bannerImgList: [{ id: 0, img: [], selValue: "0" }],
          text:
            "图片宽度750像素，高度600像素，单张图片小于500k，支持扩展名：.png.jpg"
        },
        {
          title: "店铺LOGO",
          isSwitch: true,
          isUpload: true,
          isBackground: false,
          changeCheck: true, //默认switch打开
          bannerImgList: [{ id: 1, img: [], selValue: "0" }],
          text:
            "图片等宽等高，推荐500*500，LOGO大小小于500Kb，支持扩展名：.png.jpg"
        },
        {
          title: "精选TAB",
          isSwitch: true,
          isUpload: false,
          changeCheck: true,
          text: "关闭此开关，则店铺首页不展示“精选”TAB，默认展示“商品”TAB"
        },
        {
          title: "上新TAB",
          isSwitch: true,
          isUpload: false,
          changeCheck: true,
          text: "关闭此开关，则店铺首页不展示“上新”TAB"
        },
        {
          title: "场景TAB",
          isSwitch: true,
          isUpload: false,
          changeCheck: true,
          text: "关闭此开关，则店铺首页不展示“场景”TAB"
        }
      ],
      // 轮播区域配置
      bannerList: [
        {
          title: "上传图片",
          isSwitch: false, //是否展示开关按钮
          isUpload: true, // 是否是上传图片
          willPass: true, // 是否必传
          text: "建议图片尺寸为750*750px，支持类型：jpg、png。",
          bannerImgList: [{ id: 0, img: [], selValue: "0" }]
        },
        {
          title: "展示平台轮播",
          isSwitch: true, //是否展示开关按钮
          isUpload: false, // 是否是上传图片
          willPass: false, // 是否必传
          text:
            "开启此开关，则店铺轮播模块除了会显示店铺自己配置的轮播外，还会显示平台小二配置的全平台通用轮播。关闭此开关后不再展示平台轮播"
        }
      ],
      // 单列图片区域配置
      oneSinglePictureList: [
        {
          title: "上传图片",
          isSwitch: false, //是否展示开关按钮
          isUpload: true, // 是否是上传图片
          willPass: true, // 是否必传
          text:
            "建议图片宽度为750px，高度在375px-1500px之间，支持类型：jpg、png",
          bannerImgList: [{ id: 0, img: [], selValue: "0" }]
        }
      ],
      // 双列图片区域配置
      twoSinglePictureList: [
        {
          title: "上传图片",
          isSwitch: false, //是否展示开关按钮
          isUpload: true, // 是否是上传图片
          willPass: true, // 是否必传
          text:
            "建议图片宽度为750px，高度在375px-1500px之间，2张图片的高度必须相同。支持类型：jpg、png",
          bannerImgList: [
            { id: 0, img: [], selValue: "0" },
            { id: 1, img: [], selValue: "0" }
          ]
        }
      ],
      // 三列图片区域配置
      threeSinglePictureList: [
        {
          title: "上传图片",
          isSwitch: false, //是否展示开关按钮
          isUpload: true, // 是否是上传图片
          willPass: true, // 是否必传
          text:
            "建议图片宽度为750px，高度在375px-1500px之间，2张图片的高度必须相同。支持类型：jpg、png",
          bannerImgList: [
            { id: 0, img: [], selValue: "0" },
            { id: 1, img: [], selValue: "0" },
            { id: 2, img: [], selValue: "0" }
          ]
        }
      ],
      // 推荐商品区域配置
      pickShopList: [
        {
          title: "添加商品",
          isSwitch: false, //是否展示开关按钮
          isUpload: false, // 是否是上传图片
          willPass: true, // 是否必传
          text: "输入商品SKU(物料编码)，仅允许添加在本店已上架的商品",
          pickShopTextList: [{ id: 0, sku: "", serialNumber: "" }]
        }
      ],
      // 生态优选区域配置
      ecologyList: [
        {
          title: "添加商品",
          isSwitch: false, //是否展示开关按钮
          isUpload: false, // 是否是上传图片
          willPass: true, // 是否必传
          text: "输入商品SKU(物料编码)，仅允许添加在本店已上架的商品",
          pickShopTextList: [{ id: 0, sku: "", serialNumber: "" }]
        }
      ],
      // 预约报名
      birdOrderList: [
        {
          title: "上传图片",
          isSwitch: false, //是否展示开关按钮
          isUpload: true, // 是否是上传图片
          willPass: true, // 是否必传
          text: "建议图片尺寸为1053*246px，支持类型：jpg、png",
          bannerImgList: [{ id: 0, img: [], selValue: "0" }]
        }
      ],
      // 图片和文字
      vrPreviewList: [
        {
          title: "添加",
          isSwitch: false, //是否展示开关按钮
          isUpload: true, // 是否是上传图片
          willPass: true, // 是否必传
          text:
            "可输入外链，进行VR预览，上传的封面图宽高比为2:1，大小不超过500kb",
          bannerImgList: [{ id: 0, img: [], title: "", url: "", code: "" }]
        }
      ],
      forceif: true, //强制图片刷新
      bannerSelect: [
        //用于select选择
        { name: "自定义页面", id: "0" },
        { name: "商品详情页", id: "1" },
        { name: "本店领卷中心", id: "2" }
      ],
      singlePictureSelect: [
        //用于select选择
        { name: "自定义页面", id: "0" },
        { name: "商品详情页", id: "1" },
        { name: "本店领卷中心", id: "2" },
        { name: "海报页", id: "3" }
      ],
      allComponetBanIndexs: null, //监听vuex中的下标
      setSelValue: "" //设置select下标
    };
  },
  props: {
    // 传递过来的下标
    operation: {
      type: Number,
      default: null
    },
    // 每一个item
    itemDate: {
      type: Object,
      default: null
    }
  },
  components: {
    upload
  },
  computed: {
    ...mapGetters([
      "allComponet",
      "shopSignData",
      "allComponetIndex",
      "eachComponetH"
    ])
  },
  watch: {
    /**
     * @describe 监听父传过来的下标
     */
    operation: {
      handler: function(newVal) {
        this.isOperation = newVal == null ? false : true;
      },
      immediate: true,
      deep: true
    },
    /**
     * @describe 监听父传过来的对象
     */
    itemDate: {
      handler: function(newVal) {
        // let itemName = newVal.componentName;
        // if (
        //   itemName &&
        //   (itemName === "coupon" ||
        //     itemName === "flashSale" ||
        //     itemName === "deposit")
        // ) {
        //   this.isOperation = false;
        // }
        this.newObject = newVal;
      },
      immediate: true,
      deep: true
    },
    /**
     * @describe 获取vuex-数组
     */
    allComponet: {
      handler: function(newVal) {
        this.allComponetVuex = newVal;
      },
      immediate: true,
      deep: true
    },
    /**
     * @describe 获取vuex-展示区域下标
     * 这个地方需要更改下
     * 根据下标的更改确认下vuex中的数据应该赋值给页面中的哪些元素
     * 如banner的是bannerList
     * 单列是oneSinglePictureList
     * newVal 如果是null或者88位店招区域配置
     */
    allComponetIndex: {
      handler: function(newVal) {
        this.forceif = false;
        this.allComponetBanIndexs = newVal;
        if (newVal === null || newVal === 88) {
          // 这代表店招区域，回显需要从新开个方法bannerImgList
          this.shopLists(newVal);
          return;
        }
        this.echoAllImg(newVal);
        this.$nextTick(() => {
          this.forceif = true;
        });
        this.allComponetBanIndexs = newVal;
      },
      deep: true
    },
    /**
     * @describe 获取vuex-店招数据
     */
    shopSignData: {
      handler: function(newVal) {
        this.signData = newVal;
      },
      immediate: true,
      deep: true
    },
    /**
     * @describe 获取vuex-如果上下移动还需要更改top值
     */
    eachComponetH: {
      handler: function(newVal) {
        this.changeTop(newVal);
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {
    /**
     * @describe 控制店招配置区位置
     */
    changeTop(newTop) {
      console.log(newTop);
      // let toTop = newTop;
      this.$nextTick(() => {
        if (this.$refs.toConfigCardPosition === undefined) {
          return;
        }
        // let operationDiv = this.$refs.toConfigCardPosition;
        // newTop = newTop <= 194 ? 194 : newTop;
        // operationDiv.style.top = toTop === 0 ? 0 : newTop - 89 + "px";
      });
    },
    /**
     * @describe 控制店招配置区域按钮switch开启关闭
     */
    onChange(index, checked) {
      let data = {};
      let keyName = "";
      let values = checked;
      switch (index) {
        case 1:
          keyName = "logo";
          break;
        case 2:
          keyName = "selected";
          break;
        case 3:
          keyName = "upNew";
          break;
        case 4:
          keyName = "scene";
          break;
        default:
          break;
      }
      data[keyName] = values;
      this.$store.dispatch("changeShopSign", data);
    },
    /**
     * @describe upload组件调用图片上传后，更改vuex中的图片数据
     */
    changeImg(type, value) {
      // if (value.thumbUrl === undefined) {
      //   return;
      // } else {
      let data = {};
      data[type ? "backImg" : "headImg"] =
        Object.keys(value).length === 0 ? "" : value.thumbUrl;
      this.$store.dispatch("changeShopSign", JSON.parse(JSON.stringify(data)));
      // }
    },
    /**
     * @describe 保存按钮
     */
    storageShopSign(items) {
      switch (items.title) {
        case "推荐商品":
          this.pickShopPreservation("pickShop");
          break;
        case "可配置1":
          this.pickShopPreservation("ecology");
          break;
        default:
          break;
      }
      // console.log(this.shopList);
      // console.log(this.signData);
      // console.log(this.bannerList);
      // console.log(this.allComponetVuex);
      // console.log(this.threeSinglePictureList);
      console.log("保存");
    },
    /**
     * @describe 推荐商品保存
     */
    pickShopPreservation(types) {
      let newBannerArr = this.allComponetVuex;
      if (types === "ecology") {
        newBannerArr[
          this.allComponetBanIndexs
        ].pickShopList = this.ecologyList[0].pickShopTextList;
      } else {
        newBannerArr[
          this.allComponetBanIndexs
        ].pickShopList = this.pickShopList[0].pickShopTextList;
      }
      this.$store.dispatch("changeAllComponents", newBannerArr);
    },
    /**
     * @describe 添加图片
     */
    addressPush(len) {
      let a = { id: len, img: [], selValue: "0" };
      if (len === 4) {
        return;
      }
      this.bannerList[0].bannerImgList.push(a);
    },
    /**
     * @describe 添加推荐商品
     */
    addressPickShop(types) {
      let data = { id: 0, sku: "", serialNumber: "" };
      let itemPush = { id: 0, img: [], title: "", url: "", code: "" };
      switch (types) {
        case "ecology":
          this.ecologyList[0].pickShopTextList.push(data);
          break;
        case "pickShop":
          this.pickShopList[0].pickShopTextList.push(data);
          break;
        case "vrPreview":
          this.vrPreviewList[0].bannerImgList.push(itemPush);
          break;
        default:
          break;
      }
    },
    /**
     * @describe 删除推荐商品
     */
    deletePickShop(ind, types) {
      if (types === "ecology") {
        if (this.ecologyList[0].pickShopTextList.length === 1) {
          this.$message.warning("不能全部删除！！！");
          return;
        }
        this.ecologyList[0].pickShopTextList.splice(ind, 1);
      } else {
        if (this.pickShopList[0].pickShopTextList.length === 1) {
          this.$message.warning("不能全部删除！！！");
          return;
        }
        this.pickShopList[0].pickShopTextList.splice(ind, 1);
      }
    },
    /**
     * @describe 删除图片上传,剩下一个不能删除
     * 删除vuex中数据
     * 删除的时候有问题，排序也有问题
     */
    bannerDele(ind) {
      // 当前页面循环的数组
      let temporaryArr = this.bannerList[0].bannerImgList;
      // 等于1的时候不删除
      if (temporaryArr.length === 1) {
        return;
      }
      this.forceif = false;
      let newBannerArr = this.allComponetVuex;
      this.bannerList[0].bannerImgList.splice(ind, 1);
      this.$nextTick(() => {
        this.forceif = true;
      });
      newBannerArr[
        this.allComponetBanIndexs
      ].bannerImg = this.bannerList[0].bannerImgList;
      this.$store.dispatch("changeAllComponents", newBannerArr);
    },
    /**
     * @describe 对上传图片展示进行排序
     */
    upAndDown(type, ind) {
      let temporaryArr = Object.assign([], this.bannerList[0].bannerImgList);
      this.forceif = false;
      if (type === "up") {
        if (temporaryArr.length > 1 && ind !== 0) {
          this.swapItems(temporaryArr, ind, ind - 1);
        }
      } else {
        if (temporaryArr.length > 1 && ind !== temporaryArr.length - 1) {
          this.swapItems(temporaryArr, ind, ind + 1);
        }
      }
      this.$set(this.bannerList[0], "bannerImgList", temporaryArr);
      this.$nextTick(() => {
        this.forceif = true;
      });
    },
    /**
     * @describe 排序方法
     */
    swapItems(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    /**
     * @describe 控制店招配置区域按钮switch开启关闭
     */
    onChangeBanner(index, checked) {
      console.log(index);
      console.log(checked);
      // this.$store.dispatch("changeShopSign", data);
    },
    /**
     * @describe 轮播图中的select选择
     */
    handleChangeSelect(indexs, value) {
      let newBannerArr = this.allComponetVuex[this.allComponetBanIndexs];
      let temporaryArr = [];
      switch (newBannerArr.title) {
        case "轮播":
          temporaryArr = Object.assign([], this.bannerList[0].bannerImgList);
          break;
        case "单列图片":
          temporaryArr = Object.assign(
            [],
            this.oneSinglePictureList[0].bannerImgList
          );
          break;
        case "双列图片":
          temporaryArr = Object.assign(
            [],
            this.twoSinglePictureList[0].bannerImgList
          );
          break;
        case "三列图片":
          temporaryArr = Object.assign(
            [],
            this.threeSinglePicture[0].bannerImgList
          );
          break;
        default:
          break;
      }
      temporaryArr[indexs].selValue = value;
      this.$set(this.bannerList[0], "bannerImgList", temporaryArr);
    },
    /**
     * @describe banner图片上传
     * indexs 子组件返回数组的下标
     * value blob图片数据
     */
    changeBannerImg(indexs, types, value) {
      let newBannerArr = this.allComponetVuex;
      console.log(this.vrPreviewList[0].bannerImgList[indexs]);
      // 必须要判断是否空对象，要不影响upload的显示
      let bannerObj = {
        id: indexs,
        img:
          Object.keys(value).length === 0
            ? []
            : [{ uid: value.uid, name: value.name, url: value.thumbUrl }],
        selValue: this.setSelValue || "0",
        title:
          this.vrPreviewList[0].bannerImgList[indexs] === undefined
            ? ""
            : this.vrPreviewList[0].bannerImgList[indexs].title,
        url:
          this.vrPreviewList[0].bannerImgList[indexs] === undefined
            ? ""
            : this.vrPreviewList[0].bannerImgList[indexs].url,
        code:
          this.vrPreviewList[0].bannerImgList[indexs] === undefined
            ? ""
            : this.vrPreviewList[0].bannerImgList[indexs].code
      };
      // 给当前页面进行赋值
      switch (types) {
        case "轮播":
          this.bannerList[0].bannerImgList.splice(indexs, 1, bannerObj);
          break;
        case "单列图片":
          this.oneSinglePictureList[0].bannerImgList.splice(
            indexs,
            1,
            bannerObj
          );
          break;
        case "双列图片":
          this.twoSinglePictureList[0].bannerImgList.splice(
            indexs,
            1,
            bannerObj
          );
          break;
        case "三列图片":
          this.threeSinglePictureList[0].bannerImgList.splice(
            indexs,
            1,
            bannerObj
          );
          break;
        case "订单提报":
          this.birdOrderList[0].bannerImgList.splice(indexs, 1, bannerObj);
          break;
        case "图片和文字":
          this.vrPreviewList[0].bannerImgList.splice(indexs, 1, bannerObj);
          break;
        default:
          break;
      }
      newBannerArr[this.allComponetBanIndexs].bannerImg.splice(
        indexs,
        1,
        bannerObj
      );
      this.$store.dispatch("changeAllComponents", newBannerArr);
    },
    /**
     * @describe 用于vuex中index更改后店招图片回显
     */
    shopLists() {
      this.shopList.forEach(item => {
        if (item.title === "店招背景图") {
          item.bannerImgList[0].img = this.signData.backImg
            ? [{ name: "店招背景图", uid: "0", url: this.signData.backImg }]
            : [];
        }
        if (item.title === "店铺LOGO") {
          item.bannerImgList[0].img = this.signData.headImg
            ? [{ name: "店铺LOGO", uid: "1", url: this.signData.headImg }]
            : [];
        }
        if (item.title === "店铺LOGO") {
          item.changeCheck = this.signData.logo;
        }
        if (item.title === "精选TAB") {
          item.changeCheck = this.signData.selected;
        }
        if (item.title === "上新TAB") {
          item.changeCheck = this.signData.upNew;
        }
        if (item.title === "场景TAB") {
          item.changeCheck = this.signData.scene;
        }
      });
      this.$nextTick(() => {
        this.forceif = true;
      });
    },
    /**
     * @describe 用于vuex中index更改后页面图片回显
     */
    echoAllImg(newVal) {
      let itemChild = this.allComponetVuex[newVal].componentName;
      // 如果index更改更新操作区域
      this.newObject = this.allComponetVuex[newVal];
      // 如果是空，默认增加为了显示图片
      let itemName = this.allComponetVuex[newVal].componentName;
      if (
        itemName === "coupon" ||
        itemName === "flashSale" ||
        itemName === "deposit" ||
        itemName === "userCare" ||
        itemName === "scene" ||
        itemName === "waterfall" ||
        itemName === "birdIntroduce"
      ) {
        this.isOperation = false;
      }
      // 注释的写法会影响upload的加载
      // let vuexBannerImg = this.allComponetVuex[newVal].bannerImg;
      // if (vuexBannerImg && vuexBannerImg.length === 0) {
      //   if (itemChild === "twoImg") {
      //     vuexBannerImg = [
      //       { id: 0, img: [], selValue: "0" },
      //       { id: 1, img: [], selValue: "0" }
      //     ];
      //   } else if (itemChild === "threeImg") {
      //     vuexBannerImg = [
      //       { id: 0, img: [], selValue: "0" },
      //       { id: 1, img: [], selValue: "0" },
      //       { id: 2, img: [], selValue: "0" }
      //     ];
      //   } else {
      //     vuexBannerImg = [{ id: 0, img: [], selValue: "0" }];
      //   }
      // }
      if (
        this.allComponetVuex[newVal].bannerImg != undefined &&
        this.allComponetVuex[newVal].bannerImg.length === 0
      ) {
        if (itemChild === "twoImg") {
          this.allComponetVuex[newVal].bannerImg = [
            { id: 0, img: [], selValue: "0" },
            { id: 1, img: [], selValue: "0" }
          ];
        } else if (itemChild === "threeImg") {
          this.allComponetVuex[newVal].bannerImg = [
            { id: 0, img: [], selValue: "0" },
            { id: 1, img: [], selValue: "0" },
            { id: 2, img: [], selValue: "0" }
          ];
        } else {
          this.allComponetVuex[newVal].bannerImg = [
            { id: 0, img: [], selValue: "0" }
          ];
        }
      }
      switch (itemChild) {
        case "banner":
          this.bannerList[0].bannerImgList = this.allComponetVuex[
            newVal
          ].bannerImg;
          break;
        case "oneImg":
          this.oneSinglePictureList[0].bannerImgList = this.allComponetVuex[
            newVal
          ].bannerImg;
          break;
        case "twoImg":
          this.twoSinglePictureList[0].bannerImgList = this.allComponetVuex[
            newVal
          ].bannerImg;
          break;
        case "threeImg":
          this.threeSinglePictureList[0].bannerImgList = this.allComponetVuex[
            newVal
          ].bannerImg;
          break;
        case "pickShop":
          this.pickShopList[0].pickShopTextList = this.allComponetVuex[
            newVal
          ].pickShopTextList;
          break;
        case "ecology":
          this.ecologyList[0].pickShopTextList = this.allComponetVuex[
            newVal
          ].pickShopTextList;
          break;
        case "birdOrder": //订单提报
          this.birdOrderList[0].bannerImgList = this.allComponetVuex[
            newVal
          ].bannerImg;
          break;
        case "vrPreview":
          this.birdOrderList[0].bannerImgList = this.allComponetVuex[
            newVal
          ].bannerImg;
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.toConfigure {
  min-width: 375px;
  position: relative;
  .cardPosition {
    // background: #fff;
    // position: absolute;
    background: #fff;
    position: fixed;
    right: 13px;
    top: 86px;
    .bannerPicture {
      li {
        list-style: none;
        .itemTitle {
          display: flex;
          align-items: center;
          h4 {
            margin: 10px 10px 10px 0;
            line-height: 24px;
            display: flex;
          }
          .aa:before {
            display: inline-block;
            margin-right: 4px;
            color: #f5222d;
            font-size: 14px;
            font-family: SimSun, sans-serif;
            line-height: 1;
            content: "*";
            margin-left: 5px;
          }
        }
        p {
          font-size: 12px;
        }
      }
      .bannerUpload {
        li {
          background: #d7d4d3;
          margin: 5px 0;
          display: flex;
          .banner_opaction {
            display: flex;
            flex-direction: column;
            height: 100px;
            justify-content: space-between;
            padding: 23px 10px 0 10px;
          }
          .banner_select {
            display: flex;
            flex-direction: column;
            height: 94px;
            justify-content: space-between;
            padding: 28px 10px 0 10px;
            width: 165px;
            .b_s_input {
              input {
                height: 24px;
                font-size: 12px;
              }
            }
          }
          .banner_delete {
            display: flex;
            flex-direction: column;
            height: 115px;
            justify-content: center;
            padding: 10px 10px 0 10px;
          }
        }
      }
    }
    .shopBox {
      li {
        list-style: none;
        .itemTitle {
          display: flex;
          align-items: center;
          h4 {
            margin: 10px 10px 10px 0;
            line-height: 24px;
            display: flex;
          }
          .aa:before {
            display: inline-block;
            margin-right: 4px;
            color: #f5222d;
            font-size: 14px;
            font-family: SimSun, sans-serif;
            line-height: 1;
            content: "*";
            margin-left: 5px;
          }
        }
        p {
          font-size: 12px;
        }
      }
    }
    .oneSinglePicture {
      ul {
        li {
          list-style: none;
          .itemTitle {
            display: flex;
            align-items: center;
            h4 {
              margin: 10px 10px 10px 0;
              line-height: 24px;
              display: flex;
            }
            .aa:before {
              display: inline-block;
              margin-right: 4px;
              color: #f5222d;
              font-size: 14px;
              font-family: SimSun, sans-serif;
              line-height: 1;
              content: "*";
              margin-left: 5px;
            }
          }
          p {
            font-size: 12px;
          }
        }
        .bannerUpload {
          li {
            background: #d7d4d3;
            margin: 5px 0;
            display: flex;
            justify-content: center;
            .banner_select {
              display: flex;
              flex-direction: column;
              height: 94px;
              justify-content: space-between;
              padding: 28px 10px 0 10px;
              width: 165px;
              .b_s_input {
                input {
                  height: 24px;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
    .twoSinglePicture {
      ul {
        li {
          list-style: none;
          .banner_opaction {
            display: flex;
            flex-direction: column;
            height: 100px;
            justify-content: center;
            padding: 23px 10px 0 10px;
            width: 46px;
          }
          .itemTitle {
            display: flex;
            align-items: center;
            h4 {
              margin: 10px 10px 10px 0;
              line-height: 24px;
              display: flex;
            }
            .aa:before {
              display: inline-block;
              margin-right: 4px;
              color: #f5222d;
              font-size: 14px;
              font-family: SimSun, sans-serif;
              line-height: 1;
              content: "*";
              margin-left: 5px;
            }
          }
          p {
            font-size: 12px;
          }
        }
        .bannerUpload {
          li {
            background: #d7d4d3;
            margin: 5px 0;
            display: flex;
            justify-content: center;
            .banner_select {
              display: flex;
              flex-direction: column;
              height: 94px;
              justify-content: space-between;
              padding: 28px 10px 0 10px;
              width: 165px;
              .b_s_input {
                input {
                  height: 24px;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
    .threeSinglePicture {
      ul {
        li {
          list-style: none;
          .banner_opaction {
            display: flex;
            flex-direction: column;
            height: 100px;
            justify-content: center;
            padding: 23px 10px 0 10px;
            width: 46px;
          }
          .itemTitle {
            display: flex;
            align-items: center;
            h4 {
              margin: 10px 10px 10px 0;
              line-height: 24px;
              display: flex;
            }
            .aa:before {
              display: inline-block;
              margin-right: 4px;
              color: #f5222d;
              font-size: 14px;
              font-family: SimSun, sans-serif;
              line-height: 1;
              content: "*";
              margin-left: 5px;
            }
          }
          p {
            font-size: 12px;
          }
        }
        .bannerUpload {
          li {
            background: #d7d4d3;
            margin: 5px 0;
            display: flex;
            justify-content: center;
            .banner_select {
              display: flex;
              flex-direction: column;
              height: 94px;
              justify-content: space-between;
              padding: 28px 10px 0 10px;
              width: 165px;
              .b_s_input {
                input {
                  height: 24px;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
    .pickShop {
      ul {
        li {
          list-style: none;
          .banner_opaction {
            display: flex;
            flex-direction: column;
            height: 100px;
            justify-content: center;
            padding: 23px 10px 0 10px;
            width: 46px;
          }
          .itemTitle {
            display: flex;
            align-items: center;
            h4 {
              margin: 10px 10px 10px 0;
              line-height: 24px;
              display: flex;
            }
            .aa:before {
              display: inline-block;
              margin-right: 4px;
              color: #f5222d;
              font-size: 14px;
              font-family: SimSun, sans-serif;
              line-height: 1;
              content: "*";
              margin-left: 5px;
            }
          }
          p {
            font-size: 12px;
          }
        }
        .pickShopUl {
          li {
            background: #d7d4d3;
            margin: 5px 0;
            display: flex;
            justify-content: space-between;
            .pickShop_text {
              display: flex;
              flex-direction: column;
              height: 94px;
              justify-content: space-between;
              padding: 17px 0;
              width: 250px;
              color: #999;
              margin-left: 35px;
              .p_t_input {
                display: flex;
                align-items: center;
                span {
                  width: 55px;
                }
                input {
                  height: 24px;
                  font-size: 12px;
                }
              }
            }
            .pickShop_delete {
              width: 60px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
    .birdOrder {
      .bannerUpload {
        li {
          justify-content: flex-start !important;
          padding-left: 15px;
        }
      }
    }
    .vrPreview {
      .banner_select {
        height: 94px !important;
        padding: 0 !important;
        margin-top: 14px !important;
      }
    }
    .address {
      display: flex;
      background: #d7d4d3;
      justify-content: center;
      height: 38px;
      align-items: center;
      cursor: pointer;
      p {
        margin-left: 8px !important;
      }
    }
  }
}
/deep/ .ant-select-selection--single {
  height: 24px;
}
/deep/ .ant-select-selection__rendered {
  line-height: 24px;
  font-size: 12px;
}
/deep/ .ant-select-dropdown-menu li {
  font-size: 12px;
}
/deep/.ant-card-head-title {
  text-align: left;
}
/deep/.ant-card-body {
  text-align: left;
}
</style>
