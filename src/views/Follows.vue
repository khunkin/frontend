<template>
  <scroll-page>
    <div class="me-allct-body">
      <div>
        <div class="search-input">
          <input
            placeholder="🙋‍♂️  搜索更多用户"
            type="text"
            class="form-control"
            v-model="userNameInput"
            @keydown.enter="searchUser()"
          />
        </div>
      </div>
      <el-container class="me-allct-container">
        <el-main>
          <el-tabs>
            <ul class="me-allct-items">
              <li v-for="u in followList" :key="u.id" class="me-allct-item">
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
import CardArticle from "@/components/card/CardArticle";
import ScrollPage from "@/components/scrollpage";
import { getHotArtices } from "@/api/article";
import { searchUser, getFollowList, getUserById } from "@/api/user";

export default {
  name: "Index",
  created() {
    this.getFollowList();
  },
  data() {
    return {
      userNameInput: "",
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
    },
    showBlogPage(account) {
      console.log("Fetching page of " + account);
      this.$router.push({ path: `/showBlog/${account}` });
    },
    routeSearchResult: function(that) {
      let nickName = this.userNameInput;
      // searchUser(nickName).then(data => {
      //   console.log(JSON.stringify(data.data));
      // });
      that.$router.push({ path: `/searchUserByNickname/${nickName}` });
    },
    searchUser(nickName) {
      this.routeSearchResult(this);
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
  background-color: rgba(0, 0, 0, 0);
  /* border: 1px solid #f1f1f1; */
  transition: border-color 0.3s;
  text-align: center;
  padding: 1.5rem 0;
}

.me-allct-content img {
  width: 90px;
  height: 90px;
  border-radius: 50px;
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

.me-allct-description {
  min-height: 50px;
  font-size: 13px;
  line-height: 25px;
}

.me-allct-meta {
  font-size: 12px;
  color: #969696;
}

.search-input {
  height: 30px;
  width: 210px;
  margin: 0 auto;
  margin-top: 15px;
  margin-left: 31px;
  position: relative;
}

.search-input input {
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  width: 300px;
  height: 30px;
  font-size: 14px;
  float: left;
  padding-left: 5px;
  padding-right: 15px;
  overflow: hidden;
}

input::-ms-clear {
  display: none;
}
</style>
