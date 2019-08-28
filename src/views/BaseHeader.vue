<template>
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
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu index>
              <template slot="title">
                <img class="me-header-picture" :src="user.avatar"/>
              </template>
              <el-menu-item index @click="logout"><i class="el-icon-back"></i>退出</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>

    </el-row>
		<!--el-row>
			<router-link to="/" class="me-title-next">
			  <img src="../assets/img/background.jpg"/>
      </router-link>
			</el-row-->
  </el-header>
	</div>
</template>

<script type="text/javascript">
import logoSelect from './SearchLogo.vue';

  export default {
		components: {
        'SearchLogo': logoSelect
    },
    name: 'BaseHeader',
    props: {
      activeIndex: String,
      simple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
				myData: [],//用来接收ajax得到的数据
            keyword: '',//v-model绑定的输入框的value
            now: -1,
            searchIndex: 0,
            logoData: [{
                name: '360搜索',
                searchSrc: 'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q='
            }, {
                name: '百度搜索',
                searchSrc: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='
            }, {
                name: '搜狗搜索',
                searchSrc: 'https://www.sogou.com/web?query='
            }]
				/*backgroundDiv: {
					backgroundImage:'url(' + require('../assets/img/background.jpg') + ')',
					backgroundRepeat:'no-repeat',
					backgroundSize:'100%'
    		}*/
			}
    },
    computed: {
      user() {
        let login = this.$store.state.account.length != 0
        let avatar = this.$store.state.avatar
        return {
          login, avatar
        }
      }
    },
    methods: {
			// &event是实参，表示event对象
        get: function(ev) {
            // 如果按得键是上或者下，就不进行ajax
            if (ev.keyCode == 38 || ev.keyCode == 40) {
                return;
            }

            this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + this.keyword + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
                this.myData = res.data.s;
            });
        },
        selectDown: function() {
            this.now++;
            //到达最后一个时，再按下就回到第一个
            if (this.now == this.myData.length) {
                this.now = 0;
            }
            this.keyword = this.myData[this.now];
        },
        selectUp: function() {
            this.now--;
            //同上
            if (this.now == -1) {
                this.now = this.myData.length - 1;
            }
            this.keyword = this.myData[this.now];
        },
        search: function() {
            //打开对应的搜索界面
            window.open(this.logoData[this.searchIndex].searchSrc + this.keyword);
        },
        selectHover: function(index) {
            this.now = index
        },
        selectClick: function(index) {
            this.keyword = this.myData[index];
            this.search();
        },
        clearInput: function() {
            this.keyword = '';
            this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + this.keyword + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
                this.myData = res.data.s;
            });
        },
        getIndex: function(index) {
            this.searchIndex = index;
        },
      logout() {
        let that = this
        this.$store.dispatch('logout').then(() => {
          this.$router.push({path: '/'})
        }).catch((error) => {
          if (error !== 'error') {
            that.$message({message: error, type: 'error', showClose: true});
          }
        })
      }
    }
  }
</script>

<style type="text/css">
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
}

.search-input input {
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    width: 100px;
    height: 30px;
		font-size: 14px;
    float: left;
    padding-left: 5px;
    padding-right: 15px;
    overflow: hidden;
}

.search-btn {
    height: 30px;
    width: 100px;
    border: 1px solid mediumseagreen;
    background-color: mediumseagreen;
    color: white;
    font-size: 16px;
    font-weight: bold;
    float: left;
}

.search-btn {
    cursor: pointer
}

.search-select {
    position: absolute;
    top: 30px;
    width: 110px;
    box-sizing: border-box;
    z-index: 999;
}

.search-select li {
    border: 1px solid #d4d4d4;
    ;
    border-top: none;
    border-bottom: none;
    background-color: #fff;
    width: 100%
}

.search-select-option {
    box-sizing: border-box;
    padding: 7px 10px;
}

.selectback {
    background-color: #eee !important;
    cursor: pointer
}

input::-ms-clear {
    display: none
}

.search-reset {
    width: 20px;
    height: 30px;
    position: absolute;
    display: block;
    line-height: 21px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    left: 75px;
    top: 4px
}

.search-select-list {
    transition: all 0.5s
}

.itemfade-enter,
.itemfade-leave-active {
    opacity: 0;
}

.itemfade-leave-active {
    position: absolute;
}

.selectback {
    background-color: #eee !important;
    cursor: pointer
}
.search-select ul{margin:0;text-align: left; }
</style>
