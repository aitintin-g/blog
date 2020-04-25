<?php
  //echo 'www.ycku.com';
  //print_r($_POST);
require 'config.php';
$_birthday=$_POST['year'].'-'.$_POST['month'].'-'.$_POST['data'];

$query="insert into form_user(user,pass,ques,answer,email,birthday,ps) values('{$_POST['user']}',sha1('{$_POST['pass']}'),'{$_POST['ques']}','{$_POST['answer']}','{$_POST['email']}','{$_birthday}','{$_POST['ps']}')";
mysql_query($query) or die('新增失败'.mysql_errno());

//sleep(3);

echo mysql_affected_rows();

mysql_close();
?>