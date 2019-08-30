<template>
  <scroll-page>
    <div class="me-allct-body">
      <el-container class="me-allct-container">
        <el-main>
          <el-tabs>
            <ul class="me-allct-items">
              <li v-for="u in followList" :key="u.id" class="me-allct-item">
                <div class="me-allct-content" style="background-size:100%">
                  <a class="me-allct-info"></a>
                    <img width="100px" :src="defaultAvatar" />
                  <h4 class="me-allct-name">{{u.account}}</h4>
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
import CardArticle from "@/components/card/CardArticle";
import ScrollPage from "@/components/scrollpage";
import { getHotArtices } from "@/api/article";
import { getFollowList, getUserById } from "@/api/user";

export default {
  name: "Index",
  created() {
    this.getFollowList();
  },
  data() {
    return {
      followList: [],
      defaultAvatar:
        "https://i.pinimg.com/474x/18/1b/67/181b67f3d93016e8fe06c52f567cc6ac.jpg"
    };
  },
  methods: {
    getFollowList() {
      let userName = this.$store.state.account;
      getFollowList(userName).then(data => {
        let follows = [];
        var user;
        for (user of data.data) {
          getUserById(user.followerId).then(data => {
            follows.push(data.data);
          });
        }
        this.followList = follows;
      });
    }
  },
  components: {
    "scroll-page": ScrollPage
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
  background-color: #fff;
  border: 1px solid #f1f1f1;
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
