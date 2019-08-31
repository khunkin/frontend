<template>
  <div class="me-ct-body" v-title :data-title="title">
    <el-container class="me-ct-container">
      <el-main>
        <div class="me-ct-title me-area" :style="backgroundDiv">
          <template>
            <img class="my-blog-avatar" :src="user.avatar" alt="头像" />
            <h3 class="me-ct-name">{{user.nickname}}</h3>
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
import { getUserByAccount } from "@/api/user";

export default {
  name: "ShowBlog",
  created() {
    this.article.query.userName = this.$route.params.account;
    getUserByAccount(this.article.query.userName).then(data => {
      this.user = data.data;
    });
  },
  data() {
    return {
      user: {},
      article: {
        query: {
          userName: ""
        }
      },
      backgroundDiv: {
        backgroundImage:
          "url(" + require("../../src/assets/img/test3.jpg") + ")",
        backgroundRepeat: "repeat",
        backgroundSize: "100%",
        marginTop: "20px"
      }
    };
  },
  computed: {
    title() {
      if (this.$route.params.type === "tag") {
        return `${this.ct.tagname} - 标签 - MYDG`;
      }
    }
  },
  methods: {},
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
  /* background-size: 100%; */
  width: 640px;
  margin: 0 auto;
}

.my-blog-avatar {
  width: 90px;
  height: 90px;
  /* border: 1px solid #ddd; */
  border-radius: 50%;
  vertical-align: middle;
  /* background-color: #00ccff; */
}
</style>
