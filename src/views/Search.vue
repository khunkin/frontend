<template>
    <div>
        <!-- 组件不能写到template的根节点上，即每个组件只有一个根节点，这里的div就是这个template的根节点 -->
       <!--  getindex是自定义事件 -->
        <logo-select  @getindex='getIndex'></logo-select>
        <div class="search-input">
            <!-- $event是实参，表示event对象 -->
            <!--
                输入搜索内容即时搜索，所以有一个keyup事件。
                按回车键有一个进入搜索内容页面，所以有一个keydown.enter事件
                按上下键可以选择列表条目
            -->
            <input type="text" v-model="keyword" @keyup="get($event)" @keydown.enter="search()" @keydown.down="selectDown()" @keydown.up.prevent="selectUp()">
            <!-- 这是一个小叉叉，点击它可清除输入框内容 -->
            <span class="search-reset" @click="clearInput()">&times;</span>
            <!--button class="search-btn" @click="search()">搜一下hiahiahia</button-->
            <div class="search-select">
            <!-- transition-group也是vue2.0中的新特性,tag='ul'表示用ul包裹v-for出来的li -->
                <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
                    <li v-for="(value,index) in myData" :class="{selectback:index==now}" class="search-select-option search-select-list" @mouseover="selectHover(index)" @click="selectClick(index)" :key="value">
                        {{value}}
                    </li>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
// import xxx from someSrc     es6中得到模块的方法。
import logoSelect from './SearchLogo.vue';

export default {
    //注册组件
    components: {
        'SearchLogo': logoSelect
    },
    data: function() {
        return {
            myData: [],//用来接收ajax得到的数据
            keyword: '',//v-model绑定的输入框的value
            now: -1,
            searchIndex: 0,
            logoData: [{
                name: '360搜索',
                searchSrc: 'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q='
            }, {
                name: '百度搜索',
                searchSrc: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='
            }, {
                name: '搜狗搜索',
                searchSrc: 'https://www.sogou.com/web?query='
            }]
        }
    },
    methods: {
        // &event是实参，表示event对象
        get: function(ev) {
            // 如果按得键是上或者下，就不进行ajax
            if (ev.keyCode == 38 || ev.keyCode == 40) {
                return;
            }

            this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + this.keyword + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
                this.myData = res.data.s;
            });
        },
        selectDown: function() {
            this.now++;
            //到达最后一个时，再按下就回到第一个
            if (this.now == this.myData.length) {
                this.now = 0;
            }
            this.keyword = this.myData[this.now];
        },
        selectUp: function() {
            this.now--;
            //同上
            if (this.now == -1) {
                this.now = this.myData.length - 1;
            }
            this.keyword = this.myData[this.now];
        },
        search: function() {
            //打开对应的搜索界面
            window.open(this.logoData[this.searchIndex].searchSrc + this.keyword);
        },
        selectHover: function(index) {
            this.now = index
        },
        selectClick: function(index) {
            this.keyword = this.myData[index];
            this.search();
        },
        clearInput: function() {
            this.keyword = '';
            this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + this.keyword + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
                this.myData = res.data.s;
            });
        },
        getIndex: function(index) {
            this.searchIndex = index;
        }
    }
}
</script>

<style type="text/css">
</style>
