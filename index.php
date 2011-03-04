<!doctype html>
<html>
<head>
    <meta charset='utf-8'/>
    <title>nullist</title>
    <meta content='the creative freelance directory | nullist. I Hate Writing...' name='description'/> 
    <meta content='freelance, creative, directory, jobs, contract, designer, developer, architect, illustrator, graphic, post, find, work, null, nullist, lame, 8===D' name='keywords'/>
    <meta id='viewport' name='viewport' content='width=device-width'/> 
    <link rel='stylesheet' href='css/layout.css'>
</head>
<body>
    <div id='add'>
        <form>
            <input id='title' name='title' type='text' maxlength='25'/> <span>title <small>(LIMIT 25)</small></span>
            <input type='radio' name='archetype' value='dev'/> <span>developer</span>
            <input type='radio' name='archetype' value='grafik'/> <span>grafik</span><br/>
            <input id='image' name='image' type='text'/> <span>img <small>(250x175)</small></span>
            <input type='radio' name='archetype' value='arch'/> <span>arch</span>
            <input type='radio' name='archetype' value='ID'/> <span>id</span><br/>
            <input id='folio' name='folio' type='text'/> <span>url <small>(Folio)</small></span>
            <input type='radio' name='archetype' value='designer'/> <span>designer</span>
            <input type='radio' name='archetype' value='illustrator'/> <span>illustrator</span><br/>
            <input id='txt' name='txt' type='text' maxlength='255'/> <span>txt <small>(LIMIT 255)</small></span><br/>
            <input id='math' name='math' value='1+1=3' type='text'/> <span>maths <small>(Correct It)</small></span><br/>
            <input type='button' onclick='addEntity(this)' value='add entry.'/> <span id='error'></span>
        </form>
        <span class='closeAdd' onclick='addForm()'>close.</span>
    </div>
    <div class='addOverlay'></div>
    <div class='quickOverlay'>omg...</div>
    <div class='wallOverlay'></div> 
    <div class='cOverlay'>
        <div id='comments'></div>
    </div>
    <div id='name'>
        <span><em>the</em> creative freelance directory <em>(alpha)</em> <?php include 'visits.php'; ?></span>
        <span id='menu'>
            <?php include 'menu.php'; ?>
        </span>
    </div>
    <div id='message'>
    	<span class='welcome'>
            Welcome to <b>nullist</b>, the creative freelance directory,<br/>
            where you can post a link and some info to your online portfolio,<br/>
            helping you get some publicity for your ideas.<br/>
            <p>
                1. to add your entry, click '<b>add</b>' on the top right.<br/>
                2. to rank someones work, drag their entry up(+) or down(-) the list.<br/>
                3. to leave or read a comment, click on '<b>comments</b>' on the bottom right of the entry.<br/>
                4. for a quick preview click '<b>quick</b>' on the bottom left of the entry.<br/>
                5. issues/questions/ideas email 'info.designisalie at gmail'.<br/>
                <br/>
                click to <b>close</b>.
            </p>
        </span>
    </div>
    <div id='content'>
        <div id='hott' class='type'></div>
        <div id='new' name='new' class='type'></div>
        <div id='arch' class='type'></div>
        <div id='designer' class='type'></div>
        <div id='dev' class='type'></div>
        <div id='grafik' class='type'></div>
        <div id='ID' class='type'></div>        
        <div id='illustrator' class='type'></div>
        <div id='tag' class='type'>omg...</div>
    </div>
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js'></script>
    <script src='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/jquery-ui.min.js'></script>
    <script src='js/baseQuery.js'></script>
    <script>
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-13144303-14']);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>
</body>
</html>