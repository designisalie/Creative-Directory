<?php
	include 'connect.php';
		
	$remove = $_POST['remove'];
	
	$query = mysql_query("DELETE FROM comment WHERE id='$remove'");

	mysql_close($connection);
?>