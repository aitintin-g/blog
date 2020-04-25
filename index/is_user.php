<?php
require 'config.php';
$query=mysql_query("select user from form_user where user='{$_POST['user']}'") or die('SQL错误!');
if(mysql_fetch_array($query,MYSQL_ASSOC)){
	//sleep(3);
	echo 1;
}
mysql_close();
?>