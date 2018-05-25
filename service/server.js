const fs = require('fs');
const express = require ('express');
const multer  = require('multer')
// 最终文件会保存在service/upload目录中
const uploadavatar = multer({ dest: 'uploadavatar/' })
const uploadimg = multer({ dest: 'uploadimg/' })
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
  if(req.file.mimetype==="image/jpeg"&&req.file.size<5000000){
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

app.post('/upimg', uploadimg.single('file'),function(req,res){
  // console.log("req.body:",req.body);
  // console.log("req.file:",req.file.size);
  if(req.file.mimetype==="image/jpeg"&&req.file.size<5000000){
    return res.json({
      code: 0,
      msg: "上传图片成功！",
      imgname:req.file.filename
    });
  }else {
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
  console.log(req.body)
  News.create({tittle,time,content,user,type,img}, function (err, doc) {
    if (err) {
      return console.log('err',err);
    }
      // saved!
    return res.json({
      code: 0,
      msg: "fabiao成功！"
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

app.listen(9003,function(){
  console.log("ok 9003",User);
})
// const router=express.Router();
// router.get("/register", function(req, res) {
//   res.send('ok 9003');
//   console.log("ok")
// });
// router.post("/register",function(req,res){
//   console.log('post _ register');
// })
// module.exports=router;