import axios from 'axios'
/**
 * @param {String} api 接口
 * @param {String} method 请求方法 POST GET DELETE PUT
 * @param {Object} param
 */
export default function $axios(url, method, data) {
    return new Promise(function (resolve, reject) {
        let prop = method == "GET" ? "params" : "data"
        axios({
            url,
            method,
            [prop]: data || {}
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })

    })
}





// export default function $axios(api, method, param) {
//     if (method == 'POST') {
//         axios.post(api, param).then(res => {
//             return res.data
//         })
//     } else if (method == 'GET') {
//         axios.get(api, param).then(res => {
//             return res.data
//         })
//     }
// }