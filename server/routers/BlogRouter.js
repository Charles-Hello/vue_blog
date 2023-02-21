const express = require('express')
const router = express.Router()
const {db,genid} = require('../db/Dbutil')



//查询博客
router.get('/search',async (req,res)=>{
  //keyword 关键字 作用于title和content
  
  let id = req.query.id
  const delete_sql ="Delete From `blog` where `id` =?"
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



//删除博客 /blog/delete?id=xxx
router.delete('/delete',async (req,res)=>{
  let id = req.query.id
  const delete_sql ="Delete From `blog` where `id` =?"
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


//修改博客
router.get('/update',async (req,res)=>{

  let {id,title,categoryId,content} = req.body

  const update_sql = 'update `blog` set `title` = ?,`content` = ?,`category_id` = ? where `id` = ?';
  let params = [title, content,categoryId, id]
  let {err,rows} = await db.async.run(update_sql, params)
  if (err == null) {
    res.send({
      code :200,
      msg:"修改成功"
    })
}else{
  res.send({
    code :500,
    msg:"修改失败"
  })
}
})

//添加博客
router.get('/add',async (req,res)=>{

  let {title,category,content} = req.body
  let id = genid.NextId()
  let create_time = new Date().getTime();
  const insert_sql = 'INSERT INTO `blog` (`id`, `title`, `category`, `content`, `create_time) values(?,?,?,?,?)';
  let params = [id, title, category, content, create_time]
  let {err,rows} = await db.async(insert_sql, params)
  if (err == null) {
    res.send({
      code :200,
      msg:"添加成功"
    })
}else{
  res.send({
    code :500,
    msg:"添加失败"
  })
}
})

module.exports = router