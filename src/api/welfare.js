import request from '@/utils/request'
import { publicParams, signFactory } from './public'

// 福利列表
export function fetchList({uuid, session_id, chnid}) {
    const asyncParams = [
        ['funid', 174],
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

// 领取福利
export function receive({uuid, session_id, chnid, item_id}) {
    const asyncParams = [
        ['funid', 175],
        ['uuid', uuid],
        ['session_id', session_id],
        ['chnid', chnid],
        ['item_id', item_id]
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

// 收入明细
export function fetchRecord({uuid, session_id, chnid}) {
    const asyncParams = [
        ['funid', 176],
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
