import React from 'react';
import './publish.css'
import axios from "axios";
import E from 'wangeditor'
class Publish extends React.Component{
  constructor(props){
    super(props)
    this.state={
      _id:"",
      tittle:"",
      content:"",
      time:"",
      img:"news.png",
      type:"",
      user:"",
    }
  }
  handleImgChange () {
    const input=document.querySelector('#imgfile');
    const img=document.querySelector('.newsMainImg');
    const form=document.querySelector('.imgForm');
    const fd = new FormData(form);

    // 下面三行是主图预览
    let reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(input.files[0]);


    axios.post("/upimg",fd).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        console.log('ok axios');
        this.setState({img:res.data.imgname})
      } else {
        console.log('err axios');
      }
    });
  }

  componentDidMount(){
  // E
  const elem = this.refs.editorElem
  const editor = new E(elem)
  editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
      // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
  editor.customConfig.onchange = html => {
    this.setState({
      content: html
    })
  }
  editor.create()
  // E
  console.log("ok editor")
  axios.get(`/news?ID=${this.props.location.pathname.slice(10)}`).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      console.log('ok axios');
      console.log(res.data.news)
      editor.txt.html(res.data.news.content)
      this.setState({
        tittle:res.data.news.tittle,
        type:res.data.news.type,
        img:res.data.news.img,
        _id:res.data.news._id,
        content:res.data.news.content
      })
    } else {
      console.log('err axios');
    }
  });
}

clickHandle() {
  const registerInfo=document.querySelector(".registerInfo")
  
  const time=new Date().toLocaleString();
  const obj = document.querySelector(".selectType"); //定位id
  const index = obj.selectedIndex; // 选中索引
  const type = obj.options[index].text; // 选中文本
  const user=document.cookie.slice(4);
  const {_id,content,img}=this.state;
  const tittle=document.querySelector(".publishInputTitle").value
  console.log({time,content,user,type,img,tittle})
  axios.post("/updatenew", {_id,time,content,type,img,tittle}).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      console.log('ok axios');
      registerInfo.style.display='block';
      registerInfo.innerHTML=res.data.msg;
    } else {
      console.log('err axios');
    }
  });
}

handleInputChange(e,v){
  //保存input中的值到 state中
  this.setState({[e]:v.target.value})

}


  render(){
    console.log("_id",this.props.location.pathname.slice(11))
    return(
      <div className="publishInput">
        <img src={require("../../service/uploadimg/"+this.state.img)}  className="newsMainImg" style={{marginLeft:'300px'}}/>
        <p style={{fontSize:'12px',textAlign:'center'}}>主图发表后不可以修改,可修改新闻标题,内容及分类.若想修改新闻主图,可删除本条新闻后重新发表</p>
        <input type="text" className="publishInputTitle" value={this.state.tittle}  onChange={(v)=>{this.handleInputChange('tittle',v)}}></input>
        <div   className="registerInfo" style={{textAlign:'center'}}></div >

        {/* E */}
        <div className="Editor" >
          {/* 将生成编辑器 */}
          <div ref="editorElem" style={{textAlign: 'left',height:'340px'}} value={this.state.content}>
          </div>
          <select className="selectType">
            <option>选择新闻主题</option>
            <option>科技</option>
            <option>娱乐</option>
            <option>政治</option>
            <option>游戏</option>            
            <option>时尚</option>
            <option>军事</option>
            <option>其他</option>
          </select>
          <button className="publish" onClick={this.clickHandle.bind(this)}>发表新闻</button>
        </div>
        
        
          
      </div>
    )
  }
}
export default Publish;