import request from '@/utils/request'
import { publicParams, signFactory } from './public'

// 提现计费点列表
export function fetchList({uuid, session_id, chnid}) {
    const asyncParams = [
        ['funid', 169],
        ['uuid', uuid],
        ['session_id', session_id],
        ['chnid', chnid]
    ]
    const api_sign = signFactory([...publicParams, ...asyncParams])
    return request({
        method: 'post',
        data: new URLSearchParams([
            ...publicParams,
            ...asyncParams,
            ['api_sign', api_sign]
        ]).toString()
    })
}

// 获取提现配置
export function fetchConfig({uuid, session_id, chnid}) {
    const asyncParams = [
        ['funid', 170],
        ['uuid', uuid],
        ['session_id', session_id],
        ['chnid', chnid]
    ]
    const api_sign = signFactory([...publicParams, ...asyncParams])
    return request({
        method: 'post',
        data: new URLSearchParams([
            ...publicParams,
            ...asyncParams,
            ['api_sign', api_sign]
        ]).toString()
    })
}

// 获取提现记录
export function fetchRecord({uuid, session_id, chnid}) {
    const asyncParams = [
        ['funid', 171],
        ['uuid', uuid],
        ['session_id', session_id],
        ['chnid', chnid]
    ]
    const api_sign = signFactory([...publicParams, ...asyncParams])
    return request({
        method: 'post',
        data: new URLSearchParams([
            ...publicParams,
            ...asyncParams,
            ['api_sign', api_sign]
        ]).toString()
    })
}

// 提现下单
export function transact({uuid, session_id, chnid, amount, type, platform}) {
    const asyncParams = [
        ['funid', 172],
        ['uuid', uuid],
        ['session_id', session_id],
        ['chnid', chnid],
        ['amount', amount],
        ['type', type],
        ['platform', platform]
    ]
    const api_sign = signFactory([...publicParams, ...asyncParams])
    return request({
        method: 'post',
        data: new URLSearchParams([
            ...publicParams,
            ...asyncParams,
            ['api_sign', api_sign]
        ]).toString()
    })
}
