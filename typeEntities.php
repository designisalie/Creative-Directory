<?php
	include 'connect.php';
	
	$type = $_POST['type'];
	$cookie = $_POST['cookie'];
	$ip = $_SERVER['REMOTE_ADDR'];
	if($type == '' || $type == 'hott'){
		$query = mysql_query('SELECT * FROM entities ORDER BY rank DESC LIMIT 10'); //sort by rank
	}elseif($type == 'new'){
		$query = mysql_query("SELECT * FROM entities ORDER BY id DESC LIMIT 10");
	}else{
		$query = mysql_query("SELECT * FROM entities WHERE type='$type' ORDER BY rank DESC LIMIT 10");
	}
	
	while ($fetch = mysql_fetch_assoc($query))
	{
		$entity = $fetch['id'];
		$cQuery = mysql_query("SELECT * FROM comment WHERE entity='$entity'");
		$quantity = mysql_num_rows($cQuery);
		
		echo "<div class='entity " . $fetch['id'] . "' id='" . $fetch['id'] . "'>\n";
		if($fetch['image'] != ''){
			echo "	<div class='img'>\n";
			echo "		<img src='" . $fetch['image'] . "'/>\n";
			echo "	</div>\n";
		}else{
			echo "	<div class='empty'></div>\n";
		}
		echo "	<div class='info ov" . $fetch['id']. "'>\n";
		echo "		<div class='txt' >\n";
		echo "			<span onclick='openFolio(this)' class='title' name='" . $fetch['folio'] . "'>" . $fetch['title'] . "</span> <em>(open)</em>\n";
		echo "			<p class='typeTag'> type: " . $fetch['type'] . "</p>\n";
		echo "			<p class='mainTxt'>" . $fetch['txt'] . "</p>\n";
		echo "		</div>\n";
		if($ip == $fetch['ip'] && $cookie == $fetch['folio']){
			echo "			<a class='remove' name='" . $fetch['id'] . "' onclick='Remove(this)'>delete.</a>\n";
		}
		echo "		<span class='rank id" . $fetch['id'] . "' id='rank" . $fetch['id'] . "'>" . $fetch['rank'] . "</span>\n";
		echo "		<span class='quick' onclick='quickView(this)' name='" . $fetch['folio'] . "' title='Quick View.'>quick</span>\n";
		echo "		<a class='commentIcon' name='" . $fetch['id'] . "' onclick='viewComments(this)'><span class='cAmount'>" . $quantity . "</span> comments.</a>\n";
		echo "	</div>\n";
		echo "</div>\n";
	}
	
	if($type == 'new' || $type == '' || $type == 'hott'){
		$check = mysql_query("SELECT * FROM entities LIMIT 10,1");
	}else{
		$check = mysql_query("SELECT * FROM entities WHERE type='$type' LIMIT 10,1");
	}
	$quantity = mysql_num_rows($check);
	if($quantity != 0){
		echo "<button onclick='Insert(this)' class='more' name='10'>more.</button>";
	}
	
	// Update last active time
	mysql_query("UPDATE visits SET lastactive = " . time() . " WHERE ipaddress = '$ip' LIMIT 1");
	
	mysql_close($connection);
?>