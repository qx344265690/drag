<template>
  <div class="clearfix">
    <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
      :before-upload="beforeUpload"
      :class="{ backImg: isBackground, headImg: !isBackground }"
    >
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: []
    };
  },
  props: {
    isBackground: {
      type: Boolean,
      default: false
    },
    //  接受个类型看看是哪个模块触发的
    types: {
      type: String,
      default: "店招"
    },
    fileLists: {
      type: Array
    },
    itemIndex: {
      type: Number
    }
  },
  mounted() {
    if (this.fileLists === undefined) {
      return;
    } else {
      this.fileList = this.fileLists;
    }
  },
  methods: {
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      this.isSize(file);
      return isJpgOrPng && isLt2M;
    },
    isSize(file) {
      return new Promise((resolve, reject) => {
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width / img.height === 2;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          console.log("图片尺寸不符合要求，请修改后重新上传！")
          return Promise.reject();
        }
      );
    },
    /**
     * 预览关闭时候触发
     */
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    /**
     * 上传时候触发
     */
    handleChange({ file, fileList }) {
      if (file.status == "removed") {
        // console.log("执行删除");
        this.changeSwitch(fileList);
      }
      if (file.status == "error" || file.status == "done") {
        // console.log("执行上传");
        this.changeSwitch(fileList);
      }
      this.fileList = fileList;
    },
    changeSwitch(fileList) {
      switch (this.types) {
        case "店招":
          this.$emit(
            "changeImg",
            this.isBackground,
            fileList.length === 0 || fileList === undefined ? {} : fileList[0]
          );
          break;
        case "轮播":
          // this.itemIndex 为传进来的下标
          this.$emit(
            "changeBannerImg",
            this.itemIndex,
            this.types,
            fileList.length === 0 || fileList === undefined ? {} : fileList[0]
          );
          break;
        case "单列图片":
          this.$emit(
            "changeBannerImg",
            this.itemIndex,
            this.types,
            fileList.length === 0 || fileList === undefined ? {} : fileList[0]
          );
          break;
        case "双列图片":
          this.$emit(
            "changeBannerImg",
            this.itemIndex,
            this.types,
            fileList.length === 0 || fileList === undefined ? {} : fileList[0]
          );
          break;
        case "三列图片":
          this.$emit(
            "changeBannerImg",
            this.itemIndex,
            this.types,
            fileList.length === 0 || fileList === undefined ? {} : fileList[0]
          );
          break;
        case "订单提报":
          this.$emit(
            "changeBannerImg",
            this.itemIndex,
            this.types,
            fileList.length === 0 || fileList === undefined ? {} : fileList[0]
          );
          break;
        case "图片和文字":
          this.$emit(
            "changeBannerImg",
            this.itemIndex,
            this.types,
            fileList.length === 0 || fileList === undefined ? {} : fileList[0]
          );
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="less" scope>
.backImg {
  width: 330px;
  height: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 10px;
  .ant-upload-list-picture-card-container {
    width: 200px;
    height: 200px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    width: 350px;
    height: 190px;
    border-color: #d1c6c6;
    img {
      object-fit: fill;
    }
  }
  .ant-upload.ant-upload-select-picture-card {
    width: 350px;
    height: 190px;
  }
}
.headImg {
  padding-top: 10px;
}
.ant-modal-body {
  img {
    width: 96%;
    object-fit: fill;
  }
}
.ant-upload-select-picture-card {
  margin-bottom: 0;
}
.ant-upload-list-picture-card .ant-upload-list-item {
  border-color: #d1c6c6;
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
