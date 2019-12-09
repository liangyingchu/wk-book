import request from '@/utils/request'
import { publicParams, signFactory } from './public'

export function fetchReward({invite_code, uuid, session_id, chnid}) {
    const asyncParams = [
        ['funid', 167],
        ['uuid', uuid],
        ['session_id', session_id],
        ['chnid', chnid],
        ['invite_code', invite_code]
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
