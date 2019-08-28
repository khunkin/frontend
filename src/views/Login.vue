<template>
  <div id="login" v-title data-title="登录 - For Fun">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">
          <source src="../../static/vedio/sea.mp4" type="video/mp4">
    </video>-->
    <base-header></base-header>

    <div class="me-login-box me-login-box-radius" :style="backgroundDiv">
      <div class="login-title">
        <h2 align="center" style="color:#8B0A50;size:px">登录</h2>
      </div>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="account">
          <el-input placeholder="用户名" v-model="userForm.account"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="login('userForm')">登录</el-button>
        </el-form-item>
      </el-form>

      <div class="me-login-design">
        <p>
          <span class="me-login-design-pure-text">
          没有账号？
          </span>
          <strong>
            <router-link to="/register" class="me-login-design-color">注册</router-link>
          </strong>
          <strong>
            <router-link to="/" class="me-login-design-color">返回首页</router-link>
          </strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/views/BaseHeader'

export default {
  name: "Login",
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("../assets/img/background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      userForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login(formName) {
      let that = this;

      this.$refs[formName].validate(valid => {
        if (valid) {
          that.$store
            .dispatch("login", that.userForm)
            .then(() => {
              that.$router.push({path:`/`});
              // that.$router.go(-1);
              console.log(that.$router);
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
  components : {
    'base-header': BaseHeader,
  }
};
</script>

<style scoped>
body {
  background: #5fb878;
}
#login {
  min-width: 100%;
  min-height: 100%;
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
  height: 258px;
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
}

.me-login-design-pure-text{
  opacity: 0.5;
}

.me-login-design-color {
  color: #5fb878 !important; 
  opacity: 0.5;
}
.me-login-design-color:hover{
  opacity: 1;
}

.me-login-button {
  text-align: center;
}

.me-login-button button {
  width: 100%;
}
</style>
