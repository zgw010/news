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
  handleClick(){
    console.log(document.cookie)
    
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

  
  render(){
    return (
      <header> 
        <div className='header'>
          <div>
            <span className='newsIcon'><a className="aa" href="http://localhost:3000/">News</a></span>
            <span className='all' ><a className="aa" href="http://localhost:3000/">首页</a></span>
            <span className='hot'>热点</span>
          </div>
          <div className='search'>
            <input className='searchInput' type="text"  placeholder="🔍搜索"/>
          </div>
          <div>
            <a title="我的收藏"><img className='collection' src={collection}/></a>
            <a title="个人中心"><img className='account' src={account} onClick={()=>{this.handleClick()}}/></a>
            <div className="nologinHeadMenu" style={{zIndex:'5'}} >
              <span className="triangle"></span>
              <a className="headMenuA" href="http://localhost:3000/login">登陆</a>
              <hr/>
              <a className="headMenuA" href="http://localhost:3000/register">注册</a>
            </div>
            <div className="loginHeadMenuTrue"  style={{zIndex:'5'}}>
              <span className="triangle"></span>
              <Link className="headMenuA" to="/userinfo">个人信息</Link>
              <hr/>
              <Link className="headMenuA" to="/publish">发表新闻</Link>
              <hr/>
              <Link className="headMenuA" to="/publish">历史发布</Link>

            </div>
            <div className="loginHeadMenuFalse"  style={{zIndex:'5'}}>
              <span className="triangle"></span>
              <Link className="headMenuA" to="/userinfo">个人信息</Link>           
            </div>
          </div>
        </div>
      </header>
    )
  }
}
export default Header;