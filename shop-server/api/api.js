﻿var router=require("express").Router();

var pool=require("../modules/pool.js");

var jwt=require("jsonwebtoken");

var checktoken=require("../modules/checktoken.js");

var IPAdress = require("../modules/ip")


// 轮播图
router.get("/banner",(req,res)=>{
	res.json({
		code: 1,
		data: [
			"http://"+IPAdress+":1024/images/a.jpg",
			"http://"+IPAdress+":1024/images/b.jpg",
			"http://"+IPAdress+":1024/images/c.jpg",
			"http://"+IPAdress+":1024/images/d.jpg",
			"http://"+IPAdress+":1024/images/e.jpg"
		]
	})
})

// 登录
/*
 *请求方式为：get
 *userName
 *password
 *响应内容{code:0,token:null}用户名或密码错误   {code:1,token:"fffsdfe",userName:"veb",userId:}成功返回token
 */
router.get("/login",(req,res)=>{
	console.log("login")
	if(!req.query.userName || !req.query.password) {
		res.json({ code:0, token:null, data: "参数错误"})
		return;
	}
	pool.query("select * from user where name=? and pwd=?",[req.query.userName,req.query.password])
	.then(data=>{
		if(!data.length){
			res.json({
				code:0,
				token:null
			})
		}else{

			var token=jwt.sign({userName:req.query.userName,userId:data[0].Id},"哼哼哈嘿",{
				expiresIn: 60*60*24*7
			})

			res.json({
				code:1,
				token:token,
				userName:req.query.userName,
				userId:data[0].Id
			})

		}
	})

})


// 注册
/*
 *请求方式为：get
 *userName
 *password
 *响应内容{code:0}被占用   {code:1}成功
 */
router.get("/register",(req,res)=>{
	console.log("register")
	if(!req.query.userName || !req.query.password) {
		res.json({ code:0, data: "参数错误"})
		return;
	}
	pool.query("select * from user where name=?",[req.query.userName])
	.then(data=>{
		if(data.length){
			res.json({
				code:0
			})
		}else{
			pool.query("insert into user (name,pwd) values(?,?)",[req.query.userName,req.query.password])
			.then(data=>{
				console.log(data);
				res.json({
					code:1
				})
			})
		}
	})

})


// router.get("/checklogin",checktoken,(req,res)=>{
// 	res.send({
// 		code:1
// 	})
// })


// 加入购物车
/*
 *请求方式为：get
 *goodId
 *token
 *响应内容{code:0}token无效   {code:1}添加成功 {code:2} 插入失败
*/

router.get("/add",checktoken,(req,res)=>{
	console.log("add")
	if(!req.query.goodId || !req.userId) {
		res.json({ code:2, data: "参数错误"})
		return;
	}
	if(req.query.goodId*1 != req.query.goodId){
		res.json({ code:2, data: "goosId要求正整数"})
		return;
	}
	pool.query("select * from shopcar where goodId=? and userId=?",[req.query.goodId,req.userId])
	.then(d=>{
		if(d.length){
			pool.query("update shopcar set count=? where goodId=? and userId=?",[Number(d[0].count)+1,req.query.goodId,req.userId])
			.then(data=>{
				res.json({
					code:1
				})
			})
			.catch(err=>{
				res.json({
					code:2
				})
			})
		}else{
			pool.query("insert into shopcar (goodId,userId,count) values(?,?,?)",[req.query.goodId,req.userId,1])
			.then(data=>{
				res.json({
					code:1
				})
			})
			.catch(err=>{
				res.json({
					code:2
				})
			})
		}
	})
})

// 移除购物车商品
/*
 *请求方式为：get
 *goodId
 *token
 *响应内容{code:0}token无效   {code:1}添加成功 {code:2} 插入失败
*/
router.get("/remove",checktoken,(req,res)=>{
	console.log("remove")
	if(!req.query.goodId || !req.userId) {
		res.json({ code:2, data: "参数错误"})
		return;
	}
	pool.query("select * from shopcar where goodId=? and userId=?",[req.query.goodId,req.userId])
	.then(d=>{

			pool.query("update shopcar set count=? where goodId=? and userId=?",[Number(d[0].count)-1,req.query.goodId,req.userId])
			.then(data=>{
				res.json({
					code:1
				})
			})
			.catch(err=>{
				res.json({
					code:2
				})
			})
	})
})



// 删除购物车商品
/*
 *请求方式为：get
 *goodId
 *token
 *响应内容{code:0}token无效   {code:1}删除成功 {code:2} 删除失败
*/

router.get("/del",checktoken,(req,res)=>{
	console.log("del")
	if(!req.query.goodId || !req.userId) {
		res.json({ code:2, data: "参数错误"})
		return;
	}
	pool.query("delete from shopcar where userId=? and goodId=?",[req.userId,req.query.goodId])
	.then(data=>{
		res.json({
			code:1
		})
	})
	.catch(err=>{
		res.json({
			code:2
		})
	})

})
// 获取商品列表
/*
 * 参数 type_one  缺省则获取所有分类列表
 *使用实例 /goodlist?type_one=男装  获取所有男装列表
 */
router.get("/goodList",(req,res)=>{
	console.log("goodList")
	if(req.query.page&&(req.query.page<=0 || req.query.page*1!=req.query.page)&&!req.query.type_one) {
		res.json({ code:2, data: "参数错误"})
		return;
	}
	var sql="select Id,title,priceStr,mack,evaluate,imageUrl,type_one,type_two from goods where goodType='normal'";
	if(req.query.type_one){
		sql+=" and type_one=?";
	}
	if(req.query.page){
		sql+=" limit "+(parseInt(req.query.page)-1)*30+",30";
	}
	pool.query(sql,[req.query.type_one])
	.then(data=>{
		res.json(data);
	})

})

// 热门商品
router.get("/hotList",(req,res)=>{
	console.log("hotList")
	if(req.query.page&&(req.query.page<=0 || req.query.page*1!=req.query.page)){
		res.json({ code:2, data: "参数错误"})
		return;
	}
	var sql="select Id,title,priceStr,labels,evaluate,salePoint,imageUrl from goods where goodType='hot'";
	
	if(req.query.page){
		sql+=" limit "+(parseInt(req.query.page)-1)*20+",20";
	}
	pool.query(sql)
	.then(data=>{
		res.json(data);
	})

})


// 进店看看
router.get("/supplierList",(req,res)=>{
	console.log("supplierList")
	if(req.query.page&&(req.query.page<=0 || req.query.page*1!=req.query.page)||!req.query.supplier){
		res.json({ code:2, data: "参数错误"})
		return;
	}
	var sql="select Id,title,priceStr,mack,evaluate,salePoint,imageUrl from goods where supplier=? and goodType='normal'";
	
	if(req.query.page){
		sql+=" limit "+(parseInt(req.query.page)-1)*20+",20";
	}
	pool.query(sql,[req.query.supplier])
	.then(data=>{
		res.json(data);
	})

})

// 同类商品
router.get("/sameList",(req,res)=>{ 
	console.log("sameList")
	if(req.query.page&&(req.query.page<=0 || req.query.page*1!=req.query.page)||!req.query.supplier){
		res.json({ code:2, data: "参数错误"})
		return;
	}
	var sql="select Id,title,priceStr,mack,evaluate,salePoint,imageUrl from goods where supplier=?";
	
	// sql+=" limit 0,5";
	pool.query(sql,[req.query.supplier])
	.then(data=>{
		if(data.length <= 5) res.json(data);
		else {
			var arr = []
			for (let index = 0; index < 5; index++) {
				let random = parseInt(Math.random()*data.length)
				arr.push(data[random])
				data.splice(random,1)
			}
			res.json(arr)
		}
	})
})

// 新品
router.get("/newList",(req,res)=>{
	console.log("newList")
	if(req.query.page&&(req.query.page<=0 || req.query.page*1!=req.query.page)){
		res.json({ code:2, data: "参数错误"})
		return;
	}
	var sql="select Id,title,priceStr,labels,evaluate,salePoint,imageUrl from goods where goodType='new'";
	
	if(req.query.page){
		sql+=" limit "+(parseInt(req.query.page)-1)*20+",20";
	}
	pool.query(sql,[req.query.type_one])
	.then(data=>{
		res.json(data);
	})

})


// 获取商品详情
/*
 *goodId
 */
router.get("/detail",(req,res)=>{
	console.log("detail")
	if(!req.query.goodId){
		res.json({ code:2, data: "参数错误"})
		return;
	}
	pool.query("select * from goods where Id=?",[req.query.goodId])
	.then(data=>{
		res.json(data);
	})

})


// 获取購物車列表
router.get("/shopList",checktoken,(req,res)=>{
	console.log("shopList", req.userId )
	if(!req.userId){
		res.json({ code:2, data: "参数错误"})
		return;
	}
	pool.query("select * from shopcar where userId=?",[req.userId])
	.then(data=>{
		var list=[];
		var i=0;
		function getList(){
			if(data[i].goodId == 0){
				res.json({ code:2, data: "账号异常"})
				return;
			}
			pool.query("select * from goods where Id=?",[data[i].goodId])
			.then(d=>{
				d[0]['count'] = data[i].count

				list.push(d[0]);

				if(i<data.length-1){
					i++;
					getList();
				}else{
					res.json(list);
				}
			})


		}
		if(data.length){
			getList();
		}else{
			res.json(list);
		}
		
	})

})


/*
 *搜索接口
 *url   /search
 *query word
 *示例: /search?word=男装	
 */
router.get("/search",(req,res)=>{
	console.log("search")
	if(!req.query.word){
		res.json({ code:2, data: "参数错误"})
		return;
	}
	pool.query("select * from goods where title like ? or type_one=? or type_two=?",["%"+req.query.word+"%",req.query.word,req.query.word])
	.then(data=>{
		res.json(data);
	})

})

/*
 *获取一级分类
 *url   /getTypeOne
 */
router.get("/getTypeOne",(req,res)=>{
	console.log("getTypeOne")
	pool.query("select type_one from goods where goodType='normal'")
	.then(data=>{
		var data2=[];

		for(var i=0;i<data.length;i++){
			var flag=true;

			for(var j=0;j<data2.length;j++){
				if(data[i].type_one==data2[j]){
					flag=false;
					break;
				}
			}

			if(flag){
				data2.push(data[i].type_one);
			}

		}

		res.json(data2);
	})

})

// 获取二级分类
// query {type_one:"咖啡"}
router.get("/getTypeTwo",(req,res)=>{
	console.log("getTypeTwo")
	if(!req.query.type_one){
		res.json({ code:2, data: "参数错误"})
		return;
	}
	pool.query("select type_two from goods where type_one=?",[req.query.type_one])
	.then(data=>{
		var arr=[];
		data.forEach(item=>{
			arr.push(item.type_two);
		})
		arr=[...new Set(arr)];
		res.json(arr);
	})
})

// 获取二级商品列表
// query {type_one:"咖啡",type_two:"手磨咖啡"}
router.get("/getTypeTwoList",(req,res)=>{
	console.log("getTypeTwoList")
	if(!req.query.type_one || !req.query.type_two){
		res.json({ code:2, data: "参数错误"})
		return;
	}
	pool.query("select * from goods where type_one=? and type_two=?",[req.query.type_one,req.query.type_two])
	.then(data=>{
		res.json(data);
	})

})


module.exports=router