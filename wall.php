<ul id="list">
    <?php
        include 'connect.php';
        
        $query = mysql_query("SELECT * FROM wall ORDER BY id DESC LIMIT 100");
        
        while ($fetch = mysql_fetch_assoc($query)) {
            if ($fetch['name'] == '') {
                $fetch['name'] = 'anon';
            }
            echo '<li><span class="wallName">' . $fetch['name'] . ' : </span><span class="wallText">' . $fetch['text'] . '</span></li>';
        }
        mysql_close($connection);
    ?>

    <form id='wallForm'>
        <input type='text' maxlength='30' id="pasteName" value='Enter your name...' onblur="if(this.value=='')this.value='Enter your name...'" onfocus="if(this.value=='Enter your name...')this.value=''" /> 
        <input type='text' size="45" maxlength='255' id='pasteText'  onblur="if(this.value=='')this.value='Enter a message...'" onfocus="if(this.value=='Enter a message...')this.value=''" onKeyUp="wallCheck(this)" value='Enter a message...' /> 
        <input onclick="wallPost(this);wallDisable(this)" type="button" disabled='disabled' id="postWall" value="send." />
    </form>
</ul>