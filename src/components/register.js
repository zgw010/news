import React from 'react';
import './register.css';
import axios from "axios";
class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:'',
      pwd:'',
      pwd2:'',
      time:'',
      avatar:'',
      desc:'',
      permission:false
    };
  }
  handleAvatarChange () {
    const registerInfo=document.querySelector('.registerInfo');    
    const input=document.querySelector('#avatarfile');
    const img=document.querySelector('.avatar');
    const form=document.querySelector('.avatarForm');
    const fd = new FormData(form);
    
    axios.post("/upavatar",fd).then(res => {
      //console.log(res.status, res.data.code);
      if (res.status === 200 && res.data.code === 0) {
        console.log('ok axios');
        this.setState({avatar:`../../service/uploadavatar/${res.data.avatarname}`})
        registerInfo.style.display='block';
        registerInfo.innerHTML=res.data.msg;
      } else {
        console.log('err axios');
        registerInfo.style.display='block';
        registerInfo.innerHTML=res.data.msg;
      }
    });
    // console.log(fd)
    // 下面三行是头像预览
    let reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(input.files[0]);

    // console.log(input.files[0])
    

  }
  handleInputChange(e,v){
    //保存input中的值到 state中
    this.setState({[e]:v.target.value})

  }
  handleClick(){
    const registerInfo=document.querySelector('.registerInfo');    
  //const data = {username: 'example'};

  // fetch('http://localhost:9003/register', {
  //   method: 'POST', // or 'PUT'
  //   body:`data=${JSON.stringify(data)}`, // data can be `string` or {object}!
  //   headers: new Headers({
  //     'Content-Type': 'application/json'
  //   })
  // }).then(res => res.json())
  //   .catch(error => console.error('Error:', error))
  //   .then(response => console.log('Success:', response));
    console.log(this.state)
    const time=new Date().toLocaleString();
    const {user,pwd,pwd2,avatar,desc,permission}=this.state
    if(!user){
      registerInfo.style.display='block';
      registerInfo.innerHTML='请输入用户名!';
      return;
    }
    if(!pwd){
      registerInfo.style.display='block';
      registerInfo.innerHTML='请输入密码!';
      return;      
    }
    if(!pwd2){
      registerInfo.style.display='block';
      registerInfo.innerHTML='请输入第二次密码!';
      return;      
    }
    if(pwd2!==pwd){
      registerInfo.style.display='block';
      registerInfo.innerHTML='两次输入密码不一致!';
      return;
    }
    registerInfo.innerHTML='';
    axios.post("/register", {
      user,pwd,avatar,desc,permission,time
    }).then(res => {
      //console.log(res.status, res.data.code);
      if (res.status === 200 && res.data.code === 0) {
        console.log('ok axios');
        registerInfo.style.display='block';
        registerInfo.innerHTML=res.data.msg;
      } else {
        console.log('err axios');
        registerInfo.style.display='block';
        registerInfo.innerHTML=res.data.msg;
      }
    });
  }
  render(){
    return (
      <div className='registerForm'>
        <img src="https://pic4.zhimg.com/da8e974dc_xl.jpg" className="avatar"/>
        {/* action字段与server.js中的const upload = multer({ dest: 'upload/' }) 呼应 enctype必须设置为"multipart/form-data"才可以传输ormdata数据 */}
        <form className="avatarForm" action="/uploadavatar" enctype="multipart/form-data">
          <input type="file" name="file" id="avatarfile" onChange={()=>{this.handleAvatarChange()}}/>
        </form>
        <button className="avatarpost" onClick={()=>document.querySelector('#avatarfile').click()} >点击上传头像</button>
        <input type="text"  className="inputRegister user" placeholder="用户名" onChange={(v)=>{this.handleInputChange('user',v)}}/>
        <input type="password"  className="inputRegister pwd" placeholder="密码" onChange={(v)=>{this.handleInputChange('pwd',v)}}/>
        <input type="password"  className="inputRegister pwd2" placeholder="再次输入密码" onChange={(v)=>{this.handleInputChange('pwd2',v)}}/>
        <input type="text"  className="inputRegister desc" placeholder="简介" onChange={(v)=>{this.handleInputChange('desc',v)}}/>
        <div   className="registerInfo"></div >
        <button className="Register" onClick={()=>{this.handleClick()}}>注册</button>
      </div>
    )
  }
}
export default Register;