<?php
	include 'connect.php';
	
	$ip = $_SERVER['REMOTE_ADDR'];
 
	// Query for the visitors IP address
	$ipQuery = mysql_query("SELECT * FROM visits WHERE ipaddress = '$ip' LIMIT 1");
	 
	// Have they visited before?
	if(mysql_num_rows($ipQuery) == 1)
	{
		// They have visited before
		// Update last active time
		mysql_query("UPDATE visits SET lastactive = " . time() . " WHERE ipaddress = '$ip' LIMIT 1");
	}
	else
	{
		// They have not visited before
		// Insert new row
		mysql_query("INSERT INTO visits (ipaddress, lastactive) VALUES ('$ip', " . time() . ")") or die(mysql_error());
	}
	 
	// Delete any old records (where lastactive < NOW - 5 Mins)
	mysql_query("DELETE FROM visits WHERE lastactive < " . (time() - 300)) or die(mysql_error());
	 
	// Query all views
	$allViewQuery = mysql_query("SELECT * FROM visits");
	 
	// Get the row count
	$onlineCount = mysql_num_rows($allViewQuery);
	 
	echo $onlineCount;
	
	mysql_close($connection);
?>