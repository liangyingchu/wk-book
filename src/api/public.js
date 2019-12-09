import md5 from 'js-md5'

export const publicParams = [
    ['api_ts', new Date().getTime()],
    ['v', 230000]
]

export function map2Obj(map) {
    let obj = Object.create(null)
    for(let [k, v] of map) {
        obj[k] = v
    }
    return obj
}

export function signFactory(args) {
    args = map2Obj(args)
    const result = []
    const keys = Object.keys(args)
    keys.sort((a, b) => a.toUpperCase() < b.toUpperCase() ? -1 : 1).map(key => {
        result.push(key)
        result.push(args[key])
    })
    return md5(`${result.join('|')}|Nfiw3y8*h3tl+k8g8_q2nghud0!4trDFgw`).toUpperCase()
}
