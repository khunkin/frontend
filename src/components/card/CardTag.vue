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
    name: 'CardTag',
    props: {
      tags: Array
    },
    data() {
      return {}
    },
    methods: {
      moreTags() {
        this.$router.push('/tag/all')
      },
      tag(id) {
        this.$router.push({path: `/tag/${id}`})
      }
    }
  }
</script>

<style scoped>

  .me-tag-header {
    font-weight: 600;
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
</style>
