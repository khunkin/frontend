<template>
  <div class="me-ct-body" v-title :data-title="title">
    <el-container class="me-ct-container">
      <el-main>
        <div class="me-ct-title me-area">
          <template v-if="this.$route.params.type === 'tag'">
            <img class="me-ct-picture" :src="ct.avatar?ct.avatar:defaultAvatar" />
            <h3 class="me-ct-name">{{ct.tagname}}</h3>
          </template>

          <template v-else>
            <img class="me-ct-picture" :src="ct.avatar?ct.avatar:defaultAvatar" />
            <h3 class="me-ct-name">{{ct.categoryname}}</h3>
            <p>{{ct.description}}</p>
          </template>

          <span class="me-ct-meta">{{ct.articles}} 文章</span>
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
          tagId: ""
        }
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
</style>
