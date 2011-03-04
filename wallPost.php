<?php
	$name =  $_POST['name'];
	$text =  $_POST['text'];
	
	include 'connect.php';

	$query = mysql_query("INSERT INTO wall (time,name,text) VALUES (NOW(),'$name','$text')");

	$newQuery = mysql_query("SELECT * FROM wall ORDER BY id DESC LIMIT 1");

	 while ($fetch = mysql_fetch_assoc($newQuery)) {
		if ($fetch['name'] == '') {
			$fetch['name'] = 'anon';
		}
		echo '<li><span class="wallName">' . $fetch['name'] . ' : </span><span class="wallText">' . $fetch['text'] . '</span></li>';
     }
     mysql_close($connection);
?>