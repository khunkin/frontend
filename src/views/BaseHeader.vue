<template>
<<<<<<< HEAD
  <div class="hi-area">
    <el-header class="me-area">
      <el-row class="me-header">
        <el-col :span="4" class="me-header-left">
          <router-link to="/" class="me-title">
            <img src="../assets/img/logo.png" />
          </router-link>
        </el-col>

        <el-col v-if="!simple" :span="16">
          <el-menu
            :router="true"
            menu-trigger="click"
            active-text-color="#00ccff"
            :default-active="activeIndex"
            mode="horizontal"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/myBlog">我的博客</el-menu-item>
            <el-menu-item index="/tag/all">标签</el-menu-item>
            <el-menu-item index="/write">
              <i class="el-icon-edit"></i>博文编写
=======
	<div class="hi-area">
  <el-header class="me-area">
    <el-row class="me-header">

      <el-col :span="4" class="me-header-left">
        <router-link to="/" class="me-title">
          <img src="../assets/img/logo.png"/>
        </router-link>
      </el-col>

      <el-col v-if="!simple" :span="16">
        <el-menu :router=true menu-trigger="click" active-text-color="#00ccff" :default-active="activeIndex"
                 mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>
					<!--个人博文列表名称：我的博客-->
          <el-menu-item index="/myArticles">我的博客</el-menu-item>
          <!--el-menu-item index="/category/all">文章分类</el-menu-item-->
          <el-menu-item index="/tag/all">标签</el-menu-item>
          <el-menu-item index="/write"><i class="el-icon-edit"></i>博文编写</el-menu-item>
          <!--el-menu-item index="/archives">文章归档</el-menu-item>
          <el-menu-item index="/log">日志</el-menu-item>
          <el-menu-item index="/messageBoard">留言板</el-menu-item-->
					
          <el-menu-item index="/follows">关注列表</el-menu-item>
					<el-menu-item>
						<div>
        			<!-- 组件不能写到template的根节点上，即每个组件只有一个根节点，这里的div就是这个template的根节点 -->
       				<!--  getindex是自定义事件 -->
        			<logo-select  @getindex='getIndex'></logo-select>
							<div class="search-input">
								<!-- $event是实参，表示event对象 -->
								<!--
									输入搜索内容即时搜索，所以有一个keyup事件。
									按回车键有一个进入搜索内容页面，所以有一个keydown.enter事件
									按上下键可以选择列表条目
								-->
								<input type="text" v-model="keyword" @keyup="get($event)" @keydown.enter="search()" @keydown.down="selectDown()" @keydown.up.prevent="selectUp()">
								<!-- 这是一个小叉叉，点击它可清除输入框内容 -->
								<span class="search-reset" @click="clearInput()">&times;</span>
								<div class="search-select">
									<!-- transition-group也是vue2.0中的新特性,tag='ul'表示用ul包裹v-for出来的li -->
									<transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
										<li v-for="(value,index) in myData" :class="{selectback:index==now}" class="search-select-option search-select-list" @mouseover="selectHover(index)" @click="selectClick(index)" :key="value">
											{{value}}
										</li>
									</transition-group>
								</div>
							</div>
						</div>
					</el-menu-item>
          <el-menu-item  @click="search()">搜索</el-menu-item>
          <!--el-menu-item index="/search">搜索</el-menu-item-->
          <!--el-col :span="4" :offset="4">
            <el-menu-item index="/write"><i class="el-icon-edit"></i>写文章</el-menu-item>
          </el-col-->
        </el-menu>
      </el-col>

      <template v-else>
        <slot></slot>
      </template>

      <el-col :span="4">
        <el-menu :router=true menu-trigger="click" mode="horizontal" active-text-color="#00ccff">

          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
>>>>>>> 8ad86f0c2e4e0bc7aafe97c397e3cfabe4a6f298
            </el-menu-item>

            <el-menu-item index="/follows">关注列表</el-menu-item>
            <el-menu-item>
              <div>
                <div class="search-input">
                  <input
                    placeholder=" 🔍 搜索"
                    type="text"
                    class="form-control"
                    v-model="keyword"
                    @keydown.enter="search()"
                  />
                </div>
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>

        <template v-else>
          <slot></slot>
        </template>

        <el-col :span="4">
          <el-menu
            :router="true"
            menu-trigger="click"
            mode="horizontal"
            active-text-color="#00ccff"
          >
            <!-- Start If not logged in -->
            <template v-if="!user.login">
              <el-menu-item index="/login">
                <el-button type="text">登录</el-button>
              </el-menu-item>
              <el-menu-item index="/register">
                <el-button type="text">注册</el-button>
              </el-menu-item>
            </template>
            <!-- If logged in -->
            <template v-else>
              <el-submenu index>
                <template slot="title">
                  <!-- <img class="me-header-picture" :src="user.avatar" /> -->
                  <span>{{user.account}}</span>
                </template>
                <el-menu-item index @click="logout">
                  <i class="el-icon-back"></i>退出
                </el-menu-item>
              </el-submenu>
            </template>
            <!-- End If logged in -->
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>


<script type="text/javascript">
import { searchByTitle } from "../utils/search";

export default {
  components: {},
  name: "BaseHeader",
  props: {
    activeIndex: String,
    simple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    user() {
      let login = this.$store.state.account.length != 0;
      let avatar = this.$store.state.avatar;
      let account = this.$store.state.account;
      return {
        login,
        avatar,
        account
      };
    }
  },
  methods: {
    routeSearchResult: function(that, keyword) {
      let path = that.$route.path;
      if (!path.startsWith("/searchResultByTitle")) {
        that.$router.push({ path: `/searchResultByTitle/${keyword}` });
      } else {
        console.log("In result " + keyword);
        // that.$router.replace({ path: `/searchResultByTitle/${keyword}` });
        window.location.href =
          "http://localhost:8080/" + `#/searchResultByTitle/${keyword}`;
        window.location.reload(false);
      }
    },
    search() {
      this.routeSearchResult(this, this.keyword);
    },
    logout: function() {
      let that = this;
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({ message: error, type: "error", showClose: true });
          }
        });
    }
  }
};
</script>

<style type="text/css">
<<<<<<< HEAD
.el-button--text {
  color: #00ccff;
=======
  .el-button--text{
    color: #00ccff;
  }
	.el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  }

  .me-title {
    margin-top: 10px;
    font-size: 24px;
  }

  .me-header-left {
    margin-top: 10px;
  }

  .me-title img {
    max-height: 2.4rem;
    max-width: 100%;
  }

  .me-header-picture {
    width: 36px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #99ccff;
  }
.search-input {
    height: 30px;
    width: 110px;
    margin: 0 auto;
    margin-top: 15px;
    position: relative;
>>>>>>> 8ad86f0c2e4e0bc7aafe97c397e3cfabe4a6f298
}

.el-header {
  position: fixed;
  z-index: 1024;
  min-width: 100%;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
}

.me-title {
  margin-top: 10px;
  font-size: 24px;
}

.me-header-left {
  margin-top: 10px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-header-picture {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #00ccff;
}
.search-input {
  height: 30px;
  width: 210px;
  margin: 0 auto;
  margin-top: 15px;
  margin-left: 50px;
  position: relative;
}

.search-input input {
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  width: 200px;
  height: 30px;
  font-size: 14px;
  float: left;
  padding-left: 5px;
  padding-right: 15px;
  overflow: hidden;
}

input::-ms-clear {
  display: none;
}
</style>
