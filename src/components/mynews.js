import React from 'react';
import axios from 'axios';
import {withRouter,Link} from "react-router-dom";

class Mynew extends React.Component {
  constructor(props){
    super(props)
    this.state={
      newlist:[]
    }
  }
  handleClickDelete(e){
    axios.delete(`/deletenews?NEWID=${e}`).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        console.log('ok axios');
        axios.get(`/mynews?USER=${document.cookie}`).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            console.log('ok axios');
            this.setState({newlist:res.data.doc})
          } else {
            console.log('err axios');
          }
        });
      } else {
        console.log('err axios');
      }
    });
  }
  getnews(){
    
  }
  componentDidMount(){
    axios.get(`/mynews?USER=${document.cookie}`).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        console.log('ok axios');
        this.setState({newlist:res.data.doc})
      } else {
        console.log('err axios');
      }
    });
  }

  render(){
    return(
      <div className="home">
        <div className="newsList">
          {this.state.newlist.map((value)=>{
            const {tittle,time,user,_id,img,type}=value;
            return (
              <div key={_id} className="newwrap">
                <img src={require("../../service/uploadimg/"+img)} className="newsListImg"/>
                
                <div className="newinfo">
                  <div >新闻类型 : {type}</div>
                  <div >新闻标题 : {tittle}</div>
                  <div >发表用户 : {user}</div>
                  <div >发表时间 : {time}</div>
                  {document.cookie.slice(4)===user?
                  <span>
                    <span style={{zIndex:'1000',fontSize:'11px',margin:'0px 60px 0 40px'}}><Link to={`/updatenew/${_id}`} style={{textDecoration:'none',color:'blue'}}>编辑</Link></span>
                    <span onClick={()=>{this.handleClickDelete(_id)}} style={{color:'red',fontSize:'11px'}}>删除</span>
                  </span>
                    :null
                  }
                  {/* <span style={{fontSize:'11px',margin:'0px 60px 0 40px',color:'blue'}}>编辑</span>
                  <span style={{color:'red',fontSize:'11px'}}>删除</span> */}
                </div>
              
                
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
export default Mynew;