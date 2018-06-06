import React from 'react';
import axios from 'axios';
import {withRouter,Link} from "react-router-dom";
import './home.css'
class Home extends React.Component {
  constructor(props){
    super(props)
    // _id  ,title ,user ,time ,img
    this.state={
      newlist:[]
    }
    
  }
  handleClick(e){
    const index=e.target.getAttribute('index');
    this.props.history.push(`/${index}`);
  }
  componentDidMount(){
    axios.get("/game").then(res => {
      if (res.status === 200 && res.data.code === 0) {
        console.log('ok axios');
        console.log(res.data.doc);
        this.setState({newlist:res.data.doc})
        // document.querySelector(".article").innerHTML=res.data.news.content.content;
      } else {
        console.log('err axios');
      }
    });

    //  最后决定了用css实现固定moreInfo
    // document.addEventListener('scroll',function(){
    //   document.querySelector(".moreInfo").style.top=`${window.scrollY}px`
    // })
    
    // scroll 优化
    // var last_known_scroll_position = 0;
    // var ticking = false;

    // function doSomething(scroll_pos) {
    //   // do something with the scroll position
    //   // console.log(`${scroll_pos}px`)
    //   document.querySelector(".moreInfo").style.top=`${scroll_pos}px`
    // }

    // window.addEventListener('scroll', function(e) {
    //   // console.log(e)
    //   last_known_scroll_position = window.scrollY;
    //   if (!ticking) {
    //     window.requestAnimationFrame(function() {
    //       doSomething(last_known_scroll_position);
    //       ticking = false;
    //     });
    //   }
    //   ticking = true;
    // });
    // 
  }

  render(){
    // const {tittle,time,user,_id,img,}=this.state.newList[0];
            // console.log(this.state.newlist)
    return(
      <div className="home">
        <div className="newsList">
          {this.state.newlist.map((value)=>{
            const {tittle,time,user,_id,img,type}=value;
            console.log({tittle,time,user,_id,img,type});
            // console.log(this.state)
            // import imgURL from './../images/photo.png';  
            return (
              <div key={_id} index={_id} className="newwrap" onClick={(e)=>{this.handleClick(e)}}>
                <img index={_id} src={require("../../service/uploadimg/"+img)} alt="" className="newsListImg"/>
                
                <div index={_id} className="newinfo">
                  <div index={_id}>新闻类型 : {type}</div>
                  <div index={_id}>新闻标题 : {tittle}</div>
                  <div index={_id}>发表用户 : {user}</div>
                  <div index={_id}>发表时间 : {time}</div>
                </div>
                
              </div>
              
            )
          })}
        </div>

        <div className="moreInfo" style={{position:"fixed",bottom:"50px"}}>
          <div className="newsType">
            <div>科技</div>
            <div>娱乐</div>
            <div>政治</div>
            <div><Link to="/game" style={{textDecoration:'none',color: 'black'}} >游戏</Link></div>
            <div>时尚</div>
            <div>军事</div>
            <div>其他</div>
          </div>

          <div className="about">
            <div className="wenzi">新注册用户默认没有发布权限</div>
            <div className="wenzi">请联系管理员获取</div>
            
            <div> .</div>
            <div>
              <a style={{textDecoration: 'none',color: '#898989'}} href="https://github.com/Hasaki1997">联系作者</a> © 2018 News
            </div>
            <div>&nbsp;</div>
            <div style={{fontSize:'2px',width:'300px',marginLeft:'-50px'}}>富强 民主 文明 和谐 自由 平等 公正 法治 爱国 敬业 诚信 友善</div>
            <div></div>
          </div>
        </div>
        
      </div>
    )
  }
  
}
export default Home;
