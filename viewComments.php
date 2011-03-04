<?php
	include 'connect.php';

	$entity = $_POST['entity'];
	$cookie = $_POST['cookie'];
	$ip = $_SERVER['REMOTE_ADDR'];

	$query = mysql_query("SELECT * FROM comment WHERE entity='$entity' ORDER BY id ASC");
	$quantity = mysql_num_rows($query);
	$n = 0;
	
	echo "<div id='comments'>\n";
	echo "<div class='cId' name='" . $entity . "'>\n";
		
	while ($fetch = mysql_fetch_assoc($query))
	{	
		$n++;
		echo "<div class='cContainer " . (($i^=1) ? 'odd' : 'even') . "'>\n";
		echo "	<span class='id'>" . $n . ".</span> \n";
		echo "	<span class='comment'>" . $fetch['comment'] . "</span>\n";
		echo "	<span class='name'>– " . $fetch['name'] . "</span>\n";
		echo "	<span class='date'>" . ago($fetch['date']) . ".</span>\n";
		echo "	<span class='reply' onclick='Reply(this)' name='" . $fetch['name'] . "'>reply.</span>\n";
		if($ip == $fetch['ip'] && $cookie == $fetch['name']){
			echo "	<span class='cRemove' id='" . $fetch['id'] . "' onclick='cRemove(this)'>delete.</span>\n";
		}		
		echo "</div>\n";
	}
	if($quantity == 0){
		echo "<span class='noComment'>No Comments. =(</span>";
	}
	
	echo "</div>\n";	
	
    function ago($timestamp){
        $difference = time() - $timestamp;

        if($difference < 60)
            return $difference." seconds ago";
        else{
            $difference = round($difference / 60);
            if($difference < 60)
                return $difference." minutes ago";
            else{
                $difference = round($difference / 60);
                if($difference < 24)
                    return $difference." hours ago";
                else{
                    $difference = round($difference / 24);
                    if($difference < 7)
                        return $difference." days ago";
                    else{
                        $difference = round($difference / 7);
                        return $difference." weeks ago";
                    }
                }
            }
        }
    }
	
	mysql_close($connection);
?>
		<div id='newComment'></div>
        <button class='addButton' onclick='showCommentForm(this)'>add comment.</button>
        <form id='addComment'> 
			<input id='callSign'  name='callSign' type='text' maxlength='35'/> <em>name. <small>(LIMIT 35)</small></em><br/>
			<input id='comment' name='comment' type='text' maxlength='255' /> <em>comment. <small>(LIMIT 255)</small></em><br/>
			<input id='math2'  name='math2' value='1+1=3' type='text'/> <em>maths. <small>(Correct It)</small></em><br/> 
			<input type='button' onclick='addComment(this)' value='Comment.'/>
            <span id='commentError'></span>
		</form>
	</div>