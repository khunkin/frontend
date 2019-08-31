<template>
  <div id="register" v-title data-title="注册 - For Fun" @keydown.enter="start('userForm')">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">
          <source src="../../static/vedio/sea.mp4" type="video/mp4">
    </video>-->
    <base-header></base-header>

    <div class="me-login-box me-login-box-radius" :style="backgroundDiv">
      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="account">
          <el-input placeholder="手机号" v-model="userForm.account"></el-input>
        </el-form-item>

        <el-form-item prop="nickname">
          <el-input placeholder="昵称" v-model="userForm.nickname"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="userForm.password"></el-input>
        </el-form-item>

        <template v-if="!sentCapcha">
          <el-form-item size="small" class="me-login-button">
            <el-button type="primary" @click.native.prevent="getCapcha()">获取 4 四位验证码</el-button>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item prop="capcha">
            <el-input placeholder="验证码" v-model="userForm.capcha"></el-input>
          </el-form-item>
          <el-form-item size="small" class="me-login-button">
            <el-button type="primary" @click.native.prevent="register('userForm')">注册</el-button>
          </el-form-item>
        </template>
      </el-form>

      <div class="me-login-design">
        <p>
          <span class="me-login-design-pure-text">已有账号？</span>
          <strong>
            <router-link to="/login" class="me-login-design-color">登录</router-link>
          </strong>

          <strong>
            <router-link to="/" class="me-login-design-color">回首页</router-link>
          </strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/views/BaseHeader";
import { register, getCapcha } from "@/api/login";

export default {
  name: "Register",
  data() {
    return {
      sentCapcha: false,
      rightCapcha: "",
      backgroundDiv: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      userForm: {
        account: "",
        nickname: "",
        password: "",
        capcha: ""
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入正确的手机号",
            trigger: "blur"
          },
          { min: 11, max: 11, message: "请输入 11 位手机号" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 4, max: 16, message: "昵称必须为 4 到 16 位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码必须为 6 到 20 位", trigger: "blur" }
        ],
        capcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码为 4 位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getCapcha() {
      if (this.userForm.account.length === 11) {
        console.log("Getting capcha of " + this.userForm.account);
        getCapcha(this.userForm.account).then(data => {
          this.rightCapcha = data.data.obj;
          console.log("Right capcha is " + this.rightCapcha);
          this.sentCapcha = true;
        });
      } else {
        this.$message({
          message: "请先填写正确的手机号",
          type: "error",
          showClose: true
        });
      }
    },
    start(formName) {
      if (!this.sentCapcha) {
        this.getCapcha();
      } else {
        this.register(formName);
      }
    },
    register(formName) {
      if (this.rightCapcha != this.userForm.capcha) {
        this.$message({
          message: "验证码错误",
          type: "error",
          showClose: true
        });
        return;
      }
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.$store
            .dispatch("register", that.userForm)
            .then(() => {
              that.$message({
                message: "注册成功 快写文章吧",
                type: "success",
                showClose: true
              });
              that.$router.push({ path: "/" });
            })
            .catch(error => {
              if (error !== "error") {
                that.$message({
                  message: error,
                  type: "error",
                  showClose: true
                });
              }
            });
        } else {
          return false;
        }
      });
    }
  },
  components: {
    "base-header": BaseHeader
  }
};
</script>

<style scoped>
#login {
  min-width: 100%;
  min-height: 100%;
}

.el-form {
  margin-top: 20px;
}

.login-title {
  padding-top: 20px;
  padding-bottom: 60px;
  letter-spacing: 35px;
  padding-left: 40px;
  text-align: center;
}

.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: absolute;
  left: 0;
  z-index: 0;
  top: 0;
}

.me-login-box {
  position: absolute;
  width: 300px;
  height: 356px;
  background-color: white;
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}

.me-login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
}

.me-login-box h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  vertical-align: middle;
}

.me-login-design {
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  margin-top: 45px;
}

.me-login-design-pure-text {
  opacity: 0.5;
}

.me-login-design-color {
  transition: 0.1s;
  color: #00ccff !important;
  opacity: 0.5;
}

.me-login-design-color:focus,
.me-login-design-color:active,
.me-login-design-color:hover {
  opacity: 1;
  text-decoration: none;
}

.me-login-button {
  text-align: center;
}

.el-button--primary {
  transition: 0.2s;
}

.el-button--primary:hover,
.el-button--primary:active,
.el-button:focus {
  color: rgba(70, 138, 196, 1);
  background-color: rgba(224, 247, 254, 1);
  border-color: rgba(117, 197, 237, 1);
}

.me-login-button button {
  width: 100%;
}
</style>