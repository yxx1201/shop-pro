var mysql = require("mysql");

var pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",//数据库登录用户名
    password: "1201",//数据库登录密码
    database: "shop"//数据库名
})

pool.getConnection(err => {
    if(err)  console.log("数据库连接失败:" + err.message)
    else console.log("数据库连接成功")
})

exports.query = (sql, arr) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            var arg = [sql];
            arr ? arg.push(arr) : null;
            arg.push(function (err, res) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
                pool.releaseConnection(connection);
            })
            connection.query(...arg)
        })
    })
}