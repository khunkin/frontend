<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    <div class="me-article-header">

      <a @click="view(id)" class="me-article-title">{{title}}</a>
      <el-button v-if="weight > 0" class="me-article-icon" type="text">置顶</el-button>
      
    </div>

    <div class="me-artile-description">
      {{summary}}
    </div>
    <div class="me-article-footer">
	  	

      <el-tag v-for="t in tags" :key="t.tagname" size="mini" type="success">{{t.tagname}}</el-tag>
      <span class="me-pull-right me-article-count">
	    	<i class="me-icon-comment"></i>&nbsp;{{commentCounts}}
	    </span>
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-view"></i>&nbsp;{{viewCounts}}
	    </span>
      <span class="me-article-count me-pull-right">
	    	<i class="me-icon-author"></i>&nbsp;{{author.nickname}}
	    </span>
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-time"></i>&nbsp;{{createDate | format}}
	    </span>

    </div>
  </el-card>
</template>

<script>
  import { formatTime } from "../../utils/time";

  export default {
    name: 'ArticleItem',
    props: {
      id: Number,
      weight: Number,
      title: String,
      commentCounts: Number,
      viewCounts: Number,
      summary: String,
      author: Object,
      tags: Array,
      createDate: String
    },
    data() {
      return {}
    },
    methods: {
      view(id) {
        this.$router.push({path: `/view/${id}`})
      }
    }
  }
</script>

<style scoped>

  .me-article-header {
    /*padding: 10px 18px;*/
    padding-bottom: 10px;
  }

  .me-article-title {
    font-weight: 600;
<<<<<<< HEAD
    padding-left: 10px;
    border-left: 4px solid rgba(33, 96, 167, 0.8)
=======
    padding-left: 6px;
    border-left: 4px solid #d6dad5;
>>>>>>> 8ad86f0c2e4e0bc7aafe97c397e3cfabe4a6f298
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
    font-size: 15px;
    line-height: 26px;
    margin-bottom: 10px;
  }

  .me-article-author {
    color: #a6a6a6;
    padding-right: 18px;
    font-size: 13px;
  }

  .el-tag {
    margin-left: 6px;
<<<<<<< HEAD
    border-color: rgba(207, 233, 244, 1);
    background-color: rgba(224, 247, 254, 1);
    color: rgba(70, 138, 196, 1);
=======
    background-color: #fff;
    color: #00ccff;
    border-color: #f5f5f5;
>>>>>>> 8ad86f0c2e4e0bc7aafe97c397e3cfabe4a6f298
  }

</style>
