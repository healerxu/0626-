let index=0;
//获取最外面的div
let box = my$("box");
//获取相框
let inner = box.children[0];
//获取去相框的宽度
let imgWidth = inner.offsetWidth;
// 获取ul
let ulObj = inner.children[0];
//获取ul中所有的li
let list = ulObj.children;
//获取ol
let olObj = inner.children[1];
//获取焦点
let arr = my$("arr");

 //创建小按钮-----根据ul中li的个数
 for (let i = 0; i < list.length; i++) {
    let liObjs = document.createElement("li");
    olObj.appendChild(liObjs);
    liObjs.innerHTML = (i + 1);
    //在ol中每个li中增加自定义属性，添加索引值
    liObjs.setAttribute("index", i);
    //注册鼠标进入事件
    liObjs.onmouseover = function () {
     //先干掉所有背景颜色
     for (let j = 0; j < olObj.children.length; j++) {
      olObj.children[j].removeAttribute("class");
     }
     //设置当前鼠标进来的类样式
     this.className = "current";
     //获取ol中li的索引值
      index = this.getAttribute("index");
     //移动ul
     animate(ulObj, -index * imgWidth); //移动动画函数
    };
   }
   //设置第一个ol中li的背景颜色
   olObj.children[0].className = "current";
   //克隆ol中第一个li放到最后一个
   ulObj.appendChild(ulObj.children[0].cloneNode(true));
 let timeId=setInterval(clickHandle,3000);
 
 my$("box").onmouseover=function(){
  arr.style.display="block";
  clearInterval(timeId);
 };

  //点击右边按钮
  my$("right").onclick=clickHandle;
  function clickHandle() {
   if (index==ulObj.children.length-1){
    ulObj.style.left=0+"px";
    index=0;
   }
   index++;
   animate(ulObj,-index*imgWidth);
   if (index==list.length-1){
    olObj.children[0].className="current";
    olObj.children[olObj.children.length-1].className="";
   }else {
    for (let i=0;i<olObj.children.length;i++){
     olObj.children[i].className="";
    }
    olObj.children[index].className="current";
   }
  };
  //点击左边按钮
  my$("left").onclick=function () {
   if (index==0){
    index=list.length-1;
    ulObj.style.left=-index*imgWidth+"px";
   }
   index--;
   animate(ulObj,-index*imgWidth);
   for (let i=0;i<olObj.children.length;i++){
    olObj.children[i].className="";
   }
   olObj.children[index].className="current";
  };
 
 my$("box").onmouseout=function(){
  arr.style.display="none";
  timeId=setInterval(clickHandle,3000);
 };
 
 
 
 // 设置一个元素，移动到指定位置
 function animate(element, target) {
  clearInterval(element.timeId);
  element.timeId = setInterval(function () {
   let current = element.offsetLeft;
   let step = 9;
   step = current > target ? -step : step;
   current += step;
   if (Math.abs(target - current) > Math.abs(step)) {
    element.style.left = current + "px";
   } else {
    clearInterval(element.timeId);
    element.style.left = target + "px";
   }
  }, 10);
 }
function my$(id) {
 　　 return document.getElementById(id);
}
