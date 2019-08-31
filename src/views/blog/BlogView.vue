<template>
  <div class="me-view-body" v-title :data-title="title">
    <el-container class="me-view-container">
      <el-main>
        <div class="me-view-card">
          <h1 class="me-view-title">{{article.title}}</h1>
          <el-row type="flex" justify="end">
            <el-col :span="2">
              <a class>
                <img class="me-view-picture" :src="article.author.avatar" />
              </a>
            </el-col>
            <el-col :span="6">
              <div class="me-view-info">
                <span>{{article.author.nickname}}</span>
                <div class="me-view-meta">
                  <span>{{article.createDate | format}}</span>
                  <span>阅读 {{article.viewCounts}}</span>
                  <span>评论 {{article.commentCounts}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="15"></el-col>
            <el-col :span="4">
              <template v-if="!user.login"></template>
              <template v-else-if="user.name==article.author.nickname">
                <el-button
                  v-if="this.article.author.id == this.$store.state.id"
                  @click="editArticle()"
                  size="mini"
                  round
                  icon="el-icon-edit"
                >编辑</el-button>
              </template>
              <template v-else-if="isFollowing">
                <el-button @click="unfollowAuthor()" size="mini" round>已关注</el-button>
              </template>
              <template v-else>
                <el-button @click="followAuthor()" size="mini" round>关注</el-button>
              </template>
            </el-col>
          </el-row>
          <div class="me-view-content">
            <markdown-editor :editor="article.editor"></markdown-editor>
          </div>

          <!-- <div class="me-view-end">
            <el-alert title="" type="success" center :closable="false"></el-alert>
          </div>-->

          <div class="me-view-tag">
            标签：
            <el-tag
              @click="tagOrCategory('tag', t.id)"
              v-for="t in article.tags"
              :key="t.id"
              class="me-view-tag-item"
              size="mini"
              type="success"
            >{{t.tagname}}</el-tag>
            <template v-if="!user.login"></template>
            <template v-else-if="!isLiking">
              <el-button style="float: right;" @click="likeArticle()" size="mini" round>
                <i class="icon-xihuan"></i>
                &nbsp;Like
              </el-button>
            </template>
            <template v-else>
              <el-button style="float: right;" @click="unLikeArticle()" size="mini" round>
                <i class="icon-xihuan"></i>
                &nbsp;Unlike
              </el-button>
            </template>
          </div>
          <div class="me-view-comment">
            <div class="me-view-comment-write">
              <el-row :gutter="20">
                <el-col :span="2">
                  <a class>
                    <img class="me-view-picture" :src="avatar" />
                  </a>
                </el-col>
                <el-col :span="22">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2}"
                    placeholder="你的评论..."
                    class="me-view-comment-text"
                    v-model="comment.content"
                    resize="none"
                  ></el-input>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="2" :offset="22">
                  <el-button type="text" @click="publishComment()">评论</el-button>
                </el-col>
              </el-row>
            </div>

            <div class="me-view-comment-title">
              <span>{{article.commentCounts}} 条评论</span>
            </div>

            <commment-item
              v-for="(c,index) in comments"
              :comment="c"
              :articleId="article.id"
              :index="index"
              :rootCommentCounts="comments.length"
              @commentCountsIncrement="commentCountsIncrement"
              :key="c.id"
            ></commment-item>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import CommmentItem from "@/components/comment/CommentItem";
import { viewArticle } from "@/api/article";
import { getCommentsByArticle, publishComment } from "@/api/comment";
import {
  follow,
  isFollowing,
  unfollow,
  isLiking,
  like,
  unlike
} from "@/api/user";

import default_avatar from "@/assets/img/default_avatar.png";

export default {
  name: "BlogView",
  created() {
    this.getArticle();
  },
  watch: {
    $route: "getArticle"
  },
  data() {
    return {
      isFollowing: false,
      isLiking: false,
      article: {
        id: "",
        title: "",
        commentCounts: 0,
        viewCounts: 0,
        summary: "",
        author: {},
        tags: [],
        category: {},
        createDate: "",
        editor: {
          value: "",
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: "preview"
        }
      },
      comments: [],
      comment: {
        article: {},
        content: ""
      }
    };
  },
  computed: {
    avatar() {
      let avatar = this.$store.state.avatar;

      if (avatar.length > 0) {
        return avatar;
      }
      return default_avatar;
    },
    title() {
      return `${this.article.title} - 文章 - MYDG`;
    },
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
    checkIsFollowing() {
      let userId = this.$store.state.id;
      let toCheck = this.article.author.id;
      console.log("Check between " + userId + " " + toCheck);
      isFollowing(userId, toCheck).then(data => {
        this.isFollowing = data.data;
        console.log(this.isFollowing ? "Following" : "Not yet");
      });
      isLiking(userId, this.article.id).then(data => {
        this.isLiking = data.data;
        console.log(this.isLiking ? "Liking" : "Not yet (liking thing)");
      });
    },
    likeArticle() {
      let userId = this.$store.state.id;
      let articleId = this.article.id;
      console.log("Try like " + userId + ", " + articleId);
      like(userId, articleId)
        .then(data => {
          this.isLiking = true;
        })
        .catch(error => {
          console.log("This is an error you do not want to show to others");
        });
    },
    unLikeArticle() {
      let userId = this.$store.state.id;
      let articleId = this.article.id;
      console.log("Try unlike " + userId + ", " + articleId);
      unlike(userId, articleId)
        .then(data => {
          this.isLiking = false;
        })
        .catch(error => {
          console.log("This is an error you do not want to show to others");
        });
    },
    followAuthor() {
      let userId = this.$store.state.id;
      let toFollowId = this.article.author.id;
      console.log("Try follow " + userId, toFollowId);
      follow(userId, toFollowId)
        .then(data => {
          this.isFollowing = true;
        })
        .catch(error => {
          console.log("This is an error you do not want to show to others");
        });
    },
    unfollowAuthor() {
      let userId = this.$store.state.id;
      let toFollowId = this.article.author.id;
      console.log("Try unfollow " + userId, toFollowId);
      unfollow(userId, toFollowId)
        .then(data => {
          this.isFollowing = false;
        })
        .catch(error => {
          console.log(
            "This is another error you do not want to show to others"
          );
        });
    },
    tagOrCategory(type, id) {
      this.$router.push({ path: `/${type}/${id}` });
    },
    editArticle() {
      this.$router.push({ path: `/write/${this.article.id}` });
    },
    getArticle() {
      let that = this;
      viewArticle(that.$route.params.id)
        .then(data => {
          Object.assign(that.article, data.data);
          console.log(JSON.stringify(that.article.author.id));
          that.article.editor.value = data.data.body.content;
          that.getCommentsByArticle();
          if (this.user.login) {
            that.checkIsFollowing();
          }
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章加载失败",
              showClose: true
            });
          }
        });
    },
    publishComment() {
      let that = this;
      if (!that.comment.content) {
        return;
      }
      that.comment.article.id = that.article.id;

      publishComment(that.comment)
        .then(data => {
          that.$message({
            type: "success",
            message: "评论成功",
            showClose: true
          });
          that.comments.unshift(data.data);
          that.commentCountsIncrement();
          that.comment.content = "";
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "评论失败",
              showClose: true
            });
          }
        });
    },
    getCommentsByArticle() {
      let that = this;
      getCommentsByArticle(that.article.id)
        .then(data => {
          that.comments = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "评论加载失败",
              showClose: true
            });
          }
        });
    },
    commentCountsIncrement() {
      this.article.commentCounts += 1;
    }
  },
  components: {
    "markdown-editor": MarkdownEditor,
    CommmentItem
  },
  //组件内的守卫 调整body的背景色
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = "#fff";
    next();
  },
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = "#f5f5f5";
    next();
  }
};
</script>

<style>
.me-view-body {
  margin: 70px auto 140px;
}

.me-view-container {
  width: 700px;
}

.el-main {
  overflow: hidden;
}

.me-view-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.7em;
}

.me-view-author {
  /*margin: 30px 0;*/
  margin-top: 30px;
  vertical-align: middle;
}

.me-view-picture {
  width: 40px;
  height: 40px;
  /* border: 1px solid black; */
  border-radius: 50%;
  vertical-align: middle;
  /* background-color: #00ccff; */
}

.me-view-info {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}

.me-view-meta {
  font-size: 12px;
  color: #969696;
}

.me-view-end {
  margin-top: 20px;
}

.me-view-tag {
  margin-top: 20px;
  padding-left: 6px;
  border-left: 4px solid #c5cac3;
}

.me-view-tag-item {
  margin: 0 4px;
  border-color: rgba(140, 175, 206, 0.2);
  background-color: rgba(184, 236, 252, 0.432);
  color: rgba(31, 111, 181, 0.8);
}

.me-view-tag-item:hover {
  font-size: 14px;
  border: none;
  transition: all 0.2s;
  color: white;
  background-color: rgba(76, 180, 231, 0.767);
  border-color: rgb(76, 180, 231, 0.467);
  cursor: pointer;
}

.me-view-comment {
  margin-top: 60px;
}

.me-view-comment-title {
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}

.me-view-comment-write {
  margin-top: 20px;
}

.me-view-comment-text {
  font-size: 16px;
}

.v-show-content {
  padding: 8px 25px 15px 0px !important;
}

.v-note-wrapper .v-note-panel {
  box-shadow: none !important;
}

.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background: #fff !important;
}

.el-button--primary {
  /* border: none; */
  color: white;
  background-color: rgba(76, 180, 231, 0.767);
  border-color: rgb(76, 180, 231, 0.467);
}

.el-button--primary.is-plain:hover {
  /* border: none; */
  color: white;
  background-color: rgba(76, 180, 231, 0.767);
  border-color: rgb(76, 180, 231, 0.467);
}
</style>
