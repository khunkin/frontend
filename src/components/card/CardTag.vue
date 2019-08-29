<template>
  <el-card :body-style="{ padding: '8px 18px' }">
    <div slot="header" class="me-tag-header">
      <span>热门标签</span>
      <a @click="moreTags" class="me-pull-right me-tag-more">more→</a>
    </div>

    <ul class="me-tag-list">
      <li class="me-tag-item" v-for="t in tags" :key="t.id">
        <el-button class="me-tag-button" @click="tag(t.id)" size="middle" type="text" round plain>{{t.tagname}}</el-button>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  name: "CardTag",
  props: {
    tags: Array
  },
  data() {
    return {};
  },
  methods: {
    moreTags() {
      this.$router.push("/tag/all");
    },
    tag(id) {
      this.$router.push({ path: `/tag/${id}` });
    }
  }
};
</script>

<style scoped>
.me-tag-header {
   font-size: 20px;
  font-weight: 800;
  font-family: FangSong;
}

.me-tag-more {
  font-size: 14px;
  color: #78b6f7;
}

.me-tag-list {
  list-style-type: none;
}

.me-tag-item {
  transition: all 0.5s;
  display: inline-block;
  padding: 4px;
  font-size: 14px;
  color: white;
}

<<<<<<< HEAD
.el-button--primary {
  border-color: rgba(140, 175, 206, 0.2);
  background-color: rgba(184, 236, 252, 0.432);
  color: rgba(31, 111, 181, 0.8);
}

.el-button--primary.is-plain:hover {
  font-size: 18px;
  border: none;
  transition: all 0.2s;
  color: white;
  background-color: rgba(76, 180, 231, 0.767);
  border-color: rgb(76, 180, 231, 0.467);
}
=======
  .me-tag-item {
    transition: all 0.5s;
    display: inline-block;
    padding: 4px;
    font-size: 14px;
    color: #00ccff;
  }

  .me-tag-item :hover {
    text-decoration: underline;
    color: #003366;
    font-size: 15px;
  }

  .me-tag-button {
    border: 0;
    color: #00CCFF;
    padding: 0;
  } 
>>>>>>> 8ad86f0c2e4e0bc7aafe97c397e3cfabe4a6f298
</style>
