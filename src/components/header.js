import React from 'react';
import {Link} from 'react-router-dom'
import search from '.././icons/search.svg'
import account from '.././icons/account.svg'
import collection from '.././icons/collection.svg'
const a= <img className='searchButton' src={search}/>;
class Header extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user:""
    }
  }
  handleMouseEnter(){
    const headMenunone=document.querySelector(".headMenunone")
    const loginHeadMenuTrue=document.querySelector(".loginHeadMenuTrue")
    const loginHeadMenuFalse=document.querySelector(".loginHeadMenuFalse")
    const nologinHeadMenu=document.querySelector(".nologinHeadMenu")
    if(document.cookie===""){
      if(nologinHeadMenu.style.display==="block"){
        nologinHeadMenu.style.display="none";
      }else{
        nologinHeadMenu.style.display="block";
      }

    }else {
      if('true'===document.cookie.slice(0,4)){
        if(loginHeadMenuTrue.style.display==="block"){
          loginHeadMenuTrue.style.display="none";
        }else{
          loginHeadMenuTrue.style.display="block";
          this.setState({user:document.cookie.slice(4)})
        }
      }else{
        if(loginHeadMenuFalse.style.display==="block"){
          loginHeadMenuFalse.style.display="none";
        }else{
          loginHeadMenuFalse.style.display="block";
          this.setState({user:document.cookie.slice(4)})
          // console.log(document.cookie.slice(4))
        }
      }

    }
  }
  handleMouseLeave(){
    document.querySelector(".loginHeadMenuTrue").style.display="none";
    document.querySelector(".loginHeadMenuFalse").style.display="none";
    document.querySelector(".nologinHeadMenu").style.display="none";
  }

  render(){
    return (
      <header>
        <div className='header'>
          <div>
            <span className='newsIcon'><Link className="aa" to="/">News</Link></span>
            <span className='all' ><Link className="aa" to="/">首页</Link></span>
            <span className='hot'>热点</span>
          </div>
          <div className='search'>
            <input className='searchInput' type="text"  placeholder="🔍搜索"/>
          </div>
          <div>
            <a title="我的收藏"><img className='collection' src={collection}/></a>
            <a title="个人中心"><img className='account' src={account} onMouseEnter={()=>{this.handleMouseEnter()}} /></a>
            <div className="nologinHeadMenu" style={{zIndex:'5'}} onMouseLeave={()=>{this.handleMouseLeave()}}>
              <span className="trianglea"></span>
              <Link className="headMenuA" to="/login">登陆</Link>
              <hr/>
              <Link className="headMenuA" to="/register">注册</Link>
            </div>
            <div className="loginHeadMenuTrue"  style={{zIndex:'5'}} onMouseLeave={()=>{this.handleMouseLeave()}}>
              <span className="triangleb"></span>
              <Link className="headMenuA" to="/userinfo">个人信息</Link>
              <hr/>
              <Link className="headMenuA" to="/publish">发表新闻</Link>
              <hr/>
              <Link className="headMenuA" to="/mynew">历史发布</Link>

            </div>
            <div className="loginHeadMenuFalse"  style={{zIndex:'5'}} onMouseLeave={()=>{this.handleMouseLeave()}}>
              <span className="triangleb"></span>
              <Link className="headMenuA" to="/userinfo">个人信息</Link>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
export default Header;
