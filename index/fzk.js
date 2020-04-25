/*window.onload=function(){
	$().getClass('member').hover(function(){
       //alert('show');
       $().getClass('member').css('background','url(../img/shang.jpg) no-repeat 50px center');
       $().getClass('member_ul').show();
	},function(){
       //alert('hide');
       $().getClass('member').css('background','url(../img/xia.jpg) no-repeat 50px center');
       $().getClass('member_ul').hide();
	});
	//登录框
	$().getId('login').center(350,250).resize(function(){
        if($().getId('login').css('display')=='block'){
        	 $().getId('screen').lock();
        }
	});
	$().getClass('login').click(function(){
		$().getId('login').show();
		$().getId('screen').lock();
		$().getId('login').center(350,250);
	});
	$().getClass('close').click(function(){
		$().getId('login').hide();
		$().getId('screen').unlock();
	});
	//拖拽
    $().getId('login').drag([$().getTagName('h2').getElement(0),$().getTagName('span').getElement(0)]);
    //alert($().getTagName('h2').getElement(0));*/

   /*var top=(document.documentElement.clientHeight-250)/2;
   var left=(document.documentElement.clientWidth-350)/2;
      $().getId('login').css('top',top+'px').css('left',left+'px');

      window.onresize=function(){
      var top=(document.documentElement.clientHeight-250)/2;
   var left=(document.documentElement.clientWidth-350)/2;
      $().getId('login').css('top',top+'px').css('left',left+'px');
	
  };*/
//};

/*window.onload=function(){
  alert(document.body);
  var a=function(){};
  alert(typeof a);
  $(function(){
  alert(document.body);
  }); 
};*/
$(function(){
  //个人中心
  $('.member').hover(function(){
       //alert('show');
       $(this).css('background','url(../img/shang.jpg) no-repeat 50px center');
       $('.member_ul').show().animate({
        time:30,
        step:10,
        mul:{
          o:100,
          h:110
        }
       });
  },function(){
       //alert('hide');
       $(this).css('background','url(../img/xia.jpg) no-repeat 50px center');
       $('.member_ul').animate({
       
        time:30,
        step:10,
        mul:{
          o:0,
          h:0
        },
         fn:function(){
          $('.member_ul').hide();
        }
       });
  });
//登录框
  $('#login').center(350,250).resize(function(){
        if($('#login').css('display')=='block'){
           $('#screen').lock();
        }
  });
  $('#heard .login').click(function(){
    $('#login').show();
    $('#screen').lock().animate({
      attr:'o',
      target:30,
      time:30,
      step:10
    });
    $('#login').center(350,250);
  });
  $('#login .close').click(function(){
    $('#login').hide();
    $('#screen').animate({
      attr:'o',
      target:0,
      time:30,
      step:10,
      fn:function(){
        $('#screen').unlock();  
      }
    });
  });

  //注册框
  $('#reg').center(600,550).resize(function(){
        if($('#reg').css('display')=='block'){
           $('#screen').lock();
        }
  });
  $('#heard .reg').click(function(){
    $('#reg').show();
    $('#screen').lock().animate({
      attr:'o',
      target:30,
      time:30,
      step:10
    });
    $('#reg').center(600,550);
  });
  $('#reg .close').click(function(){
    $('#reg').hide();
    $('#screen').animate({
      attr:'o',
      target:0,
      time:30,
      step:10,
      fn:function(){
        $('#screen').unlock();  
      }
    });
  });

//test
/*$('#test').click(function(){
 $(this).animate({
  time:30,
  step:10,
  //mul参数是一个对象，只有两种值：属性：目标值
  mul:{
    w:101,      //长变为300
    h:300,     //高变为300
    o:30
  },
  fn:function(){
    alert(123);
  }
 });
});*/

  //拖拽
   $('#login').drag($('#login h2').getElement(0),$('#login span').getElement(0));
   $('#reg').drag($('#reg h2').getElement(0));
  //百度分享初始化位置
   $('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
   
  //滚动条触发事件
   /* addEvent(window,'scroll',function(){
    $('#share').animate({
      attr:'y',
      target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
    });
  });*/
  $(window).bind('scroll',function(){
    setTimeout(function(){
      $('#share').animate({
      attr:'y',
      target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
    });
    },100);
  });

  //百度分享收缩位置
  $('#share').hover(function(){
    $(this).animate({
      attr:'x',
      target:0
    });
  },function(){
    $(this).animate({
      attr:'x',
      target:-211
    });
  });

  //滑动导航
  $('#nav .about li').hover(function(){
    var target=$(this).first().offsetLeft;
    $('#nav .nav_bg').animate({
      attr:'x',
      target:target+20,
      time:30,
      step:10,
      fn:function(){
        $('#nav .white').animate({
          attr:'x',
          target:-target
        });
      }
    });
  },function(){
    $('#nav .nav_bg').animate({
      attr:'x',
      target:20,
      time:30,
      step:10,
       fn:function(){
        $('#nav .white').animate({
          attr:'x',
          target:0
        });
      }
    });
  });

  //左侧菜单
  $('#sidebar h2').toggle(function(){
    //$('#sidebar ul').eq(0).hide();
    $(this).next().animate({
      mul:{
        h:0,
        o:0
      }
    });
  },function(){
    $(this).next().animate({
     mul:{
      h:150,
      o:100
     }
    });
    //$('#sidebar ul').eq(0).show();
  });

  //表单验证

  //表单初始化
  $('form').eq(0).first().reset();

  //$('form').eq(0).form('user').value('bbb');
  //alert($('#reg .info_user').first());
  $('form').eq(0).form('user').bind('focus',function(){
      $('#reg .info_user').show();
      $('#reg .error_user').hide();
      $('#reg .succ_user').hide();
  }).bind('blur',function(){
    if(trim($(this).value())==''){
      $('#reg .info_user').hide();
      $('#reg .error_user').hide();
      $('#reg .succ_user').hide();
    }else if(!check_user()){
      $('#reg .info_user').hide();
      $('#reg .error_user').show();
      $('#reg .succ_user').hide();
    }else{
      $('#reg .info_user').hide();
      $('#reg .error_user').hide();
      $('#reg .succ_user').show();
    }
  });

  function check_user(){
    var flag=true;
    if(!/^[\w]{2,20}$/.test(trim($('form').eq(0).form('user').value()))) {
      $('#reg .error_user').html('输入不合法，请重新输入！');
      return false;
    } else{
      $('#reg .info_user').hide();
      $('#reg .loading').show();
      ajax({
    method : 'post',
    url : 'is_user.php',
    data : $('form').eq(0).serialize(),
    success : function (text) {
    if(text==1){
      $('#reg .error_user').html('用户名被占用!');
      flag=false;
    } else{
      flag=true;
    }
    $('#reg .loading').hide();
    },
    async : false
});
      }
      return flag;
  }

  //密码验证
  $('form').eq(0).form('pass').bind('focus',function(){
    $('#reg .info_pass').show();
      $('#reg .error_pass').hide();
      $('#reg .succ_pass').hide();
  }).bind('blur',function(){
    if(trim($(this).value())==''){
      $('#reg .info_pass').hide();
    }else{
    if(check_pass()){
      $('#reg .info_pass').hide();
      $('#reg .error_pass').hide();
      $('#reg .succ_pass').show();
    }else{
      $('#reg .info_pass').hide();
      $('#reg .error_pass').show();
      $('#reg .succ_pass').hide();
         }
     }    
    });

  //密码强度验证
  $('form').eq(0).form('pass').bind('keyup',function(){
     check_pass();
   });

  //密码验证函数
  function check_pass(){
    var value=trim($('form').eq(0).form('pass').value());
    var value_length=value.length;
    var code_length=0;

    //第一个必须条件的验证6-20位之间
    if(value_length>=6&&value_length<=20){
      $('#reg .info_pass .q1').html('●').css('color','green');
    }else{
      $('#reg .info_pass .q1').html('○').css('color','#666');
    }
  //第二个必须条件的验证，字母或数字或非空字符，任意一个即可
    if(value_length>0&&!/\s/.test(value)){
      $('#reg .info_pass .q2').html('●').css('color','green');
    }else{
      $('#reg .info_pass .q2').html('○').css('color','#666');
    }

  //第三个必须条件的验证，任意两种
  if(/[\d]/.test(value)){
    code_length++;
  }
  if(/[a-z]/.test(value)){
    code_length++;
  }
  if(/[A-Z]/.test(value)){
    code_length++;
  }
  if(/[^\w]/.test(value)){
    code_length++;
  }
  if(code_length>=2){
      $('#reg .info_pass .q3').html('●').css('color','green');
    }else{
      $('#reg .info_pass .q3').html('○').css('color','#666');
    }

  //安全级别
  if(value_length>=10&&code_length>=3){
    $('#reg .info_pass .s1').css('color','green');
    $('#reg .info_pass .s2').css('color','green');
    $('#reg .info_pass .s3').css('color','green');
    $('#reg .info_pass .s4').html('高').css('color','green');
  }else if(value_length>=8&&code_length>=2){
    $('#reg .info_pass .s1').css('color','#f60');
    $('#reg .info_pass .s2').css('color','#f60');
    $('#reg .info_pass .s3').css('color','#ccc');
     $('#reg .info_pass .s4').html('中').css('color','#f60');
  }else if(value_length>=1){
    $('#reg .info_pass .s1').css('color','maroon');
    $('#reg .info_pass .s2').css('color','#ccc');
    $('#reg .info_pass .s3').css('color','#ccc');
     $('#reg .info_pass .s4').html('低').css('color','maroon');
  }else{
    $('#reg .info_pass .s1').css('color','#ccc');
    $('#reg .info_pass .s2').css('color','#ccc');
    $('#reg .info_pass .s3').css('color','#ccc');
     $('#reg .info_pass .s4').html('');
  }
  if(value_length>=6&&value_length<=20&&code_length>=2&&!/\s/.test(value)) {
    return true;
  }else{
    return false;
     }
  }

  //密码确认
   $('form').eq(0).form('notpass').bind('focus',function(){
    $('#reg .info_notpass').show();
      $('#reg .error_notpass').hide();
      $('#reg .succ_notpass').hide();
  }).bind('blur',function(){
    if(trim($(this).value())==''){
      $('#reg .info_notpass').hide();
    }else if(check_notpass()){
      $('#reg .info_notpass').hide();
      $('#reg .error_notpass').hide();
      $('#reg .succ_notpass').show();
    }else{
      $('#reg .info_notpass').hide();
      $('#reg .error_notpass').show();
      $('#reg .succ_notpass').hide();
         }    
    });

  function check_notpass(){
    if(trim($('form').eq(0).form('notpass').value())==trim($('form').eq(0).form('pass').value())) return true;
  }

  //提问
  $('form').eq(0).form('ques').bind('change',function(){
    if(check_ques) $('#reg .error_ques').hide();
  });

  function check_ques(){
    if($('form').eq(0).form('ques').value()!=0) return true;
  }

  //回答
   $('form').eq(0).form('answer').bind('focus',function(){
    $('#reg .info_ans').show();
      $('#reg .error_ans').hide();
      $('#reg .succ_ans').hide();
  }).bind('blur',function(){
    if(trim($(this).value())==''){
      $('#reg .info_ans').hide();
    }else if(check_ans()){
      $('#reg .info_ans').hide();
      $('#reg .error_ans').hide();
      $('#reg .succ_ans').show();
    }else{
      $('#reg .info_ans').hide();
      $('#reg .error_ans').show();
      $('#reg .succ_ans').hide();
         }    
    });

  function check_ans(){
    if(trim($('form').eq(0).form('answer').value()).length>=2&&trim($('form').eq(0).form('answer').value()).length<=32) return true;
  }

  //电子邮件
   $('form').eq(0).form('email').bind('focus',function(){
    //补全界面
    //if下判断语句是一句可以不写花括号
    if($(this).value().indexOf('@')==-1) 
    $('#reg .all_email').show();
    $('#reg .info_email').show();
      $('#reg .error_email').hide();
      $('#reg .succ_email').hide();
  }).bind('blur',function(){
    $('#reg .all_email').hide();

    if(trim($(this).value())==''){
      $('#reg .info_email').hide();
    }else if(check_email()){
      $('#reg .info_email').hide();
      $('#reg .error_email').hide();
      $('#reg .succ_email').show();
    }else{
      $('#reg .info_email').hide();
      $('#reg .error_email').show();
      $('#reg .succ_email').hide();
         }    
    });

  function check_email(){
    if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value()))) return true;
  }

  //电子系统补全系统键入
  $('form').eq(0).form('email').bind('keyup',function(event){
    if($(this).value().indexOf('@')==-1){
      $('#reg .all_email').show();
      $('#reg .all_email li span').html($(this).value());
    }else{
      $('#reg .all_email').hide();
    }
    
    $('#reg .all_email li').css('background','none');
    $('#reg .all_email li').css('color','#666');
    if(event.keyCode==40){
      if(this.index==undefined||this.index>=$('#reg .all_email li').length()-1){
        this.index=0;
      }else{
        this.index++;
      }
      $('#reg .all_email li').eq(this.index).css('background','#e5edf2');
      $('#reg .all_email li').eq(this.index).css('color','#369');
    }
    if(event.keyCode==38){
      if(this.index==undefined||this.index<=0){
        this.index=$('#reg .all_email li').length()-1;
      }else{
        this.index--;
      }
      $('#reg .all_email li').eq(this.index).css('background','#e5edf2');
      $('#reg .all_email li').eq(this.index).css('color','#369');
    }
    if(event.keyCode==13){
       $(this).value($('#reg .all_email li').eq(this.index).text());
       $('#reg .all_email').hide();
       this.index=undefined;
    }

  });

  //电子系统邮件补全系统点击获取
  //$('#reg .all_email li').click(function(){
    //alert('')
  //})
  $('#reg .all_email li').bind('mousedown',function(){
    $('form').eq(0).form('email').value($(this).text());
  })
  //PS：click事件是弹起后触发的，而blur失去焦点后，界面便隐藏了，没有点击弹起的元素了，导致无法触发

  //电子邮件补全系统鼠标移入移出效果
  $('#reg .all_email').hover(function(){
    $(this).css('background','#e5edf2');
    $(this).css('color','#369');
  },function(){
    $(this).css('background','#fff');
    $(this).css('color','#666');
  });

  //年月日
  var year=$('form').eq(0).form('year');
  var month=$('form').eq(0).form('month');
  var day=$('form').eq(0).form('data');
  var day30=[4,6,9,11];
  var day31=[1,3,5,7,8,10,12];

  //注入年
  for(var i=1950;i<=2013;i++){
    year.first().add(new Option(i,i),undefined);
  }

  //注入月
  for(var i=1;i<=12;i++){
    month.first().add(new Option(i,i),undefined);
  }

  year.bind('change',select_day);

  month.bind('change',select_day);

  day.bind('change',function(){
    if(check_birthday()) $('#reg .error_birthday').hide();
  })

  function check_birthday(){
    if(year.value()!=0&&month.value()!=0&&day.value()!=0) return true;
  }

  function select_day(){
    if(year.value()!=0&&month.value()!=0){
      //清理之前的注入
      day.first().options.length=1;
      //不确定的日
      var cur_day=0;
      //注入日
      if(inArray(day31,parseInt(month.value()))){
        cur_day=31;
      }else if(inArray(day30,parseInt(month.value()))){
        cur_day=30;
       }else{
        if(parseInt(year.value())%4==0&&parseInt(year.value())%100!=0||parseInt(year.value())%400==0){
          cur_day=29;
        }else{
          cur_day=28;
        }
       }
       for(var i=1;i<=cur_day;i++){
            day.first().add(new Option(i,i),undefined);
       } 
    }else{
      day.first().options.length=1;
    }
  }

  //备注
  $('form').eq(0).form('ps').bind('keyup',check_ps).bind('paste',function(){
    //粘贴事件会在内容粘贴到文本框之前触发
    setTimeout(check_ps,50);    //延迟50ms触发
  });

  //清尾
  $('#reg .ps .clear').click(function(){
    $('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0,5));
    check_ps();
  });

  function check_ps(){
    var num=5-$('form').eq(0).form('ps').value().length;
    if(num>=0){
      $('#reg .ps').eq(0).show();
      $('#reg .ps .num').eq(0).html(num);
      $('#reg .ps').eq(1).hide();
      return true;
    }else{
      $('#reg .ps').eq(0).hide();
      $('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');
      $('#reg .ps').eq(1).show();
      return false;
    }
  }

  //提交
  $('form').eq(0).form('sub').click(function(){
    var flag=true;

    if(!check_user()){
      $('#reg .error_user').show();
      flag=false;
    }

    if(!check_pass()){
      $('#reg .error_pass').show();
      flag=false;
    }

    if(!check_notpass()){
      $('#reg .error_notpass').show();
      flag=false;
    }

     if(!check_ques()){
      $('#reg .error_ques').show();
      flag=false;
    }

    if(!check_ans()){
      $('#reg .error_ans').show();
      flag=false;
    }

     if(!check_email()){
      $('#reg .error_email').show();
      flag=false;
    }

     if(!check_birthday()){
      $('#reg .error_birthday').show();
      flag=false;
    }

    if(!check_ps()){
      flag=false;
    }

    if(flag){
      var _this=this;
      $('#loading').show().center(200,40);
      $('#loading p').html('正在提交注册中...');
      _this.disabled=true;
      $(_this).css('backgroundPosition','right');
      //$('form').eq(0).first().submit(); 必须全填写才提交，ajax不同
      ajax({
    method : 'post',
    url : 'demo.php',
    data : $('form').eq(0).serialize(),
    success : function (text) {
    if(text==1){
      //alert('成功注册！');
      $('#loading').hide();
      $('#success').show().center(200,40);
       $('#success p').html('注册成功，请登录...');
       setTimeout(function(){
        $('#success').hide();
        $('#reg').hide();
        $('form').eq(0).first().reset();
        _this.disabled=false;
        $(_this).css('backgroundPosition','left');
        $('#screen').animate({
      attr:'o',
      target:0,
      time:30,
      step:10,
      fn:function(){
        $('#screen').unlock();  
      }
    });
       },1500);
    }
    },
    async : true
});
    }

  });

  /*function serialize(form){
    var parts={};
    for(var i=0;i<form.elements.length;i++){
      var filed=form.elements[i];
      switch(filed.type){
        case undefined:
        case 'submit':
        case 'reset':
        case 'file':
        case 'button':
          break;
        case 'radio':
        case 'checkbox':
          if(!filed.selected) break;
        case 'select-one':
        case 'select-multiple':
          for(var j=0;j<filed.options.length;j++){
            var option=filed.options[j];
            if(option.selected){
              var optValue='';
              if(option.hasAttribute){
                optValue=(option.hasAttribute('value')?option.value:option.text);
              } else{
                optValue=(option.attributes('value').specified?option.value:option.text);
              }
              parts[filed.name]=optValue;
            }
          }
          break;
        default:
          parts[filed.name]=filed.value;
      }
    }
    return parts;
  }*/

$('form').eq(1).form('submit').click(function(){   
  var _this=this;
  if(/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value()))&&$('form').eq(1).form('pass').value().length>=6){
    $('#loading').show().center(200,40);
    $('#loading p').html('正在尝试登录');
    _this.disabled=true;
    $(_this).css('backgroundPosition','right');
    ajax({
    method : 'post',
    url : 'is_login.php',
    data : $('form').eq(1).serialize(),
    success : function (text) {
      $('#loading').hide();
      if(text==1){
        $('#logo .info').html('登录失败，用户名或密码不正确!');
      }else{
        $('#logo .info').html('');
        $('#success').show().center(200,40);
        $('#success p').html('登录成功，请稍后...');
        setCookie('user',trim($('form').eq(1).form('user').value()));
        setTimeout(function(){
        $('#success').hide();
        $('#login').hide();
        $('form').eq(1).first().reset();
        //_this.disabled=false;
       // $(_this).css('backgroundPosition','left');
        $('#screen').animate({
      attr:'o',
      target:0,
      time:30,
      step:10,
      fn:function(){
        $('#screen').unlock();  
      }
    });
        $('#header .reg').hide();
      $('#header .login').hide();
      $('#header .info').show().html(getCookie('user')+',您好!');
       },1500);
      }
       _this.disabled=false;
      $(_this).css('backgroundPosition','left');

    },
    async : true
});
  }else{
    $('#logo .info').html('登录失败，用户名或密码不合法!');
  }
});

  //轮播器初始化   轮播器透明度变化和手动是IF判断存在问题
  //$('#banner img').hide();
  //$('#banner img').eq(0).show();
  $('#banner img').opacity(0);
  $('#banner img').eq(0).opacity(100);
  $('#banner ul li').eq(0).css('color','#333')
  $('#banner strong').html($('#banner img').eq(0).attr('alt'));

  //轮播器计数器
  var banner_index=1;

  //轮播器的种类
  var banner_type=1;         //1表示透明度，2表示上下滚动

  //自动轮播器
  var banner_timer=setInterval(banner_fn,1000);

  //手动轮播器
  $('#banner ul li').hover(function(){
   clearInterval(banner_timer);
   //alert($(this).css('color'));
   if($(this).css('color')!='rgb(51,51,51)'&&$(this).css('color')!='#333'){
   banner(this,banner_index==0?$('#banner ul li').length()-1:banner_index-1);
 }
  },function(){
    banner_index=$(this).index()+1;
    banner_timer=setInterval(banner_fn,1000);
  });

  function banner(obj,prev){
    //$('#banner img').hide();
    //$('#banner img').eq($(obj).index()).show();
    $('#banner ul li').css('color','#999');
    $(obj).css('color','#333');
    $('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
  if(banner_type==1){  
    $('#banner img').eq(prev).animate({
      attr:'o',
      target:0,
      time:30,
      step:10
    }).css('zIndex',1);
    $('#banner img').eq($(obj).index()).animate({
      attr:'o',
      target:100,
      time:30,
      step:10
    }).css('zIndex',2);
  }else if(banner_type==2){
  $('#banner img').eq(prev).animate({
      attr:'y',
      target:150,
      time:30,
      step:10
    }).css('zIndex',1).opacity(100);
    $('#banner img').eq($(obj).index()).animate({
      attr:'y',
      target:0,
      time:30,
      step:10
    }).css('top','-150px').css('zIndex',2).opacity(100);
  }    
}

  function banner_fn(){
    if(banner_index>=$('#banner ul li').length()) banner_index=0;
    banner($('#banner ul li').eq(banner_index).first(),banner_index==0?$('#banner ul li').length()-1:banner_index-1);
    banner_index++;
  }

  //问题1：当图品进入可见区域的时候，将图片的src替换成xsrc
  //alert($('.wait_load').eq(0).attr('xsrc'));
  //$('.wait_load').eq(0).attr('src',$('.wait_load').eq(0).attr('xsrc'));

  //问题2：获取图片元素到最外层顶点元素的距离
  //alert(offsetTop($('.wait_load').first()));

  //问题3：获取屏幕可视区域的最低点位置
  //alert(getInner().height+getScroll().top);

  var wait_load=$('.wait_load');
  wait_load.opacity(0);
  $(window).bind('scroll',_wait_load);
  $(window).bind('resize',_wait_load);

  function _wait_load(){
    setTimeout(function(){
      for(var i=0;i<wait_load.length();i++){
        var _this=wait_load.getElement(i)   //与李不同
        if(getInner().height+getScroll().top>=offsetTop(_this)){
        $(_this).attr('src',$(_this).attr('xsrc')).animate({
          attr:'o',
          target:100,
          time:30,
          step:10
        });
      }
        }
      },100);
  }

  //图片弹窗
  $('#photo_big').center(620,511).resize(function(){
        if($('#photo_big').css('display')=='block'){
           $('#screen').lock();
        }
  });
  $('#photo dl dt img').click(function(){
    $('#photo_big').show();
    $('#screen').lock().animate({
      attr:'o',
      target:30,
      time:30,
      step:10
    });
    $('#photo_big').center(620,511);
    var temp_img=new Image();    //创建一个临时区域的图片对象
   //temp_img.src='http://2t.5068.com/uploads/allimg/151113/48-151113143416.jpg';
   $(temp_img).bind('load',function(){
    $('#photo_big .big img').attr('src',temp_img.src).animate({
    attr:'o',
    target:100,
    time:30,
    step:10
   }).css('width','600px').css('height','450px').css('top',0).opacity(0);
   });
   //IE必须放在load之后才有效
   temp_img.src=$(this).attr('bigsrc');
   var children=this.parentNode.parentNode;

   prev_next_img(children);

  });
  $('#photo_big .close').click(function(){
    $('#photo_big').hide();
    $('#screen').animate({
      attr:'o',
      target:0,
      time:30,
      step:10,
      fn:function(){
        $('#screen').unlock();  
      }
    });
    $('#photo_big .big img').attr('src','../img/yj0.gif').css('width','120px').css('height','120px').css('top','160px');
  });

  //弹窗拖拽
   $('#photo_big').drag($('#photo_big h2').getElement(0));

   //图片加载
   /*$('#photo_big .big img').attr('src','http://2t.5068.com/uploads/allimg/151113/48-151113143416.jpg').animate({
    attr:'o',
    target:100,
    time:30,
    step:10
   }).css('width','600px').css('height','450').css('top',0).opacity(0);*/

   //问题1：gif的样式被大图的高和宽改变了
   //问题2：动画的渐变效果没有出现

   //创建一个临时的图片对象用以保存图片
   /*var temp_img=new Image();    //创建一个临时区域的图片对象
   //temp_img.src='http://2t.5068.com/uploads/allimg/151113/48-151113143416.jpg';
   $(temp_img).bind('load',function(){
    $('#photo_big .big img').attr('src',temp_img.src).animate({
    attr:'o',
    target:100,
    time:30,
    step:10
   }).css('width','600px').css('height','450').css('top',0).opacity(0);
   });
   //IE必须放在load之后才有效
   temp_img.src='http://2t.5068.com/uploads/allimg/151113/48-151113143416.jpg';*/

   //图片鼠标划过
$('#photo_big .big .left').hover(function(){
  $('#photo_big .big .sl').animate({
    attr:'o',
    target:50,
    time:30,
    step:10,
  });
},function(){
  $('#photo_big .big .sl').animate({
    attr:'o',
    target:0,
    time:30,
    step:10,
  });
});

$('#photo_big .big .right').hover(function(){
  $('#photo_big .big .sr').animate({
    attr:'o',
    target:50,
    time:30,
    step:10,
  });
},function(){
  $('#photo_big .big .sr').animate({
    attr:'o',
    target:0,
    time:30,
    step:10,
  });
});

//图片上一张
$('#photo_big .big .left').click(function(){

  $('#photo_big .big img').attr('src','../img/yj0.gif').css('width','120px').css('height','120px').css('top','160px');

  var current_img=new Image();
   $(current_img).bind('load',function(){
    $('#photo_big .big img').attr('src',current_img.src).animate({
    attr:'o',
    target:100,
    time:30,
    step:10
  }).opacity(0).css('width','600px').css('height','450px').css('top',0);
   });
 
  

  current_img.src=$(this).attr('src');

  //alert($('#photo_big .big img').attr('index'));
  //alert($('#photo dl dt img').getElement($('#photo_big .big img').attr('index')));
    var children=$('#photo dl dt img').getElement(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
    //alert(children);
    prev_next_img(children);
});

//图片下一张
$('#photo_big .big .right').click(function(){

$('#photo_big .big img').attr('src','../img/yj0.gif').css('width','120px').css('height','120px').css('top','160px');
  var current_img=new Image();
   $(current_img).bind('load',function(){
    $('#photo_big .big img').attr('src',current_img.src).animate({
    attr:'o',
    target:100,
    time:30,
    step:10
  }).opacity(0).css('width','600px').css('height','450px').css('top',0);
   });
 
  

  current_img.src=$(this).attr('src');
  var children=$('#photo dl dt img').getElement(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
  prev_next_img(children);
});

  function prev_next_img(children){
   var prev=prevIndex($(children).index(),children.parentNode);
   var next=nextIndex($(children).index(),children.parentNode);

   var prev_img=new Image();
   var next_img=new Image();

   prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
   next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');
   $('#photo_big .big .left').attr('src',prev_img.src);
   $('#photo_big .big .right').attr('src',next_img.src);
   $('#photo_big .big img').attr('index',$(children).index());
   $('#photo_big .big .index').html(parseInt($(children).index())+1+'/'+$('#photo dl dt img').length());
  }

  //调用ajax
  $(document).click(function(){
    
  });

  //发文
  $('#blog').center(580,320).resize(function(){
        if($('#blog').css('display')=='block'){
           $('#screen').lock();
        }
  });
  $('#share li').eq(0).click(function(){   //每点击一下页面就刷新了，无法实现预期效果
    $('#blog').center(580,320).show();
    $('#screen').lock().animate({
      attr:'o',
      target:30,
      time:30,
      step:10
    });
  });
  $('#blog .close').click(function(){
    $('#blog').hide();
    $('#screen').animate({
      attr:'o',
      target:0,
      time:30,
      step:10,
      fn:function(){
        $('#screen').unlock();  
      }
    });
  });

  //拖拽
   $('#blog').drag($('#blog h2').getElement(0));

   $('form').eq(2).form('sub').click(function(){
    if(trim($('form').eq(2).form('title').value()).length<=0||trim($('form').eq(2).form('content').value()).length<=0){
      $('#blog .info').html('发表失败：标题和内容不得为空！');
    }else{
      var _this=this;
      $('#loading').show().center(200,40);
    $('#loading p').html('正在发表博文...');
    _this.disabled=true;
    $(_this).css('backgroundPosition','right');
    ajax({
    method : 'post',
    url : 'add_blog.php',
    data : $('form').eq(2).serialize(),
    success : function (text) {
     
      if(text==1){
        $('#loading').hide();
        $('#blog .info').html('');
        $('#success').show().center(200,40);
        $('#success p').html('发表成功，请稍后...');
       
        setTimeout(function(){
        $('#success').hide();
        $('#blog').hide();
        $('form').eq(2).first().reset();
        //_this.disabled=false;
       // $(_this).css('backgroundPosition','left');
        $('#screen').animate({
      attr:'o',
      target:0,
      time:30,
      step:10,
      fn:function(){
        $('#screen').unlock();
        $('#index').html('<span class="loading"><span>');
$('#index .loading').show();
ajax({
    method : 'post',
    url : 'get_blog.php',
    data : {},
    success : function (text) {
     //alert(text);
     var json=JSON.parse(text);
     //alert(json[0].title);
     var html='';
     for(var i=0;i<json.length;i++){
      html+='<div class="content"><h2><em>'+json[i].date+'</em>'+json[i].title+'</h2><p>'+json[i].content+'</p></div>';
     }
     $('#index').html(html);
      for(var i=0;i<json.length;i++){
      $('#index .content').eq(i).animate({
        attr:'o',
        target:100,
        time:30,
        step:10
       });
      }
    
    },
    async : true
});  
      }
    });
        
       },1500);
      }
       _this.disabled=false;
      $(_this).css('backgroundPosition','left');

    },
    async : true
});
    }
   });

//取出博文
$('#index').html('<span class="loading"><span>');
$('#index .loading').show();
ajax({
    method : 'post',
    url : 'get_blog.php',
    data : {},
    success : function (text) {
     //alert(text);
     var json=JSON.parse(text);
     //alert(json[0].title);
     var html='';
     for(var i=0;i<json.length;i++){
      html+='<div class="content"><h2><em>'+json[i].date+'</em>'+json[i].title+'</h2><p>'+json[i].content+'</p></div>';
     }
     $('#index').html(html);
      for(var i=0;i<json.length;i++){
      $('#index .content').eq(i).animate({
        attr:'o',
        target:100,
        time:30,
        step:10
       });
      }
    
    },
    async : true
});

//更换皮肤
  $('#skin').center(650,360).resize(function(){
        if($('#kin').css('display')=='block'){
           $('#screen').lock();
        }
  });
  $('#share li').eq(1).click(function(){   //每点击一下页面就刷新了，无法实现预期效果
    $('#skin').center(650,360).show();
    $('#screen').lock().animate({
      attr:'o',
      target:30,
      time:30,
      step:10
    });
    $('#skin .skin_bg').html('<span class="loading"></span>');
    ajax({
    method : 'post',
    url : 'get_skin.php',
    data : {
      'type':'all'
    },
    success : function (text) {
    var json=JSON.parse(text);
    var html='';
    for(var i=0;i<json.length;i++){
      html+='<dl><dt><img src="../img/'+json[i].small_bg+'"big_bg="'+json[i].big_bg+'"bg_color="'+json[i].bg_color+'"></dt><dd>'+json[i].bg_text+'</dd></dl>';
    }
     //alert(text);
     $('#skin .skin_bg').html(html).opacity(0).animate({
      attr:'o',
      target:100,
      time:30,
      step:10
     });

     $('#skin dl dt img').click(function(){
      //alert($(this).attr('big_bg'));
      //$('body').css('background','url(../img/'+$(this).attr('big_bg')+')repeat-x');
      $('body').css('background',$(this).attr('bg_color')+' '+'url(../img/'+$(this).attr('big_bg')+') repeat-x');
      ajax({
      method : 'post',
      url : 'get_skin.php',
      data : {
        'type':'set',
        'big_bg':$(this).attr('big_bg')
      },
      success : function (text) {
        //alert(text);
        $('#success').show().center(200,40);
        $('#success p').html('皮肤更换成功...');
        setTimeout(function(){
          $('#success').hide();
        },1500);
      },
      async : true
});  

     });
      
    },
    async : true
});  
  });
  $('#skin .close').click(function(){
    $('#skin').hide();
    $('#screen').animate({
      attr:'o',
      target:0,
      time:30,
      step:10,
      fn:function(){
        $('#screen').unlock();  
      }
    });
  });

  //拖拽
   $('#skin').drag($('#skin h2').getElement(0));

   //默认显示背景
    ajax({
    method : 'post',
    url : 'get_skin.php',
    data : {
      'type':'main'
    },
    success : function (text) {
      var json=JSON.parse(text);
      $('body').css('background',json.bg_color+' '+'url(../img/'+json.big_bg+') repeat-x');
    },
    async : true
});  


   


    });

