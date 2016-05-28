    
    
    <script type="text/javascript">
            
        <?php if (isset($stage)): ?>
             var stage = "<?= htmlspecialchars($stage) ?>"; 
        <?php endif ?>
        console.log(stage);
        <?php if (isset($zone)): ?>
	    var zone = "<?= htmlspecialchars($zone) ?>";             
     	<?php endif ?>                        
    </script>
    <script src="/js/scripts.js"></script>
  <!--  !!! MOVE TO JAVASCRIPT !!! -->
    <!-- shiftPressed(event) activates copyControl() on shift down, deactivates on up -->
    <body onkeydown="shiftPressed(event)" onkeyup="shiftPressed(event)">
       
             
    <div id="content" class="content row">
        <!-- allows user to select their hardiness region from a map-->
        <div id="regionSelectPage" class="col-xs-12 page">
            <div id="regionText" class="row">
                <div class="col-sm-3">
                </div>
                <div class="col-sm-6">
                    <h2>Choose your Hardiness Zone!</h2>
                    <h4>Click on the colored box in the bottom right legend that corresponds with the hardiness zone for your location</h4>
                </div>
                <div class="col-sm-3">
                </div>
            </div>
            <div id="hardiSelect" class="row">
                <div class="col-md-2">               	
                </div>
                <div id="hardiMap" class="col-md-8">
                    <img id="mapImg" src="images/hardinessMap.jpg" align="center" class="" > 
                    <button id="h1" type="button" class="zoneButton"></button>
                    <button id="h2" type="button" class="zoneButton"></button>
                    <button id="h3" type="button" class="zoneButton"></button>
                    <button id="h4" type="button" class="zoneButton"></button>
                    <button id="h5" type="button" class="zoneButton"></button>
                    <button id="h6" type="button" class="zoneButton"></button>
                    <button id="h7" type="button" class="zoneButton"></button>
                    <button id="h8" type="button" class="zoneButton"></button>
                    <button id="h9" type="button" class="zoneButton"></button>
                    <button id="h10" type="button" class="zoneButton"></button>
                    <button id="h11" type="button" class="zoneButton"></button>
                    <button id="h12" type="button" class="zoneButton"></button>
                    <button id="h13" type="button" class="zoneButton"></button>
                </div>
                <div class="col-md-2"><h3>Hardiness Zone:</h3> Your Hardiness Zone maps the projected first and last frost dates for your location. This determines the length of your grow season and the plants that can be planted in your climate. After choosing your Hardiness Zone from the legend in the bottom right you will choose from plants available in your area.
                </div>
            </div>
        </div>
        
        <!-- holds all plants that grow in selected hardizone -->
        <div id="hardiPage" class="col-xs-12 page">
            <div id="hardiContent" class="col-xs-12 list">
                <h2>These plants grow well in your hardiness zone</h2>
                <h3 style="text-align: center">Click plant to add to your list, you will plant these soon. You can choose multiple to times to represent different varieties.  </h3>
                <div id="hardiList" class="">
                </div>
                <div class="col-xs-12">
                    <div class="col-xs-10">
                    </div>
                    <button id="listDoneButton" class="">
                        <span class="glyphicon glyphicon-ok"></span> Ok</button>
                </div>
            </div>
        </div>

        
        <!-- dirtDiv: hold dimensionsForm-->
        <div id="dirtDiv" class="col-xs-12 page">                                  
            <div id="dirtSvgMargin">
                <div id="dirtSvgCon">
                    <svg class="gardDim" id = "dirtSvg" > 
                        <defs>                        
                            <pattern class="pattern" id="oneEmPat" width="1em" height="1em"  patternUnits="userSpaceOnUse">
                                <rect class="patDim" width = "1em" height= "1em" fill="white" fill-opacity="0.0"/>
                            </pattern>
                            <pattern class="pattern" id="fiveEmPat" width="5em" height="5em"  patternUnits="userSpaceOnUse">
                                <rect class="patDim" width = "5em" height= "5em" fill="url(#oneEmPat)" fill-opacity=".8"/>
                            </pattern>
                            <pattern class="pattern" id="tenEmPat" width="10em" height="10em"  patternUnits="userSpaceOnUse">
                                <rect class="patDim" width = "10em" height= "10em" fill="url(#fiveEmPat)" fill-opacity=".8"/>
                            </pattern>
                        </defs>
                        <rect id="grid" class="gardDim" fill="url(#tenEmPat)" height="100%" width="100%"></rect>
                    </svg>
                </div>
            </div>
        </div>    
            
            
            <!-- dimensionsForm: collects size of user --->
            <div id="dimensionsForm" class="col-xs-12">
                <div class ="col-xs-12">
                    <h2>Tell me about your garden</h2><br>
                    <h4>Choose units, then enter size of your garden</h4>
                </div>
                <div class="col-sm-3">
                </div>
                <div class="col-sm-6">
                    <form id="gardForm">
                        
                        Length Units: 
                        <input name="rom" type="radio" value="met" checked="checked"/> Metric
                        <input name="rom" type="radio" value="stan" disabled/> Standard   *disabled for now     
                        <br/>
                        Length of Garden: <input name="GardLength" type="number" step= "0.1" max="300" min="0" value="4" required/>
                        <br/>
                        Width of Garden: <input name="GardWidth" type="number" step="0.1" max="300" min="0" value="4" required/>
                        <br/>
                        <input id="dimensionButton"type="button" value="Let's Start Your Garden">
                    </form>
                </div> 
                <div class="col-sm-3">
                </div>   
            </div>
        <!--</div>  test remove gardDimensionsPage  --> 
      </div><!-- closes .content -->	
    </div> <!-- closes #adjuster -->
    
    <!--
    info pop-up: delivers data on good companions and other extra info on plants    
    -->
    <div class="row" id="info">

            <div id="growInfo" class="col-xs-6">
                <div id="notesLabel" class="infoLabel">
                    Notes:
                </div>
                <div id="plantNotes" class="infoText"> 
                </div>
            </div>
            <div class="col-xs-6">
                <div id="companionsLabel" class="infoLabel">
                    Companion Plants:
                </div>
                <div id="compInfo" class="infoText ">
                </div>
            </div>  
        
        <button id="infoArrowCon" class="arrowCon tip" title="Toggle Info" onclick="compDisplay(compOn,'info')"><span id="infoArrow" class="fa fa-arrow-circle-up circle-button-icon">
        </button>
    </div>
                
        <!-- stores gardenButtons and user selected plants from hardiPage -->
        <div id="userPage" class="col-xs-4 col-md-3 col-lg-2 list adjustable">
            <div id="gardenButtons" class="ui-widget-content">
                <div id="stageToolbar" class=""><!--   -->	
               	    <input type="checkbox" id="toDimensionsSelect"  class="gardenOptionsButton"  onclick="" data-role="none">
               	        <label for="toDimensionsSelect" title="Change Dimensions" class="tip"><i class="fa fa-crop"></i></label>
            	    
               	    <input type="checkbox" id="toHardiPlants" class="gardenOptionsButton" onclick="morePlants(event, zone)" data-role="none">
               	        <label for="toHardiPlants" title="Add Plants" class="tip" ><i class="fa fa-plus"></i><i class="fa fa-pagelines"></i></label>

               	    <input type="checkbox" id="toZoneSelect" class="gardenOptionsButton tip"  onclick="" data-role="none">
               	        <label for="toZoneSelect" title="Change Hardiness Zone" class="tip"><i class="fa fa-globe"></i></label>
                    
                    
             	</div> 
             	  
             	<!--	
                <div class="col-xs-3">
                <input type="checkbox"  id="tipButton" class="gardenOptionsButton  tip"  onclick="toggleTips()" checked>
               	    <label for="tipButton" title="Toggle Tooltips" ><i class="fa fa-info"></i> <i class="fa fa-mouse-pointer"></i></label>
                   <input type="checkbox"  id="gridButton" class="gardenOptionsButton  tip" title="Grid" onclick="gridDisplay()">
               	        <label for="gridButton" ><i class="fa fa-th"></i></label> 
                </div>    --> 
            </div>
            
            <div id="userListCont" class="">
                <div id="userListLabel" class="col-xs-12 ui-widget-content">
                    <h4>User List</h4>
                    <button id="userListArrowCon" class="arrowCon tip" title="Toggle User List" onclick="toggleUserPage()">
                        <span id="userListArrow" class="fa fa-arrow-circle-right circle-button-icon"></span>
                    </button>
                  <!--  <div id="copyButtonCon">-->
                        <input  type="checkbox" id="copyButton" class="arrowCon " onclick="copyControl(copyOn)" data-role="none">
                            <label id="copyButtonLabel" for="copyButton" title="Copy Plants in Garden" class="tip"><span id="" class="fa fa-clone circle-button-icon"></span></label>
                    </div>

                <div id="userList" class="row adjustable"></div>
                    
                </div>
            </div>
        </div>
        <!-- 
	*
	* HARDINESS ZONE ICON TEMPLATE
	*	    
	-->
	<div id="hardiIconTemplate" class="col-xs-6 col-md-4 col-lg-3 template icon">
	    <div class="iconheader row">
 	    	<div class="col-xs-7 iconLabel">
		</div>
		<div class="col-xs-3 water tip" title="Per Week"><i class="fa fa-tint tip"></i><span class="waterText"></span>
		</div>
		<div class="sun tip" title="">
		</div>
	    </div>
		<div class="iconbody row">
		    <div class="col-xs-4 iconImageContainer">
		        <img src="" alt="Need Image" class="iconImg">
		    </div>
	            <div class="col-xs-8 iconDataContainer">
			<div class="row">
			    <div class="col-xs-5 iconDataColumn">
				<div class="daycount dataDisplay">
  			            <div class="dataDisplayHeading tip" title="Days until first harvest"><small>Daycount</small>
  			            </div>
  				    <div class="dataDisplayContent daycountDisplay">
  				    </div>
				</div>
				<div class="soil dataDisplay">
  				    <div class="dataDisplayHeading"><small>Soil </small>
  				    </div>
  				    <div class="dataDisplayContent soilDisplay">
  				    </div>
				</div>									
			    </div>
			    <div class="col-xs-7 iconDataColumn">
			        <div class="startdates dataDisplay">
				    <div class="dataDisplayHeading"><small>Sow Dates </small>
				    </div>
				    <div title="Start Indoors" class="in tip">
					<span class="insideStartDate fa fa-home"></span> 
				    </div>
				    <div title="Outdoors(Spring)" class="out tip">
				        <span class="outsideStartDate fa fa-leaf"></span>
				    </div>
				    <div title="Fall Harvest" class="fall tip">
					<span class="fallHarvestStartDate glyphicon glyphicon-tree-deciduous"></span>
				    </div>
				</div>
			    </div>
	    		</div>
		    </div>
		</div>
	    </div>
	    <!-- 
	    *
	    * USER ICON TEMPLATE
	    *	    
	    -->
	    <div id="userIconTemplate" class="col-xs-12 template icon">
	   	<div class="iconheader row">
 	    	    <div class="col-xs-7 iconLabel">                
		    </div>
		    <div class="col-xs-3 water fa fa-tint tip" title="Per Week"><span class="waterText "></span>
		    </div>
		    <div class="sun tip">
		    </div>
	    	</div>
		<div class="iconbody row">
		    <div class="col-xs-4 iconImageContainer">
  	                <img src="" alt="Need Image" class="iconImg">
		    </div>
	            <div class="col-xs-8 iconDataContainer">
			<div class="row">
			    <div class="col-xs-5 iconDataColumn">
				<div class="daycount dataDisplay">
  			            <div class="dataDisplayHeading tip" title="Days until first harvest"><small>Daycount</small>
  			            </div>
  				    <div class="dataDisplayContent daycountDisplay">
  				    </div>
				</div>
				<div class="soil dataDisplay">
  				    <div class="dataDisplayHeading"><small>Soil </small>
  				    </div>
  				    <div class="dataDisplayContent soilDisplay">
  				    </div>
				</div>									
			    </div>
			    <div class="col-xs-7 iconDataColumn">
			        <div class="startdates dataDisplay">
				    <div class="dataDisplayHeading"><small>Sow Dates </small>
				    </div>
				    <div class="in tip dataDisplayContent" title="Start Indoors">
					<span class="insideStartDate fa fa-home"></span> 
				    </div>
				    <div class="out tip dataDisplayContent" title="Outdoors(Spring)">
				        <span class="outsideStartDate fa fa-leaf"></span>
				    </div>
				    <div class="fall tip" title="Fall Harvest" class="dataDisplayContent">
					<span class="fallHarvestStartDate glyphicon glyphicon-tree-deciduous"></span>
				    </div>
				</div>
			    </div>
	    		</div>
		    </div>
		</div>
		<div id="userIconComponent" class="row">
		    <span class="col-xs-8"><span class="badge sown"></span>Planted</span>
		    <!-- both work best on resize without remaining .col-xs-1, confused...-->
		    <span title="Edit" class="editIcon fa fa-pencil-square-o iconButton tip " ></span>
		    <span title="Long Press Delete"class="deleteIcon fa fa-trash iconButton tip "></span>
		    <span title="Drag Up and Down to Sort" class="sortIcon fa fa-arrows-v fa-inverse iconButton tip "></span>
		</div>
	    </div>
	
			        
        