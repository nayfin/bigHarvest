<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <?php if (isset($title)): ?>
            <title><?= htmlspecialchars($title) ?></title>
        <?php else: ?>
            <title>BigHarvest</title>
        <?php endif ?>
        
        <!-- CSS -->        
            <!-- Fonts-->
        <!--font needed for sun symbols-->
        <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/segoe-ui-symbol" type="text/css"/>
        <!-- Google Font-->
        <link href='http://fonts.googleapis.com/css?family=Slabo+27px' rel='stylesheet' type='text/css'>   
        <!--Font Awesome-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        
        <!--Bootstrap-->
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <!-- ThemeRoller
        <link href="css/jquery-ui.theme.min.css" rel="stylesheet" type="text/css">-->
        <!-- jQuery UI-->
        <link href="css/jquery-ui.min.css" rel="stylesheet" type="text/css">        
        <!-- My CSS-->
        <link href="css/cssGard.css" rel="stylesheet" type="text/css">
        
        
        <!-- !!! I would like to switch back to this later
        <link href="css/jquery.scrollbar.css" rel="stylesheet" type="text/css">-->
        
        <!--SCRIPTS: Peel some of these off, and only add to neccessary pages-->
	
	
	<!-- jQuery-->
        <script src="/js/jquery.js"></script>
  	
	<script>
	    var title = document.title
 
	    $(document).ready(function(){
	        // starts slimscroll, uncomment variables in adjustAdjuster() in functions.js
                //$("#dirtDiv").slimScroll({height: "inherit", width: "100%"});
              	//$("#userList").slimScroll({height: "inherit", width: "100%"});
	        $(".adjustable").addClass("notransition");
                $(".page").addClass("notransition");
	        adjustAdjuster();
	        setTimeout(function(){
        	    $(".adjustable").removeClass("notransition");
           	    $(".page").removeClass("notransition");
        	}, 20)
		
	        $(window).resize(function(){
	            $(".adjustable").addClass("notransition");
                    $(".page").addClass("notransition");
        	    adjustAdjuster();
        	    adjustUserPage();
        	    setTimeout(function(){
        	    	$(".adjustable").removeClass("notransition");
        	    	$(".page").removeClass("notransition");
        	    }, 20);
    	        });
	    });	    	
	</script>
    </head>
    <body>
    
      <div id="vp" class="container-fluid">
    	<div class="row">
          <div id="headerAdjuster" class="col-xs-12 adjustable">
            <div  id="header" class="row">
               <!--
                <div id="headerImgCon" class="col-lg-3 col-md-3 hidden-sm hidden-xs imageContainer"><img id="headerImg" src="../images/headerPic.jpg"/>
                </div>
                -->
                <div id="text" class= "col-xs-12">
	            <div id="headerTitleText" class="col-sm-6">
	                <h3 id="title" class="headerFont">Your Big Harvest</h3>
                        <h4 id="subtitle" class="headerFont">
                            <?php if (isset($title)): ?>
	                    	<?= htmlspecialchars($title)?></h4>
                            <?php else: ?>
                                </h3>
                            <?php endif ?>                               
	            </div>
	            <div id="frostDates" class="col-sm-6 hidden-xs headerFont">
            	    </div>
            	</div>            	        
                <div class="navRow">         
                    <!-- if signed in give user nav options. -->       
  		    <?php if (isset($_SESSION["id"])): ?> 	  	    
                    	<nav id="navigation" class="navbar navbar-default col-xs-12" >  		
                            <button data-role="none" type="button" class="navbar-toggle" data-toggle="collapse" data-target="#userNavBar">
                            	<span class="icon-bar"></span>
                            	<span class="icon-bar"></span>
                            	<span class="icon-bar"></span>                        
                            </button>
  		            <div id="userNavBar" class="collapse navbar-collapse">
    		            	<ul class="nav navbar-nav">
    		            	    <?php if ($title !=="Garden"): ?> 
      			            	<li class="active"><a href="index.php" data-ajax="false"><i class="fa fa-bars fa-rotate-90"></i> Garden</a></li>
      			            <?php endif ?> 
      			            	<li><a href="#" data-ajax="false" ><i class="fa fa-shopping-basket disabled"></i> Harvest*</a></li>
      			            <?php if ($title !=="New Plant"): ?>
      			            	<li><a href="plantToDB.php" class="fa fa-pagelines" data-ajax="false"><i></i> Create Plant</a></li>
      			            <?php endif ?>
      			            <?php if ($title !=="Change Password"): ?>
      			            	<li><a href="changePW.php" data-ajax="false"><i class="fa fa-key"></i> Change Password</a></li>
      			            <?php endif ?>
      			            <li></i><a href="logout.php" data-ajax="false"><i class="fa fa-sign-out"></i> Logout</a></li>
     			              			
    		            	</ul>
    		            </div>
                        </nav>
                    <?php else: ?>
                    	<nav class="navbar navbar-default col-xs-12" >
                            <ul class="nav navbar-nav navbar-right">
                            	<?php if ($title !=="Register"): ?>
                                    <li><a href="register.php" data-ajax="false"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                            	<?php endif ?>
                            	<?php if ($title !== "Change Password"): ?>
                                    <li><a href="resetPW.php" data-ajax="false"><span class="glyphicon glyphicon-lock"></span> Forgot Password</a></li>
                            	<?php endif ?>
                            	<?php if ($title !=="Login"): ?>
                                    <li><a href="login.php" data-ajax="false"><span class="glyphicon glyphicon-log-in"></span>Log In</a></li>
                            	<?php endif ?>
                            </ul>
                        </nav>
                    <?php endif ?>      			                                    
                </div>
            </div>        
         </div>
         <div id="adjuster" class="col-xs-12 adjustable"> 
       <!--     -->