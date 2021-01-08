<template>
  <div class="login">
    <!-- <div class="l-img">图片图片图片</div> -->
    <div class="l-form">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              }
            ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              }
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true
              }
            ]"
          >
            Remember me
          </a-checkbox>
          <a class="login-form-forgot" href="#/passWord">
            Forgot password
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            Log in
          </a-button>
          Or
          <a href="#/register">
            register now!
          </a>
        </a-form-item>
      </a-form>
    </div>
    <!-- <div class="l-img">
      <p>账号：qixin; 密码：123;</p>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { setItem } from "@/util/localStorage";
export default {
  data() {
    return {
      msg: this.$store.state.user.count || 0
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  computed: {
    msgs() {
      return this.$store.state.user.count;
    }
  },
  methods: {
    ...mapActions(["Login"]),
    /**
     * @describe 登录
     */
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // 修改store状态
          let datas = {
            userName: values.userName,
            password: values.password
          };
          this.$store.dispatch("changeInfo", datas);
          // 存储在localStorage
          setItem("userInfo", datas);
          // vuex中方法
          this.Login().then(res => {
            console.log(res);
          });
          if (!values.remember) {
            return this.$message.warning("点击Remember me");
          }
          if (values.userName === "qixin" && values.password === "123") {
            this.$message.success("欢迎光临");
            this.$router.push({ path: "/" });
          } else {
            this.$message.error("登录名或密码错误！");
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  // background-image: url("../../assets/user/back.jpg");
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
  .ant-form-item {
    text-align: left;
  }
}
</style>
