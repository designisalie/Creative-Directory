<?php
$id = $_POST['id'];
$vote = $_POST['vote'];

include 'connect.php';

$vote = "UPDATE Entities SET rank = rank $vote WHERE id = $id";
$result = mysql_query($vote);

if($result != 1){echo 'meh';};

$rank = "SELECT * FROM Entities WHERE id = $id";
$query = mysql_query($rank);

while($fetch = mysql_fetch_array($query))
  {
  echo $fetch['rank'];
  }

mysql_close($connection);
?>