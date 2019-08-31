import request from '@/request'


export function follow(userId, toFollow) {
    return request({
        url: `/follow/${userId}/${toFollow}`,
        method: 'get',
    })
}

export function unfollow(userId, toUnFollow) {
    return request({
        url: `/follow/unfollow/${userId}/${toUnFollow}`,
        method: 'get',
    })
}

export function getFollowList(userName) {
    return request({
        url: `/follow/followList/${userName}`,
        method: 'get'
    })
}

export function getUserById(userId) {
    return request({
        url: `/users/${userId}`,
        method: 'get'
    })
}

export function updateUser(user) {
    return request({
        url: '/users/update',
        method: 'post',
        data: user
    })
}

export function isFollowing(userId, followerId) {
    return request({
        url: `/follow/isFollowing/${userId}/${followerId}`,
        method: 'get'
    })
}

export function getUserByAccount(account) {
    return request({
        url: `/users/guser/${account}`,
        method: 'get'
    })
}

export function searchUser(nickName) {
    return request({
        url: `/users/searchUser/${nickName}`,
        method: 'get'
    })
}

export function isLiking(userId, articleId) {
    return request({
        url: `/like/isLiking/${userId}/${articleId}`,
        method: 'get'
    })
}

export function like(userId, articleId) {
    return request({
        url: `/like/${userId}/${articleId}`,
        method: 'get'
    })
}

export function unlike(userId, articleId) {
    return request({
        url: `/like/unlike/${userId}/${articleId}`,
        method: 'get'
    })
}