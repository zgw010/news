//连接mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/news");
const Schema = mongoose.Schema;
const user=new Schema({
  // 用户名
  user:{
    type: String,
    require: true
  },
  // 密码
  pwd:{
    type: String,
    require: true
  },
  // 用户注册时间
  time:{
    type: String,
    require: true
  },
  // 用户头像
  avatar:{
    type: String
  },
  // 用户简介
  desc:{
    type: String
  },
  // 用户权限,用来控制是否有发帖权限
  permission:{
    type: Boolean,
    require: true,
    default: false
  }
});
const news=new Schema({
  // 标题
  tittle:{
    type: String,
    require: true
  },
  // 新闻主体内容
  content:{
    type: Object,
    require: true
  },
  // 新闻发布时间
  time:{
    type: String,
    require: true
  },
  // 新闻的主图
  img:{
    type: String,
    require: true
  },
  // 新闻的类型
  type:{
    type: String,
    require: true
  },
  // 新闻发表者用户名
  user:{
    type: String,
    require: true
  },
  
  // 评论
  comments:{
    comment:{
      type: String,
      require: true
    },
    // 评论发表时间
    time:{
      type: String,
      require: true
    },
    // 评论发表者用户名
    fromuser:{
      type: String,
      require: true
    },
    // 被回复者用户名
    touser:{
      type: String,
      require: true
    },
  }
})
const User = mongoose.model('User',user);
const News = mongoose.model('News',news);
module.exports = {User,News};
// module.exports = News;