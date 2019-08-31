<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    <div class="me-article-header">
      <a @click="view(id)" class="me-article-title">{{title}}</a>
      <el-button v-if="weight > 0" class="me-article-icon" type="text">置顶</el-button>
      <span class="me-pull-right me-article-count">
        <i class="me-icon-comment"></i>
        &nbsp;{{commentCounts}}
      </span>
      <span class="me-pull-right me-article-count">
        <i class="icon-liulan"></i>
        &nbsp;{{viewCounts}}
      </span>
      <span class="me-pull-right me-article-count">
        <i class="icon-xihuan"></i>
        &nbsp;{{likeCount}}
      </span>
    </div>

    <div class="me-artile-description">{{summary}}</div>
    <div class="me-article-footer">
      <span class="me-article-author" style>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiugaitouxiang" />
        </svg>
        &nbsp;{{author.nickname}}
      </span>

      <el-tag
        @click="tagOrCategory('tag', t.id)"
        v-for="t in tags"
        :key="t.id"
        class="me-view-tag-item"
        size="mini"
        type="success"
      >{{t.tagname}}</el-tag>

      <span class="me-pull-right me-article-count">
        <i class="el-icon-time"></i>
        &nbsp;{{createDate | format}}
      </span>
    </div>
  </el-card>
</template>

<script>
import { formatTime } from "../../utils/time";

export default {
  name: "ArticleItem",
  props: {
    id: Number,
    weight: Number,
    title: String,
    commentCounts: Number,
    viewCounts: Number,
    summary: String,
    author: Object,
    tags: Array,
    createDate: String,
    likeCount: Number
  },
  created() {
    console.log("Tags" + JSON.stringify(this.tags));
  },
  data() {
    return {};
  },
  methods: {
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    tagOrCategory(type, id) {
      this.$router.push({ path: `/${type}/${id}` });
    }
  }
};
</script>

<style scoped>
.me-article-header {
  /*padding: 10px 18px;*/
  padding-bottom: 10px;
}

.me-article-title {
  font-weight: 600;
  padding-left: 10px;
  border-left: 4px solid rgba(33, 96, 167, 0.8);
}

.me-article-icon {
  padding: 3px 8px;
}

.me-article-count {
  color: #a6a6a6;
  padding-left: 14px;
  font-size: 13px;
}

.me-pull-right {
  float: right;
}

.me-artile-description {
  font-size: 13px;
  line-height: 24px;
  margin-bottom: 10px;
}

.me-article-author {
  color: #a6a6a6;
  padding-right: 18px;
  font-size: 13px;
}

.el-tag {
  margin-left: 6px;
  border-color: rgba(140, 175, 206, 0.2);
  background-color: rgba(184, 236, 252, 0.432);
  color: rgba(31, 111, 181, 0.8);
}

.me-view-tag-item {
  margin: 0 4px;
  border-color: rgba(140, 175, 206, 0.2);
  background-color: rgba(184, 236, 252, 0.432);
  color: rgba(31, 111, 181, 0.8);
}

.me-view-tag-item:hover {
  /* font-size: 12px; */
  /* border: none; */
  transition: all 0.2s;
  color: white;
  background-color: rgba(76, 180, 231, 0.767);
  border-color: rgb(76, 180, 231, 0.467);
  cursor: pointer;
}
</style>
