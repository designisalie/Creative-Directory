<?php
	include 'connect.php';
		
	$remove = $_POST['remove'];
	
	$query = mysql_query("DELETE FROM entities WHERE id='$remove'"); //sort by rank
	$quantity = mysql_num_rows($query);

	mysql_close($connection);
?>