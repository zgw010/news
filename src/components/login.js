import React from 'react';
import axios from 'axios';
import './login.css';

class Login extends React.Component{
  handleClick(){
    const userInput=document.querySelector('.usernameLogin');
    const pwdInput=document.querySelector('.pwdLogin');
    const registerInfo=document.querySelector('.registerInfo');  
    let user=userInput.value;
    let pwd=pwdInput.value;
    
    axios.post("/login", {
      user,pwd
    }).then(res => {
      //console.log(res.status, res.data.code);
      if (res.status === 200 && res.data.code === 0) {
        console.log('ok axios');
        registerInfo.style.display='block';
        registerInfo.innerHTML=res.data.msg;
        // console.log(c)
        // 把用户的发表权限和用户名储存在cookie中
        document.cookie = res.data.permission+user;
      } else {
        console.log('err axios');
        registerInfo.style.display='block';
        registerInfo.innerHTML=res.data.msg;
      }
    });
  }
  render(){
    return (
      <div className='loginForm'>
        <input type="text" name="username" className="usernameLogin" placeholder="用户名"/>
        <input type="password" name="psw" className="pwdLogin" placeholder="密码"/>
        <div className="registerInfo">dsadsa</div >
        <button className="Login" onClick={()=>{this.handleClick()}}>登陆</button>
      </div>
    )
  }
}
export default Login;