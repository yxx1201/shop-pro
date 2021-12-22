var mysql=require("mysql")

module.exports=function(){

	var option = {
		host:"127.0.0.1",
		user: "root",//数据库登录用户名
		password: "1201",//数据库登录密码
		database: "shop",//数据库名
		port:"3306"
	}

	mysql.createConnection(option).connect(function(err){
		console.log(err)
	})

	return mysql.createConnection(option)

}