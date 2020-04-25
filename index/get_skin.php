<?php
require 'config.php';

if($_POST['type']=='all'){
$query=mysql_query("select small_bg,big_bg,bg_color,bg_text from blog_skin limit 0,6") or die('SQL错误!');
$json='';
while(!!$row=mysql_fetch_array($query,MYSQL_ASSOC)){
	$json.=json_encode($row).',';
	
}
//sleep(3);
echo '['.substr($json, 0,strlen($json)-1).']';	
}else if($_POST['type']=='main'){
  $query=mysql_query("select small_bg,big_bg,bg_color,bg_text from blog_skin where bg_flag=1") or die('SQL错误!');
  echo json_encode(mysql_fetch_array($query,MYSQL_ASSOC));
}else if($_POST['type']=='set'){
	mysql_query("update blog_skin set bg_flag=0 where bg_flag=1") or die('SQL错误');
	mysql_query("update blog_skin set bg_flag=1 where big_bg='{$_POST['big_bg']}'") or die('SQL错误');
	echo mysql_affected_rows();
}



mysql_close();
?>