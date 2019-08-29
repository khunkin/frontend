<template>
  <div id="login" v-title data-title="登录 - For Fun">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">
          <source src="../../static/vedio/sea.mp4" type="video/mp4">
    </video>-->
    <base-header></base-header>

    <div class="me-login-box me-login-box-radius" :style="backgroundDiv">
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
<<<<<<< HEAD
            没有账号？  
          </span>
          
=======
          没有账号？
          </span>
>>>>>>> 8ad86f0c2e4e0bc7aafe97c397e3cfabe4a6f298
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
        backgroundImage: "url('https://i.pinimg.com/564x/f7/41/5d/f7415de43c5039a131feedfa42e8b019.jpg')",
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
<<<<<<< HEAD
              that.$router.push({ path: "/" });
=======
              that.$router.push({path:`/`});
              // that.$router.go(-1);
              console.log(that.$router);
>>>>>>> 8ad86f0c2e4e0bc7aafe97c397e3cfabe4a6f298
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
  background: #00ccff;
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
  height: 248px;
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
  margin-top: 48px;
}

.me-login-design-pure-text{
  opacity: 0.5;
}

.me-login-design-pure-text{
  opacity: 0.5;
}

.me-login-design-color {
<<<<<<< HEAD
  transition: 0.1s;
  color: #00ccff !important;
  opacity: 0.5;
}

.me-login-design-color:focus,
.me-login-design-color:active,
.me-login-design-color:hover
{
  opacity: 1;
  text-decoration: none;
=======
  color: #00ccff !important; 
  opacity: 0.5;
}
.me-login-design-color:hover{
  opacity: 1;
>>>>>>> 8ad86f0c2e4e0bc7aafe97c397e3cfabe4a6f298
}

.me-login-button {
  text-align: center;
}

.me-login-button button {
  width: 100%;
}

.el-button{
  transition: 0.2s;
  background-color: rgba(0, 238, 255,1);
  border-color: rgba(0, 238, 255,1);
}

.el-button--primary:hover, 
.el-button--primary:active, 
.el-button:focus{
  color: rgba(70, 138, 196, 1);
  background-color: rgba(224, 247, 254, 1);
  border-color: rgba(117, 197, 237, 1);
}

.el-form{
  margin-top: 20px;
}
</style>
