/*var Base={
	getId:function(id){
		return document.getElementById(id);
	},
	getName:function(name){
		return document.getElemenstByName(name);
	},
	getTagName:function(tagName){
		return document.getElementByTagName(tagName);
	}
};*/


var $=function(args){
	return new Base(args);
}
function Base(args){
	//创建一个数组，来保存获取的节点和节点数组
	this.elements=[];
	if(typeof args=='string'){
		//css模拟
		if(args.indexOf(' ')!=-1){
          var elements=args.split(' ');//把节点拆开分别保存到数组里
          var childElements=[];        //存放临时节点对象的数组，解决被覆盖的问题
          var node=[];                 //用来存放父节点用的
          for(var i=0;i<elements.length;i++){
          	if(node.length==0) node.push(document);   //如果默认无父节点，将document放入
          	switch(elements[i].charAt(0)){
       	    case'#':
       	    childElements=[];     //清理临时节点
       	    childElements.push(this.getId(elements[i].substring(1)));
       	    node=childElements;
       	    break;
       	    case'.':
       	    childElements=[];
       	    for(var j=0;j<node.length;j++){
       	    var temps=this.getClass(elements[i].substring(1),node[j]);
       	    for(var k=0;k<temps.length;k++){
       	    	childElements.push(temps[k]);
       	    }
       	}
       		node=childElements;
       	    break;
       	    default:
       	    childElements=[];
       	    for(var j=0;j<node.length;j++){
       	    var temps=this.getTagName(elements[i],node[j]);
       	    for(var k=0;k<temps.length;k++){
       	    	childElements.push(temps[k]);
       	    }
       	}
       	node=childElements;
       }
          }
          this.elements=childElements;
		}else{
		//find模拟
       switch(args.charAt(0)){
       	case'#':
       	this.elements.push(this.getId(args.substring(1)));
       	break;
       	case'.':
       	this.elements=this.getClass(args.substring(1));
       	break;
       	default:
       	this.elements=this.getTagName(args);
       }
   }
	}else if(typeof args=='object'){
	if(args!=undefined){//this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的undefined
		this.elements[0]=args;
	}
	}else if(typeof args=='function'){
		this.ready(args);
	}	
}

//addDomLoaded
Base.prototype.ready=function(fn){
  addDomLoaded(fn);
};

//通过id获取,相当于返回了两个元素，一个是Base,一个是Base下的特定元素
Base.prototype.getId=function(id){
		//this.elements.push(document.getElementById(id));
		return document.getElementById(id);
		
	};
//通过tagName获取
Base.prototype.getTagName=function(tag,parentNode){
		/*var tags=document.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++){
			this.elements.push(tags[i]);
		}*/
		var node=null;
		var temps=[];
	    if(parentNode!=undefined){
		node=parentNode;
	    }else{
		node=document;
	}
	    var tags=node.getElementsByTagName(tag);
	    for(var i=0;i<tags.length;i++){
		  temps.push(tags[i]);
	   }
	return temps;
	};
//通过className获取
Base.prototype.getClass=function(className,parentNode){
	var node=null;
	/*if(arguments.length==2){
		node=document.getElementById(idName);
	}else{
		node=document;
	}*/
	var temps=[];
	if(parentNode!=undefined){
		node=parentNode;
	}else{
		node=document;
	}
	var all=node.getElementsByTagName('*');
	for(var i=0;i<all.length;i++){
		//if(all[i].className==className){
		  if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)) {
			temps.push(all[i]);
		}
	}
	return temps;
};
//设置css选择器子节点
Base.prototype.find=function(str){
	var childElements=[];
	for(var i=0;i<this.elements.length;i++){
	 switch(str.charAt(0)){
       	case'#':
       	childElements.push(this.getId(str.substring(1)));
       	break;
       	case'.':
       	  /*var all=this.elements[i].getElementsByTagName('*');
	      for(var j=0;j<all.length;j++){
		    if(all[j].className==str.substring(1)){
			childElements.push(all[j]);
		}
	}*/   
	       var temps=this.getClass(str.substring(1),this.elements[i]);
	       for(var j=0;j<temps.length;j++) {
	       	childElements.push(temps[j]);
	       }
       	break;
       	default:
       	  /*var tags=this.elements[i].getElementsByTagName(str);
		   for(var j=0;j<tags.length;j++){
			childElements.push(tags[j]);
		    }*/
		    var temps=this.getTagName(str,this.elements[i]); 
		    for(var j=0;j<temps.length;j++) {
	       	childElements.push(temps[j]);
	       }
	    }
	}
	this.elements=childElements;
	return this;	
};
//获取单个节点,并返回这个节点对象
Base.prototype.getElement=function(num){
	return this.elements[num];
};
//获取首个节点，并返回这个节点对象
Base.prototype.first=function(){
	return this.elements[0];
};
//获取末个节点，并返回这个节点对象
Base.prototype.last=function(){
	return this.elements[this.elements.length-1];
};
//获取某组节点的数量
Base.prototype.length=function(){
	return this.elements.length;
};
//获取某一个节点的属性
Base.prototype.attr=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
    //return this.elements[0][attr];
    return this.elements[i].getAttribute(attr);
}else if(arguments.length==2){
	this.elements[i].setAttribute(attr,value);
}
}
return this;
};
//获取某一个节点在整个节点组中是第几个索引
Base.prototype.index=function(){
	var children=this.elements[0].parentNode.children;
	for(var i=0;i<children.length;i++) {
		if(this.elements[0]==children[i])
		return i;
	}
};
//设置某一个节点的透明度
Base.prototype.opacity=function(num){
    for(var i=0;i<this.elements.length;i++){
       this.elements[i].style.opacity=num/100;
       this.elements[i].style.filter='alpha(opacity'+num+')';
    }
    return this;	
};
//获取某一个节点，并返回Base对象
Base.prototype.eq=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
};
//获取当前元素节点的下一元素节点
Base.prototype.next=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].nextSibling;
		if(this.elements[i]==null) throw new Error('找不到下一个同级元素节点!');
		if(this.elements[i].nodeType==3) this.next();	
	}
	return this;
};
//获取当前元素节点的上一元素节点
Base.prototype.prev=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].previousSibling;
		if(this.elements[i]==null) throw new Error('找不到上一个同级元素节点!');
		if(this.elements[i].nodeType==3) this.prev();	
	}
	return this;
};
//设置css
Base.prototype.css=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
		  return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr]=value;
	}
	return this;
};
//添加Class
Base.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
	if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
		this.elements[i].className+=' '+className;
	}
}
return this;
};
//移除Class
Base.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
	if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
		this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
	}
}
return this;
};
//添加link或style的css规则
Base.prototype.addRule=function(num,selectorText,cssText,position){
	var sheet=document.styleSheets[num];
	if(typeof sheet.insertRule!='undefined'){//W3C
      sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.addRule!='undefined'){//IE
	   sheet.addRule(selectorText,cssText,position);
	}
	return this;
};
//移除link或style的css规则
Base.prototype.removeRule=function(num,index){
	var sheet=document.styleSheets[num];
	if(typeof sheet.deleteRule!='undefined'){//W3C
      sheet.deleteRule(index);
	}else if(typeof sheet.removeRule!='undefined'){//IE
	  sheet.removeRule(index);
	}
	return this;
};
//设置表单字段元素
Base.prototype.form=function(name){
   for(var i=0;i<this.elements.length;i++){
   	this.elements[i]=this.elements[i][name];
   }
   return this;
};
//设置表单字段内容获取
Base.prototype.value=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].value;
		}
		this.elements[i].value=str;
	}
	return this;
};
//某一个值是否存在在数组中
  function inArray(array,value){
    for(var i in array){
      if(array[i]==value) return true;
    }
    return false;
  }
  //获取某一个元素到最外层的顶点的位置
  function offsetTop(element){
  	var top=element.offsetTop;
  	var parent=element.offsetParent;
  	while(parent!=null){
  		top+=parent.offsetTop;
  		parent=parent.offsetParent;
  	}
  	return top;
  }
//移除左后空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
//滚动条清零
function scrollTop(){
document.documentElement.scrollTop=0;
			document.body.scrollTop=0;	
}
//设置html
Base.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML=str;
	}
	return this;
};
//设置innerText
Base.prototype.text=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return getInnerText(this.elements[i]);
		}
		setInnerText(this.elements[i],text);
	}
	return this;
};
//设置事件发生器
Base.prototype.bind=function(event,fn){
   for(var i=0;i<this.elements.length;i++){
   	addEvent(this.elements[i],event,fn);
   }
   return this;
};
//设置鼠标移入移出方法
Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
		//this.elements[i].onmouseover=over;
		//this.elements[i].onmouseout=out;
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
};
//设置点击切换方法
Base.prototype.toggle=function(){
	for(var i=0;i<this.elements.length;i++){
	(function(element,args){
      var count=0;
      addEvent(element,'click',function(){
       args[count++%args.length].call(this);
     });	
      })(this.elements[i],arguments);
	}
	return this;
};
//设置显示
Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	}
	return this;
};
//设置隐藏
Base.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	}
	return this;
};
//设置物体居中
Base.prototype.center=function(width,height){
   var top=(getInner().height-height)/2+getScroll().top;
   var left=(getInner().width-width)/2+getScroll().left;
   for(var i=0;i<this.elements.length;i++){
   	this.elements[i].style.top=top+'px';
   	this.elements[i].style.left=left+'px';
   	}
	return this;
};
//锁屏功能
Base.prototype.lock=function(){
for(var i=0;i<this.elements.length;i++){
	    fixedScroll.top=getScroll().top;
	    fixedScroll.left=getScroll().left;
		this.elements[i].style.width=getInner().width+getScroll().left+'px';
		this.elements[i].style.height=getInner().height+getScroll().top+'px';
		this.elements[i].style.display='block';
		parseFloat(sys.firefox)<4?document.body.style.overflow="hidden":document.documentElement.style.overflow="hidden";     //锁屏时隐藏滚动条

		addEvent(this.elements[i],'mousedown',predef);
		addEvent(this.elements[i],'mouseup',predef);
		addEvent(this.elements[i],'selectstart',predef);
		addEvent(window,'scroll',fixedScroll);
	}
	return this;	
};
Base.prototype.unlock=function(){
for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
		parseFloat(sys.firefox)<4?document.body.style.overflow="auto":document.documentElement.style.overflow="auto";     //解锁是恢复成默认状态
		removeEvent(this.elements[i],'mousedown',predef);
		removeEvent(this.elements[i],'mouseup',predef);
		removeEvent(this.elements[i],'selectstart',predef);
		removeEvent(window,'scroll',fixedScroll);
	}
	return this;	
};
//触发点击事件
Base.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=fn;
	}
	return this;
};
//触发浏览器窗口事件
Base.prototype.resize=function(fn){
  for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
	window.onresize=function(){
		fn();
		if(element.offsetLeft>getInner().width+getScroll().left-element.offsetWidth){
         element.style.left=getInner().width+getScroll().left-element.offsetWidth+'px';
		}
		if(element.offsetTop>getInner().height+getScroll().top-element.offsetHeight){
			element.style.top=getInner().height+getScroll().top-element.offsetHeight+'px';
		}
	};
   }
	return this;
};
//设置动画
//var timer=null;
Base.prototype.animate=function(obj){
  for(var i=0;i<this.elements.length;i++){
  	var element=this.elements[i];
  	var attr=obj['attr']=='x'?'left':obj['attr']=='y'?'top':
  	         obj['attr']=='w'?'width':obj['attr']=='h'?'height':
  	         obj['attr']=='o'?'opacity':obj['attr']!=undefined?obj['attr']:'left';
  	var start=obj['start']!=undefined?obj['start']:
  	obj['start']=='opacity'?parseFloat(getStyle(element,attr))*100:parseInt(getStyle(element,attr));
  	var time=obj['time']!=undefined?obj['time']:50;
  	var step=obj['step']!=undefined?obj['step']:10;
  	var target=obj['target'];
  	var alter=obj['alter'];
  	var mul=obj['mul'];
  	var speed=obj['speed']!=undefined?obj['speed']:6;
  	var type=obj['type']==0?'constant':obj['type']==1?'buffer':'buffer';
    
    if(alter!=undefined&&target==undefined){
    	target=alter+start;
    }else if(alter==undefined&&target==undefined&&mul==undefined){
    	throw new Error('alter增量和target目标量必须传一个');
    }

  	if(start>target) step=-step;
  	if(attr=='opacity'){
  	  element.style.opacity=parseInt(start)/100;
      element.style.filter='alpha(opacity='+parseInt(start)+')'
  	}else{
  	//element.style[attr]=start+'px';
    }

   if(mul==undefined){
   	mul={};
   	mul[attr]=target;
   }

  	clearInterval(element.timer);
    element.timer=setInterval(function(){
    
    /*
     问题1：多个动画执行多个列队动画，我们要求不管多少个动画只执行一个列队动画
     问题2：多个动画数值差别太大，导致动画无法执行到目标值，原因是定时器提前清理掉了

     解决1：不管多少个动画，只提供一次列队动画的机会
     解决2：多个动画按最后一个分动画执行完毕后再清理即可
    */
    //创建一个布尔值，这个值可以了解多个动画是否全部执行完毕
    var flag=true; //表示执行完毕

       for(var i in mul){
    	attr=i=='x'?'left':i=='y'?'top':i=='w'?'width':i=='h'?'height':i=='o'?'opacity':i!=undefined?i:'left';
    	target=mul[i];

    	if(type=='buffer'){
    		step=attr=='opacity'?(target-parseFloat(getStyle(element,attr))*100)/speed:
    		(target-parseInt(getStyle(element,attr)))/speed;
    		step=step>0?Math.ceil(step):Math.floor(step);
    	}
    if(attr=='opacity'){
    if(step==0){
      setOpacity();
    }else if(step>0&&Math.abs(parseFloat(getStyle(element,attr))*100-target)<=step){
      setOpacity();
    }else if(step<0&&(parseFloat(getStyle(element,attr))*100-target)<=Math.abs(step)){
       setOpacity();
    }else{
    	 var temp=parseFloat(getStyle(element,attr))*100;
        element.style.opacity=parseInt(temp+step)/100;
        element.style.filter='alpaha(opacity'+parseInt(temp+step)+')';
    }

    if(parseInt(target)!=parseInt(parseFloat(getStyle(element,attr))*100)) flag=false;	
    	
    }else{
     //如果放在else后面，会慢一拍，执行的值可能会超过target，之后又后退一下
    //element.style[attr]=getStyle(element,attr)+step+'px';	
    if(step==0){
    	setTarget();
    }else if(step>0&&Math.abs(parseInt(getStyle(element,attr))-target)<=step){
      setTarget();
    }else if(step<0&&(parseInt(getStyle(element,attr))-target)<=Math.abs(step)){
       setTarget();
    }else{
    	element.style[attr]=parseInt(getStyle(element,attr))+step+'px';
     }
     if(parseInt(target)!=parseInt(getStyle(element,attr)))  flag=false;
     //document.getElementById('test').innerHTML+=i+'--'+target+'--'+parseInt(getStyle(element,attr))+'<br/>';	
     }
    }
    
    if(flag)  {
     clearInterval(element.timer);
      if(obj.fn!=undefined) obj.fn();
 }
    },time);
    function setTarget(){
      element.style[attr]=target+'px';
      
    }

    function setOpacity(){
    	element.style.opacity=parseInt(target)/100;
      element.style.filter='alpaha(opacity'+parseInt(target)+')';
     
    }
   }
 return this;
};
//插件接口
Base.prototype.extend=function(name,fn){
  Base.prototype[name]=fn;
};
