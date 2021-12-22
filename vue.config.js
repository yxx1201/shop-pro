module.exports = {
    productionSourceMap: true,
    devServer: {
        proxy: {
            '^/showApi': {//代理名
                target: 'http://192.168.207.40:1024/api',//被代理地址参考启动后台连接数据库成功后返回的结果ip
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/showApi': ''
                }
            },
        },

    }
}