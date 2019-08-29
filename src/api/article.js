import request from '@/request'


export function getArticles(query, page) {
  console.log('Get articles with ' + JSON.stringify(query))
  return request({
    url: '/articles',
    method: 'get',
    params: {
      pageNumber: page.pageNumber,
      pageSize: page.pageSize,
      name: page.name,
      sort: page.sort,
      year: query.year,
      month: query.month,
      tagId: query.tagId,
      categoryId: query.categoryId,
      userName: query.userName,
      userId: query.userId
    }
  })
}

export function getArticlesByTitlecontains(subTitle) {
  return request({
    url: `/search/byTitle/${subTitle}`,
    method: 'get'
  })
}

export function getHotArtices() {
  return request({
    url: '/articles/hot',
    method: 'get'
  })
}

export function follow(userId, followerId) {
  return request({
    url: `/follow/${userId}/${followerId}`,
    method: 'get'
  })
}

export function getNewArtices() {
  return request({
    url: '/articles/new',
    method: 'get'
  })
}

export function viewArticle(id) {
  return request({
    url: `/articles/view/${id}`,
    method: 'get'
  })
}

export function getArticlesByCategory(id) {
  return request({
    url: `/articles/category/${id}`,
    method: 'get'
  })
}

export function getArticlesByTag(id) {
  return request({
    url: `/articles/tag/${id}`,
    method: 'get'
  })
}


export function getArticlesByUser(id) {
  return request({
    url: `/articles/user/${id}`,
    method: 'get'
  })
}


export function publishArticle(article) {
  return request({
    url: '/articles/publish',
    method: 'post',
    data: article
  })
}

export function listArchives() {
  return request({
    url: '/articles/listArchives',
    method: 'get'
  })
}

export function getArticleById(id) {
  return request({
    url: `/articles/${id}`,
    method: 'get'
  })
}
