webpackJsonp([13],{"8wPo":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=e("Q6dk"),c=(e("viA7"),e("iNxE")),s=e("dLd/"),i=e.n(s),n={name:"BlogCategoryTag",created:function(){this.getCategoryOrTagAndArticles()},watch:{$route:"getCategoryOrTagAndArticles"},data:function(){return{defaultAvatar:i.a,ct:{},article:{query:{tagId:""}}}},computed:{title:function(){if("tag"===this.$route.params.type)return this.ct.tagname+" - 标签 - MYDG"}},methods:{getCategoryOrTagAndArticles:function(){var t=this.$route.params.id;"tag"===this.$route.params.type&&(this.getTagDetail(t),this.article.query.tagId=t)},getTagDetail:function(t){var a=this;Object(c.d)(t).then(function(t){a.ct=t.data}).catch(function(t){"error"!==t&&a.$message({type:"error",message:"标签加载失败",showClose:!0})})}},components:{ArticleScrollPage:r.a}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"title",rawName:"v-title"}],staticClass:"me-ct-body",attrs:{"data-title":t.title}},[e("el-container",{staticClass:"me-ct-container"},[e("el-main",[e("div",{staticClass:"me-ct-title me-area"},["tag"===this.$route.params.type?[e("img",{staticClass:"me-ct-picture",attrs:{src:t.ct.avatar?t.ct.avatar:t.defaultAvatar}}),t._v(" "),e("h3",{staticClass:"me-ct-name"},[t._v(t._s(t.ct.tagname))])]:[e("img",{staticClass:"me-ct-picture",attrs:{src:t.ct.avatar?t.ct.avatar:t.defaultAvatar}}),t._v(" "),e("h3",{staticClass:"me-ct-name"},[t._v(t._s(t.ct.categoryname))]),t._v(" "),e("p",[t._v(t._s(t.ct.description))])],t._v(" "),e("span",{staticClass:"me-ct-meta"},[t._v(t._s(t.ct.articles)+" 文章")])],2),t._v(" "),e("div",{staticClass:"me-ct-articles"},[e("article-scroll-page",t._b({},"article-scroll-page",t.article,!1))],1)])],1)],1)},staticRenderFns:[]};var o=e("C7Lr")(n,l,!1,function(t){e("uEVp")},null,null);a.default=o.exports},uEVp:function(t,a){}});
//# sourceMappingURL=13.c5afd11612951b432a5d.js.map