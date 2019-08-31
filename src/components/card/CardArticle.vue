<template>
  <el-card :body-style="{ padding: '8px 18px' }">
    <div slot="header" class="me-category-header">
      <span>{{cardHeader}}</span>
    </div>

    <ul class="me-category-list">
      <li
        v-for="a in articles"
        @click="view(a.id)"
        :style="itemStyle"
        :key="a.id"
        class="me-category-item"
      >
        <a class="me-category-title">{{a.title}}</a>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  name: "CardArticle",
  props: {
    cardHeader: {
      type: String,
      required: true
    },
    articles: {
      type: Array,
      required: true
    },
    itemStyle: Object
  },
  data() {
    return {};
  },
  methods: {
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    }
  }
};
</script>

<style scoped>
.me-category-header {
  font-size: 22px;
  font-weight: 1000;
  font-family: YouYuan;
}

.me-category-list {
  list-style-type: none;
}

.me-category-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 24px;
  padding: 4px;
  font-size: 14px;
  color: #00ccff;
}

.me-category-item a:hover {
  font-size: 15px;
  text-decoration: underline;
}

.me-category-title {
  transition: all 0.15s;
}
</style>
