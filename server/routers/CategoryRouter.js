const express = require('express')
const router = express.Router()
const {db,genid} = require('../db/DbUtils')



//列表接口
router.get('/list',async (req,res)=>{
  const search_sql = "select * from `category`"
  let {err,rows} = await db.async.all(search_sql,[])
  if (err == null){
    res.send({
      code:200,
      msg:"查询成功",
      rows
    })
  }else{
    res.send({
      code:500,
      msg:"查询失败"
    })
  }
})


//增加接口
router.post('/_token/add',async (req,res)=>{
  let {name} = req.body
  const insert_sql ="insert into `category` (`id`,`name`) values (?,?)"
  let {err,rows} = await db.async.run(insert_sql,[genid.NextId(),name])
  if (err == null){
    res.send({
      code:200,
      msg:"添加成功"
    })
  }else{
    res.send({
      code:500,
      msg:"添加失败\n失败原因${err.message}"
    })
    console.log(err)
  }
})
//修改接口
router.put('/_token/update',async (req,res)=>{
  //不能每个接口都写重复的代码。这个时候得加个中间件
  // let {token} =req.headers.token
  // let admin_token_sql = "select * from `admin` where `token` = ?"
  // let adminResult = await db.async.all(admin_token_sql,[token])
  // if (adminResult.rows.length == 0 || adminResult.err != null){
  //     res.send({
  //       code:403,
  //       msg:"请先登录"})
  //     return
  //     }
  
  
  let {name,id} = req.body
  const update_sql ="update `category` set `name` = ? where `id` = ?"
  let {err,rows} = await db.async.run(update_sql,[name,id])
  if (err == null){
    res.send({
      code:200,
      msg:"修改成功"
    })
  }else{
    res.send({
      code:500,
      msg:"修改失败"
    })
  }
})

//删除接口 //category/delete?id=xxx
router.delete('/_token/delete',async (req,res)=>{
  let id = req.query.id
  const delete_sql ="Delete From `category` where `id` =?"
  let {err,rows} = await db.async.run(delete_sql,[id])
  if (err == null){
    res.send({
      code:200,
      msg:"删除成功"
    })
  }else{
    res.send({
      code:500,
      msg:"删除失败"
    })
  }
})

module.exports = router