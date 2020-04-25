//跨浏览器检测
(function(){
	window.sys={};
	var ua=navigator.userAgent.toLowerCase();
	var s;
	(s=ua.match(/msie([\d.]+)/))?sys.ie=s[1]:
	(s=ua.match(/firefox\/([\d.]+)/))?sys.firefox=s[1]:
	(s=ua.match(/chrome\/([\d.]+)/))?sys.chrome=s[1]:
	(s=ua.match(/opera\/.*version\/([\d.]+)/))?sys.opera=s[1]:
	(s=ua.match(/version\/([\d.]+).*safri/))?sys.safari=s[1]:0;

	if(/webkit/.test(ua)) sys.webkit=ua.match(/webkit\/([\d.]+)/)[1];
})();

//DOM加载
function addDomLoaded(fn){
  var isReady=false;
  timer=null;
  function doReady(){
  if(timer) clearInterval(timer);
  if(isReady) return;
  isReady=true;
  fn();
  }
  if((sys.opera&&sys.opera<9)||(sys.firefox&&sys.firefox<3)||(sys.webkit&&sys.webkit<525)){
  	//基本上不可能用到
  	timer=setInterval(function(){
	if(/loaded|complete/.test(document.readyState)){//loaded是部分加载，complete是完全加载
		doReady();
	}
  },1);	
  }else if(document.addEventListener){ //W3C
		addEvent(document,'DOMContentLoaded',function(){
			fn();
		removeEvent(document,'DOMContentLoaded',arguments.callee);
	     });
	}else if(sys.ie&&sys.ie<9){   //IE
		var timer=null;
		timer=setInterval(function(){
	    try{
		document.documentElement.doScroll('left');
		   doReady();
	      }catch(e){};
       },1);
	}
}

//跨浏览器事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener!='undefined'){
		obj.addEventListener(type,fn,false);
	}else{
       //创建一个存放事件的哈希表
       if(!obj.events) obj.events={};
       //第一次执行时执行
       if(!obj.events[type]){
       	//创建一个存放事件处理函数的数组
       	obj.events[type]=[];
       	//把第一次的事件处理函数先储存到第一个位置上
       	if(obj['on'+type]) obj.events[type][0]=fn;
       }else{
       	if(addEvent.equal(obj.events[type]),fn) return false;
       }
       //从第二次开始我们用事件处理计数器来储存
       obj.events[type][addEvent.ID++]=fn;
       //执行事件处理函数
       obj['on'+type]=addEvent.exec;
	}
}
addEvent.ID=1;
addEvent.exec=function(event){
	var e=event||window.event;
	var es=this.events[e.type];
	for(var i in es){
		es[i].call(this,e);
	}
};

//同一个函数进行屏蔽
addEvent.equal=function(es,fn){
	for(var i in es){
		if(es[i]==fn) return true;
	}
	return false;
};


//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent=function(event){
	event.preventDefault=addEvent.fixEvent.preventDefault;
	event.stopPropagation=addEvent.fixEvent.stopPropagation;
	event.target=event.srcElement;
	return event;
};

//IE阻止默认行为
addEvent.fixEvent.preventDefault=function(){
	this.returnValue=false;
};

//IE取消冒泡
addEvent.fixEvent.stopPropagation=function(){
	this.cancelBubble=true;
};

//跨浏览器移除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener!='undefined'){
		obj.removeEventListener(type,fn,false);
	}else {
		if(obj.events){
			for(var i in obj.event[type]){
			if(obj.events[type][i]==fn){
				delete obj.events[type][i];
			}
		}
		}
		
	}
}

//跨浏览器获取视口大小
function getInner(){
	if(typeof window.innerWidth!='undefined'){
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}

//跨浏览器获取滚动条位置
function getScroll(){
	return{
      top:document.documentElement.scrollTop||document.body.scrollTop,
      left:document.documentElement.scrollLeft||document.body.scrollLeft
	}
}

//跨浏览器获取style
function getStyle(element,attr){
  var value;
  if(typeof window.getComputedStyle!='undefined'){
  value=window.getComputedStyle(element,null)[attr];
  }else if(typeof element.currentStyle!='undefined'){
  value=element.currentStyle[attr];
 }
  return value;
}

//获取Event对象
function getEvent(event){
	return event||window.event;
}

//阻止默认行为
function preDef(event){
	var e=getEvent(event);
	if(typeof e.preventDefault!='undefined'){
		e.preventDefault();        //W3C
	}else{
		e.returnValue=false;      //IE
	}
}

function addDomloaded(fn){
	if(document.addElementListener){
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else{
		var timer=null;
		timer=setInterval(function(){
			try{
				document.documentElement.doScroll('left');
				fn();
			}catch(e){};
		});
	}
}

addDomloaded(function(){
	var box=document.getElementById('box');
	alert(box.innerHTML);
});

//跨浏览器获取innerText
function getInnerText(element){
	return (typeof element.textContent=='string')?element.textContent:element.innerText;
}

//跨浏览器设置innerText
function setInnerText(element,text){
	if(typeof element.textContent=='string'){
		element.textContent=text;
	}else{
		element.innerText=text;
	}
}

//获取某一个节点的上一个节点的索引
function prevIndex(current,parent){
	var length=parent.children.length;
	if(current==0) return length-1;
	return parseInt(current)-1;
}

//获取某一个节点的下一个节点的索引
function nextIndex(current,parent){
	var length=parent.children.length;
	if(current==length-1) return 0;
	return parseInt(current)+1;
}

//滚动条固定
function fixedScroll(){
	setTimeout(function(){
      window.scrollTo(fixedScroll.left,fixedScroll.top);
	},100)
}

//阻止默认行为
function predef(e){
  e.preventDefault();
}

//创建 cookie
function setCookie(name, value, expires, path, domain, secure) {
	var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires instanceof Date) {
	cookieText += '; expires=' + expires;
	}
	if (path) {
	cookieText += '; expires=' + expires;
	}
	if (domain) {
	cookieText += '; domain=' + domain;
	}
	if (secure) {
	cookieText += '; secure';
	}
	document.cookie = cookieText;
}

function getCookie(name) {
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1) {
	var cookieEnd = document.cookie.indexOf(';', cookieStart);
	if (cookieEnd == -1) {
	cookieEnd = document.cookie.length;
	}
	cookieValue = decodeURIComponent(
	document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
	}
	return cookieValue;
}

//删除 cookie
function unsetCookie(name) {
document.cookie = name + "= ; expires=" + new Date(0);
}
