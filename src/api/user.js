import request from '@/request'


export function follow(userId, toFollow) {
    return request({
        url: `/follow/${userId}/${toFollow}`,
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