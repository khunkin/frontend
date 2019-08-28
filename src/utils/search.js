import {getArticlesByTitlecontains} from "../api/article"

export function searchByTitle(that, keyword) {
    console.log("call searchByTitle with keyword = " + keyword);
    getArticlesByTitlecontains(keyword)
        .then(data => {
            that.searchResult = data.data;
            console.log("Got data " + JSON.stringify(that.searchResult));
        })
        .catch(error => {
            if (error !== "error") {
                that.$message({
                    type: "error",
                    message: "按标题搜索失败!" + JSON.stringify(error),
                    showClose: true
                });
            }
        });
}
