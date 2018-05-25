import axios from "axios";
import React from 'react'
const title='成都一SUV野蛮转圈后冲撞人群 司机涉嫌危害公共安全被拘';


class New extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:'',
      user:'',
      time:'',
      type:'',
      content:'',
      comments:[]
    }

  }
  handleClick(){
    const commentAddInput=document.querySelector(".commentAddInput");
    const comment=commentAddInput.innerHTML;
    const time=new Date().toLocaleString();
    const fromuser=document.cookie.slice(7);
    const touser=this.state.user
    const newsId=this.props.location.pathname.slice(1)
    axios.post("/newcomment",{newsId,comment,time,fromuser,touser}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        console.log('ok axios');
        console.log(this.state.comments)        
        let newcomments=this.state.comments
        newcomments.push({comment,time,fromuser,touser})
        console.log(newcomments)
        this.setState({
          comments:newcomments
        })
        commentAddInput.innerHTML="";
        
      } else {
        console.log('err axios');
      }
    });

  }
  componentDidMount(){
    // console.log(this.props.location.pathname)
    axios.get(`/news?ID=${this.props.location.pathname}`).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        console.log('ok axios');
        console.log(res.data.news.comments);
        document.querySelector(".homeNewContent").innerHTML=res.data.news.content;
        this.setState({
          tittle:res.data.news.tittle,
          user:res.data.news.user,
          time:res.data.news.time,
          type:res.data.news.type,
          content:res.data.news.content,
          comments:res.data.news.comments,
        })
      } else {
        console.log('err axios');
      }
    });
    console.log(this.state)
    console.log(this.state)
    
  }
  render(){
    console.log()
    return (
      <div className='homeNew'>
        <div style={{textAlign:"center",fontSize:"40px",margin:"20px 0 20px 0"}}>{this.state.tittle}</div>
        <div style={{display:"flex",justifyContent:"space-between",width:"800px",fontSize:"14px",borderBottom:"1px solid gainsboro"}}>
          <span>新闻类型:{this.state.type}</span>
          <span>发表用户:{this.state.user}</span>
          <span>发表时间:{this.state.time}</span>
        </div>
        <div className='homeNewContent'></div>
        <div style={{height:'100px'}}>&nbsp;</div>
        <div>评论区</div>
        <hr/>
        <div className="commentList">
        {this.state.comments===[]||this.state.comments===undefined?null:
          this.state.comments.map((comment)=>{
            return (
              <div key={`${this.props.location.pathname.slice(1)+comment.time}`} style={{borderBottom:"1px solid gainsboro",marginTop:'10px',paddingBottom:'10px',width:'780px'}}>
                <div style={{display:"flex",justifyContent:"space-between",width:"800px",fontSize:"12px"}}>
                  
                  <span>
                    <span>{comment.fromuser} </span>
                    回复
                    <span> {comment.touser}</span>
                  </span>
                  <span>{comment.time}</span>
                  
                </div>
                <div style={{fontSize:"14px",marginTop:'10px',width:'780px',wordWrap:'break-word'}}>{comment.comment}</div>
                
                
                
              </div>
            )
          })
        }
        </div>
        <div className="commentAdd" style={{border:"1px solid gainsboro",marginBottom:'20px',padding:'10px',width:'780px',borderRadius:'2%',marginTop:'50px'}}>
          <div className="commentAddInput" contenteditable="true" style={{border:"1px solid gainsboro",width:'780px'}}></div>
          <hr style={{color:'gainsboro'}}/>
          <button className="commentAddButton" onClick={()=>{this.handleClick()}} style={{backgroundColor:'#FFFFFF',border:"1px solid gainsboro",left:'700px',position:'relative',borderRadius:'5%'}}>发表评论</button>
        </div>
      </div>
    )
  }
}
export default New;