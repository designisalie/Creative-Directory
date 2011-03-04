<?php	
	include 'connect.php';
	
	$query = mysql_query('SELECT DISTINCT type FROM entities ORDER BY type ASC');
	
	echo "<span id='load'></span>\n";
	echo "            <span class='page' name='hott'>hott</span>\n";
	echo "            <span class='page' name='new'>new</span>\n";
	
	while ($fetch = mysql_fetch_assoc($query))
	{
		echo "            <span class='page' name='" . $fetch['type'] . "'>" . $fetch['type'] . "</span>\n";
	}

	echo "            <span class='page' onclick='openChat(this)' name='tag' title='post on the wall.'>tag</span>\n";
	echo "            <span class='faq' onclick='Faq()' name='faq'>faq</span>\n";
	echo "            <span class='mix' onclick='Mix()' name='mix'>mix</span>\n";
	echo "            <span class='openMenu' onclick='addForm()' name='add'>add</span>\n";

	mysql_close($connection);
?>