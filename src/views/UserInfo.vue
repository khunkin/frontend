<template>
  <div id="login" v-title data-title="个人信息">
    <base-header></base-header>

    <div class="user-info me-login-box-radius">
      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="account">
          <div class="head_img">
            <img :src="userForm.avatar" @click="clickAvatarInput()" />
          </div>
        </el-form-item>

        <el-form-item>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            @change="changeAvatar()"
            style="display:none;"
          />
        </el-form-item>

        <el-form-item prop="name">
          <el-input placeholder="昵称" v-model="userForm.name"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="新密码" type="password" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="upload()">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/views/BaseHeader";
import defaultAvatar from "@/assets/img/logo.png";
import { getBase64 } from "@/api/upload";
import { updateUser } from "@/api/user";
import { upload } from "@/api/upload";

export default {
  name: "UserInfo",
  created() {
    this.userForm.name = this.user.name;
    this.userForm.avatar = this.user.avatar;
    this.userForm.account = this.$store.state.account;
  },
  data() {
    return {
      defaultAvatar: defaultAvatar,
      backgroundDiv: {
        backgroundImage:
          "url('https://i.pinimg.com/564x/f7/41/5d/f7415de43c5039a131feedfa42e8b019.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      userForm: {
        name: "",
        password: "",
        avatar: "",
        account: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 4, max: 16, message: "昵称必须为 4 到 16 位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码必须为 6 到 20 位", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    user() {
      let login = this.$store.state.account.length != 0;
      let avatar = this.$store.state.avatar;
      let name = this.$store.state.name;
      return {
        login,
        avatar,
        name
      };
    }
  },
  methods: {
    clickAvatarInput() {
      let that = document.getElementById("avatarInput");
      that.click();
    },
    async changeAvatar() {
      let file = document.getElementById("avatarInput").files[0];
      this.userForm.avatar = await getBase64(file);
    },
    getObjectURL(file) {
      var url = null;
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    upload() {
      let that = this;
      let userForm = this.userForm;
      let user = {
        account: userForm.account,
        avatar: userForm.avatar,
        password: userForm.password,
        nickname: userForm.name
      };

      let loading = this.$loading({
        lock: true,
        text: "修改中，请稍后..."
      });

      updateUser(user)
        .then(data => {
          loading.close();
          that.$message({
            message: "修改成功啦！ 请重新登录~~",
            type: "success",
            showClose: true
          });
          this.$store
            .dispatch("logout")
            .then(() => {
              this.$router.push({ path: "/login" });
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
        })
        .catch(error => {
          loading.close();
          if (error !== "error") {
            that.$message({
              message: error,
              type: "error",
              showClose: true
            });
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

.me-login-button button {
  width: 100%;
}

.el-button {
  transition: 0.2s;
  background-color: rgb(16, 145, 231);
  border-color: rgba(120, 129, 129, 0.616);
}

.el-button--primary:hover,
.el-button--primary:active,
.el-button:focus {
  background-color: rgb(98, 198, 228);
  border-color: rgba(117, 197, 237, 1);
}

.el-form {
  margin-top: 20px;
}
.head_img {
  display: flex;
  justify-content: center; /*水平居中*/
  align-items: Center; /*垂直居中*/
  margin: 0 auto;
}
.head_img img {
  width: 90px;
  height: 90px;
  border-radius: 50px;
}

.setting_right {
  display: flex;
  height: 37px;
  justify-content: flex-end;
  align-items: center;
}

.caption {
  color: #8f8f8f;
  font-size: 26px;
  height: 37px;
}

.hiddenInput {
  display: none;
}

.user-info {
  position: absolute;
  width: 300px;
  height: 420px;
  background-color: white;
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}
</style>
