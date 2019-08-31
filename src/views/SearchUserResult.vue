<template>
  <scroll-page>
    <div class="me-allct-body">
      <el-container class="me-allct-container">
        <el-main>
          <h2 style="color:rgba(27, 38, 158, 0.8)">&emsp;&emsp;搜索结果</h2>
          <el-tabs>
            <ul class="me-allct-items">
              <li v-for="u in searchResult" :key="u.id" class="me-allct-item">
                <div class="me-allct-content" style="background-size:100%">
                  <img width="100px" :src="u.avatar" />
                  <br />
                  <a class="me-allct-name" @click="showBlogPage(u.account)">{{u.account}}</a>
                </div>
              </li>
            </ul>
          </el-tabs>
        </el-main>
      </el-container>
    </div>
  </scroll-page>
</template>

<script>
import CardMe from "@/components/card/CardMe";
import CardArticle from "@/components/card/CardArticle";
import CardArchive from "@/components/card/CardArchive";
import CardTag from "@/components/card/CardTag";
import ArticleScrollPage from "@/views/common/ArticleScrollPage";

import {
  getArticles,
  getHotArtices,
  getNewArtices,
  getArticlesByUser,
  getArticlesByTitlecontains,
  listArchives
} from "@/api/article";
import { getHotTags } from "@/api/tag";
// import { searchByTitle } from "../utils/search";
import { searchUser } from "@/api/user";

export default {
  name: "searchUserResult",
  created() {
    console.log("Search user " + this.$route.params.nickName);
    searchUser(this.$route.params.nickName).then(data => {
      console.log(JSON.stringify(data.data));
      this.searchResult = data.data;
    });
    this.getHotArtices();
    this.getNewArtices();
    this.getHotTags();
    this.listArchives();
  },
  data() {
    return {
      searchResult: [],
      hotTags: [],
      hotArticles: [],
      newArticles: [],
      archives: []
    };
  },
  methods: {
    getHotArtices() {
      let that = this;
      getHotArtices()
        .then(data => {
          that.hotArticles = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最热文章加载失败!",
              showClose: true
            });
          }
        });
    },
    showBlogPage(account) {
      console.log("Fetching page of " + account);
      this.$router.push({ path: `/showBlog/${account}` });
    },

    getNewArtices() {
      let that = this;
      getNewArtices()
        .then(data => {
          that.newArticles = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最新文章加载失败!",
              showClose: true
            });
          }
        });
    },
    getHotTags() {
      let that = this;
      getHotTags()
        .then(data => {
          that.hotTags = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最热标签加载失败!",
              showClose: true
            });
          }
        });
    },
    listArchives() {
      listArchives()
        .then(data => {
          this.archives = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章归档加载失败!",
              showClose: true
            });
          }
        });
    }
  },
  components: {
    "card-me": CardMe,
    "card-article": CardArticle,
    "card-tag": CardTag,
    ArticleScrollPage,
    CardArchive
  }
};
</script>

<style scoped>
.me-allct-body {
  margin: 60px auto 140px;
}

.me-allct-container {
  width: 1000px;
}

.me-allct-items {
  padding-top: 2rem;
}

.me-allct-item {
  width: 25%;
  display: inline-block;
  margin-bottom: 2.4rem;
  padding: 0 0.7rem;
  box-sizing: border-box;
}

.me-allct-content {
  display: inline-block;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  /* border: 1px solid #f1f1f1; */
  transition: border-color 0.3s;
  text-align: center;
  padding: 1.5rem 0;
}

.me-allct-info {
  cursor: pointer;
}

.me-allct-img {
  margin: -40px 0 10px;
  width: 60px;
  height: 60px;
  vertical-align: middle;
}

.me-allct-name {
  font-size: 21px;
  font-weight: 150;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 4px;
  color: rgba(76, 180, 231, 0.767) !important;
}
.me-allct-name:hover {
  font-size: 21px;
  font-weight: 150;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 4px;
  color: rgba(39, 176, 245, 0.575) !important;
  text-decoration: underline !important;
}
.me-allct-content img {
  width: 90px;
  height: 90px;
  border-radius: 50px;
}

.me-allct-description {
  min-height: 50px;
  font-size: 13px;
  line-height: 25px;
}

.me-allct-meta {
  font-size: 12px;
  color: #969696;
}
</style>
