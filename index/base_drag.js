//拖拽功能
//点击某个物体，用oDiv即可，move和up是全局区域，也就是整个文档通用，应该用ducument
$().extend('drag',function(){
    var tags=arguments;
	for(var i=0;i<this.elements.length;i++){
		//this.elements[i].onmousedown=function(e){
			addEvent(this.elements[i],'mousedown',function(e){	
			//preDef(e);        //解决低版本火狐bug
			if(trim(this.innerHTML).length==0) e.preventDefault();
			//var e=getEvent(e);
			var _this=this;
            var diffX=e.clientX-_this.offsetLeft;
            var diffY=e.clientY-_this.offsetTop;

            //自定义拖拽区域
            var flag=false;
            for(var i=0;i<tags.length;i++){
                if(e.target==tags[i]){
                    flag=true;
                    break;
                }
            }
            //alert(e.target.tagName);
            if(flag){
            //document.onmousemove=function(e){
            	addEvent(document,'mousemove',move);
            //document.onmouseup=function(){
            	addEvent(document,'mouseup',up);
            }else{
            	removeEvent(document,'mousemove',move);
            	removeEvent(document,'mouseup',up);
            }
           function move(e){
           	//var e=getEvent(e);
            	var left=e.clientX-diffX;
            	var top=e.clientY-diffY;
            	if(left<0){
            		left=0;
            	}else if(top<=getScroll().left){
                    top=getScroll().left;
                }else if(left>getInner().width+getScroll().left-_this.offsetWidth){
            		left=getInner().width+getScroll().left-_this.offsetWidth;
            	}
            	if(top<0){
            		top=0;
            	}else if(top<=getScroll().top){
                    top=getScroll().top;
                }else if(top>getInner().height+getScroll().top-_this.offsetHeight){
            		top=getInner().height+getScroll().top-_this.offsetHeight;
            	}
            	_this.style.left=left+'px';
            	_this.style.top=top+'px';

            	if(typeof _this.setCapture!='undefined'){  //IE的移动捕获
            	_this.setCapture();
            }
           }
           function up(e){
           	//this.onmousemove=null;
            	removeEvent(document,'mousemove',move);
            //this.onmouseup=null;
                removeEvent(document,'mouseup',up);
            	if(typeof _this.releaseCapture!='undefined'){
            		_this.releaseCapture();
            	}
           }
		});
	}
	return this;
});
