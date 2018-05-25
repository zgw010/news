import React from 'react';
import './publish.css'
import axios from "axios";
import E from 'wangeditor'
class Publish extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:"",
      content:"",
      time:"",
      img:"news.png",
      type:"",
      user:""
    }
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


  }
  clickHandle() {
    const time=new Date().toLocaleString();
    const obj = document.querySelector(".selectType"); //定位id
    const index = obj.selectedIndex; // 选中索引
    const type = obj.options[index].text; // 选中文本
    const user=document.cookie.slice(7);
    const {content,img}=this.state;
    const tittle=document.querySelector(".publishInputTitle").value
    // console.log(this.state)
    console.log({time,content,user,type,img,tittle})
    // document.querySelector(".Editor").innerHTML=this.state.content;
    axios.post("/publish", {time,content,user,type,img,tittle}).then(res => {
      //console.log(res.status, res.data.code);
      if (res.status === 200 && res.data.code === 0) {
        console.log('ok axios');
      } else {
        console.log('err axios');
      }
    });
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
        console.log(res.data.imgname);
        this.setState({img:res.data.imgname})
      } else {
        console.log('err axios');
      }
    });
  }
  render(){
    return(
      <div className="publishInput">
        
        <form className="imgForm" action="/imgFile" enctype="multipart/form-data">
          <input type="file" name="file" id="imgfile" onChange={()=>{this.handleImgChange()}}/>
        </form>
        
        <img src={require("../../service/upload/news.png")} className="newsMainImg"/>
        <button className="imgpost" onClick={()=>document.querySelector('#imgfile').click()} >点此插入新闻主图  插入后在左侧预览 仅在首页显示</button>
        <input type="text" className="publishInputTitle" placeholder="新闻标题"/>

        {/* E */}
        <div className="Editor" >
          {/* 将生成编辑器 */}
          <div ref="editorElem" style={{textAlign: 'left',height:'340px'}}>
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