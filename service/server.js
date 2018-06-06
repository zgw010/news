const fs = require('fs');
const express = require ('express');
// 引入 multer 库 ,用来保存本地图片到服务器
const multer  = require('multer');

// 最终新闻主图和头像会分别保存在 service/uploadimg 和service/uploadavatar 中
const uploadimg = multer({ dest: 'uploadimg/' })
const uploadavatar = multer({ dest: 'uploadavatar/' })
//引入 mongodb 数据模型
const {User,News} = require('./model.js');
// const News = require('./model.js');
const bodyParser = require('body-parser');
const cookieParase = require('cookie-parser');
const app = express();
// express限制100kb
app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// app.use('/',express.static(path.join(__dirname, "service/")));
app.use(cookieParase());
// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
//   next();
// });

// 此处的file为 文件上传的input标签的name字段
app.post('/upavatar', uploadavatar.single('file'),function(req,res){
  // console.log("req.body:",req.body);
  // console.log("req.file:",req.file.size);
  // req.file.mimetype==="image/jpeg"&&
  if(req.file.size<5000000){
    return res.json({
      code: 0,
      msg: "上传头像成功！",
      avatarname:req.file.filename
    });
  }else {
    return res.json({
      code: 1,
      msg: "不支持该格式,或者图片大小大于5M,请重新上传！"
    });
  }

})

app.post('/upimg', uploadimg.single('file'),function(req,res,next){
  console.log("req.body:",req.body);
  console.log("req.file:",req.file);
  // req.file.mimetype==="image/jpeg"&&
  if(req.file.size<5000000){
    console.log("上传主图成功",req.file)
    return res.json({
      code: 0,
      msg: "上传图片成功！",
      imgname:req.file.filename
    });
  }else {
    // console.log("err:",res)
    return res.json({
      code: 1,
      msg: "不支持该格式,或者图片大小大于5M,请重新上传！"
    });
  }

})

app.post('/register',function(req,res){
  console.log("req.body:",req.body);
  const userinfo=req.body;
  // console.log("req:",req);
  // console.log("body:",body)
  User.findOne({user:userinfo.user},function(err, doc){
    if(doc){
      return res.json({
        code: 1,
        msg: "这个用户名已经被注册了！"
      });
    }
    User.create(userinfo, function (err, doc) {
      if (err) {
        return console.log('err',err);
      }
        // saved!
    });
    return res.json({
      code: 0,
      msg: "注册成功！"
    });
  })

})

app.post('/login',function(req,res){
  //console.log("req.body:",req.body);
  const userinfo=req.body;
  // console.log("req:",req);
  // console.log("body:",body)
  User.findOne({user:userinfo.user,pwd:userinfo.pwd},function(err, doc){
    // console.log(doc)
    if(!doc){
      console.log("hello",userinfo);

      return res.json({
        code: 1,
        msg: "账号或密码输入错误！"
      });
    }else{
      return res.json({
        code: 0,
        msg: "登陆成功!",
        permission:doc.permission
      })
    }

  })

})


// 发表文章
app.post('/publish',function(req,res){
  // console.log("req.body:",req.body);
  const {time,content,user,type,img,tittle}=req.body;
  // console.log("req:",req);
  // console.log("body:",body)
  // User.findOne({user:userinfo.user},function(err, doc){
  //   if(doc){
  //     return res.json({
  //       code: 1,
  //       msg: "这个用户名已经被注册了！"
  //     });
  //   }
  const a=req.body;
  // console.log(req.body)
  News.create({tittle,time,content,user,type,img}, function (err, doc) {
    if (err) {
      return console.log('err',err);
    }
      // saved!
    return res.json({
      code: 0,
      msg: "发表新闻成功！"
    });
  });

})

// 发表评论
app.post('/newcomment',function(req,res){
  console.log("req.body:",req.body.newsId);
  const {comment,time,fromuser,touser}=req.body;


  News.update({_id:req.body.newsId},{$push:{"comments": {comment,time,fromuser,touser}}}, function (err, doc) {
    if (err) {
      return console.log('err',err);
    }
      // saved!
    return res.json({
      code: 0,
      msg: "评论成功！"
    });
  });

})

// 更新新闻
app.post('/updatenew',function(req,res){
  console.log("req.body:",req.body);
  const {_id,time,content,type,img,tittle}=req.body;


  News.update({_id:req.body._id},{time,content,type,img,tittle}, function (err, doc) {
    if (err) {
      return console.log('err',err);
    }
      // saved!
    return res.json({
      code: 0,
      msg: "修改成功！"
    });
  });

})

app.get('/news',function(req,res){
  // const news=req.body;
  console.log(req.query.ID.slice(1))
  News.findOne({_id:req.query.ID.slice(1)},function(err, doc){
    if(err){
      return res.json({
        code: 1,
        msg: "err！"
      });
      
    }
    console.log("doc:",doc)
    return res.json({
      code: 0,
      msg: "ok！",
      news:doc
    });
  })
});
app.get('/home',function(req,res){
  // const news=req.body;
  // News.find({},function(err, doc){
  //   if(err){
  //     return res.json({
  //       code: 1,
  //       msg: "获取新闻列表失败！"
  //     });
      
  //   }
  //   // console.log(doc)
  //   return res.json({
  //     code: 0,
  //     msg: "获取新闻列表成功！",
  //     doc:doc.sort({'_id':-1})
  //   });
  // })
  News.find({}).sort({'_id':-1}).exec(function(err, doc){
    if(err){
      return res.json({
        code: 1,
        msg: "获取新闻列表失败！"
      });
      
    }
    // console.log(doc)
    return res.json({
      code: 0,
      msg: "获取新闻列表成功！",
      doc:doc
    });
  })
});
app.get('/game',function(req,res){
  News.find({type:"游戏"}).sort({'_id':-1}).exec(function(err, doc){
    if(err){
      return res.json({
        code: 1,
        msg: "获取新闻列表失败！"
      });
      
    }
    // console.log(doc)
    return res.json({
      code: 0,
      msg: "获取新闻列表成功！",
      doc:doc
    });
  })
});

app.get('/mynews',function(req,res){
  // console.log(req.query)
  const user=req.query.USER.slice(4)
  // console.log(queryuser)
  News.find({user}).sort({'_id':-1}).exec(function(err, doc){
    if(err){
      return res.json({
        code: 1,
        msg: "获取新闻列表失败！"
      });
      
    }
    // console.log(doc)
    return res.json({
      code: 0,
      msg: "获取新闻列表成功！",
      doc:doc
    });
  })
});


app.delete('/deletenews',function(req,res){
  console.log(req.query.NEWID)
  const _id=req.query.NEWID;
  // News.create({tittle,time,content,user,type,img}, function (err, doc) {
    // if (err) {
    //   return console.log('err',err);
    // }
    //   // saved!
    // return res.json({
    //   code: 0,
    //   msg: "fabiao成功！"
    // });
  // });
  News.deleteOne({_id},function(err,doc){
    if (err) {
      return console.log('err',err);
    }
    return res.json({
      code: 0,
      msg: "delete ok！"
    });
  })
})
// app.use(function(req,res,next){
//   if(req.url.startsWith('/')||req.url.startsWith('/static/')){
//     return next();
//   }
//   console.log('path',path.resolve('build/index.html'))
//   return res.sendFile(path.resolve('build/index.html'))
// })
// app.use('/',express.static(path.resolve('build')))

app.listen(9003,function(){
  console.log("ok 9003",User);
})
