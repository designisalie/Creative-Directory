<?php
$name = $_POST['name'];
$comment = $_POST['comment'];
$entity = $_POST['entity'];

$ip = $_SERVER['REMOTE_ADDR'];

include 'connect.php';

$query = "INSERT INTO comment (name, comment, ip, date, entity) VALUES ('$name', '$comment', '$ip', UNIX_TIMESTAMP(), '$entity')";

$result = mysql_query($query);
if($result != 1){
	echo $result;
}

$freshQuery = mysql_query("SELECT * FROM comment WHERE entity='$entity' ORDER BY id DESC LIMIT 1");

	while ($fetch = mysql_fetch_assoc($freshQuery))
	{
		echo "<div class='cContainer cNew'>\n";
		echo "	<span class='id'>00.</span> \n";
		echo "	<span class='comment'>" . $fetch['comment'] . "</span>\n";
		echo "	<span class='name'>– " . $fetch['name'] . "</span>,\n";
		echo "	<span class='date'>fresh.</span>\n";
		if($ip == $fetch['ip']){
			echo "	<a class='cRemove' id='" . $fetch['id'] . "' onclick='cRemove(this)'>delete.</a>\n";
		}		
		echo "</div>\n";
	}

mysql_close($connection);
?>