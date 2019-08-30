<template>
  <div class="me-ct-body" v-title :data-title="title">
    <el-container class="me-ct-container">
      <el-main>
        <div class="me-ct-title me-area" style="margin-top:20px; background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1008350624,30248350&fm=26&gp=0.jpg');">
          <template>
            <img :src="user.avatar?user.avatar:defaultAvatar" alt="头像" />
            <h3 class="me-ct-name">{{user.account}}</h3>
          </template>
        </div>

        <div class="me-ct-articles">
          <article-scroll-page v-bind="article"></article-scroll-page>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ArticleScrollPage from "@/views/common/ArticleScrollPage";
import { getArticlesByTag } from "@/api/article";
import { getTagDetail } from "@/api/tag";
import defaultAvatar from "@/assets/img/logo.png";

export default {
  name: "BlogCategoryTag",
  created() {
    console.log("User " + this.user.account);
    this.article.query.userName = this.user.account;
    console.log("User " + this.article.query.userName);
    this.getCategoryOrTagAndArticles();
  },
  watch: {
    $route: "getCategoryOrTagAndArticles"
  },
  data() {
    return {
      defaultAvatar: defaultAvatar,
      ct: {},
      article: {
        query: {
          userName: ""
        }
      }
    };
  },
  computed: {
    title() {
      if (this.$route.params.type === "tag") {
        return `${this.ct.tagname} - 标签 - For Fun`;
      }
    },
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
    getCategoryOrTagAndArticles() {
      let id = this.$route.params.id;
      let type = this.$route.params.type;
      if ("tag" === type) {
        this.getTagDetail(id);
        this.article.query.tagId = id;
      } else {
      }
    },
    getTagDetail(id) {
      let that = this;
      getTagDetail(id)
        .then(data => {
          that.ct = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "标签加载失败",
              showClose: true
            });
          }
        });
    }
  },
  components: {
    ArticleScrollPage
  }
};
</script>

<style>
.me-ct-body {
  margin: 60px auto 140px;
  min-width: 100%;
}

.el-main {
  padding: 0;
}

.me-ct-title {
  text-align: center;
  height: 150px;
  padding: 20px;
}

.me-ct-picture {
  width: 60px;
  height: 60px;
}

.me-ct-name {
  font-size: 28px;
}

.me-ct-meta {
  font-size: 12px;
  color: #969696;
}

.me-ct-articles {
  width: 640px;
  margin: 30px auto;
}

.me-area {
  background-size: 100%;
  width: 640px;
  margin: 0 auto;
}
</style>
