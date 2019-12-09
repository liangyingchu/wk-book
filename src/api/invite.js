import request from '@/utils/request'
import { publicParams, signFactory } from './public'

export function fetchList({uuid, session_id, chnid}) {
    const asyncParams = [
        ['funid', 168],
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
