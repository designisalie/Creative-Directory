<?php
$title = $_POST['title'];
$image = $_POST['image'];
$txt = $_POST['txt'];
$folio = $_POST['folio'];
$type = $_POST['type'];

$ip = $_SERVER['REMOTE_ADDR'];

include 'connect.php';

$query = "INSERT INTO Entities (title, txt, ip, dated, image, folio, type) VALUES ('$title', '$txt', '$ip', UNIX_TIMESTAMP(), '$image', '$folio', '$type')";

$result = mysql_query($query);
if($result != 1){
	echo $result;
}

mysql_close($connection);
?>