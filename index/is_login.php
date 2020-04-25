<?php
require 'config.php';
$_pass=sha1($_POST['pass']);
$query=mysql_query("select user from form_user where user='{$_POST['user']}'and pass='{$_pass}'") or die('SQL错误!');
if(mysql_fetch_array($query,MYSQL_ASSOC)){
	//sleep(3);
	echo 0;
}else{
	//sleep(3);
	echo 1;
}
mysql_close();
?>