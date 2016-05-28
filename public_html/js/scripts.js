/**
 * scripts.js
 *
  Big Harvest
 *
 * Global JavaScript
 * TODO
    -set all stages to functions to be easily called
    -organize!!!
 */    
function setDimensions(width, height){
     //hides dimensions form
     //*** could use some work
     $("#dimensionsForm").hide();  
     gardEmWidth = metToEm(width); // gardMetWidth converted to em units
     gardEmHeight = metToEm(height);// ditto for height
     // resizes everything classed gardDim to match em width and height
     resizeSvg($(".gardDim"), gardEmWidth, gardEmHeight); // resizes garden to match form
     
};
  // collects users frost dates then pins them to header
function headerFrostDates(zone){
    userFrostDates = zoneFrostDays[zone];
    var frostDatesHTML = "<span id='snowflake' class='tip' title='Frost Dates'>&#10052 </span>Last : " + userFrostDates["last"] +"<br>" + "First : " + userFrostDates["first"] +""; 
    $("#frostDates").append(frostDatesHTML);    
}    
    function showUserPage(){
        $("#userPage").css("right","0px");
        $("#userListArrowCon").css("left", ".2em");
        $("#userListArrow").removeClass("rotate-one-eighty");
        userPageOn = true;  
    }
    function hideUserPage(){
        var width = $("#userPage").outerWidth();
        $("#userListArrow").addClass("rotate-one-eighty");
        $("#userListArrowCon").css("left", "-2em");
        $("#userPage").css("right", -width + "px");
        userPageOn = false;
    }
    //makes appropriate adjustments to display userPage then pulls into view
    function toggleUserPage(){
        if(userPageOn !== true){
            showUserPage();
        }
        else{
            hideUserPage(); 
        }
        adjustAdjuster();

        adjustUserPage();
    	//$("#adjuster").removeClass().addClass("col-xs-8 col-sm-9 col-lg-10");
    //    $("#userPage")[0].style.height = $(window).height() + "px";        
        //sets appropriate height for #userList
  //      $("#userList")[0].style.height =  $("#userPage").height() - ($("#userListLabel").outerHeight(true)) - ($("#gardenButtons").outerHeight(true))  + "px";
    }
    // changes tables from hardiList format to userList format
    function HLtoUL(id, element){
                
        element.id =  id + "ul";
                
        $(element).find('.plantIcon').addClass(id.toString() + " userIcon" );
        $(element).find('.plantIcon')[0].id = id + "Img";
        //adds sown column to table to track number of planted plants, IDed to id for easy access
        $(element).find('.row1').prepend("<th>Sown</th>");
        $(element).find('.row2').prepend("<td id='" + id + "Sown'>" + 0 + "</td>");
        $(element).find('.row3').prepend("<td>" + 
                                            "<button class='editPlant' type='button'>Edit"+
                                            "</button>" +
                                         "</td>");
        $(element).find('.row4').prepend("<td>" + 
                                            "<button class='deletePlant' type='button'>Delete"+
                                            "</button>" +
                                         "</td>");                               
    };
    function displayDimensionSelect(){
    	changeHeader("Plot Garden");
        userFrostDates = zoneFrostDays[zone];
       // $("#gardDimensionsPage").outerHeight($("#adjuster").outerHeight());
        $("#dimensionsForm").show();
        $("#dirtDiv").show("slide", 1000);
    } 
     
    function displayHardiMap(){
        
        // !!!!!!!!!!!  add button to define this !!!!!!!!!!!!!!!!!!!!!!
        dimensions = {};
        dimensions.rom = "metric";
        $("#regionSelectPage").show("slide", 1000);
        
        //set top for each hardiness zoneButton so that they line up vertically, horizontal controlled by css    
        var pushDownPercent = 63.5;
        $.each($(".zoneButton"),function(i, val){
            this.style.top = pushDownPercent + "%";
            pushDownPercent += 2.59;        
        });
        $(".zoneButton").click(function (event){    
            $("#infoArrowCon").show("puff");
            var clickedZone = this.id;    
            displayHardiPlants(event,clickedZone);
            //gets dimensionsSelectPage ready behind hardiPage
            displayDimensionSelect();
            headerFrostDates(clickedZone)
            stage = "zoneSelected";
        });
        
    }  
    function displayHardiPlants(event, zoneSelected){
        
        zone = zoneSelected;
        changeHeader("Choose Plants");
        
        //fills hardiList with plants that grow well in specified zone !! also sets zone in users DB !!
        fillHardi(zoneSelected);
        // sets hardiContent to fill the screen       
        showUserPage();
        compDisplay(compOn);
        setTimeout(function(){
            setTimeout(function(){
                 $("#regionSelectPage").hide();

            },2000);
            $("#hardiPage").show("slide", 1000);
        }, 500);
        
        
    }; 
    // pulls up hardiPage to allow user to select more plants
    function morePlants(){
    	$("#hardiPage").show("slide", 1000);
    	$(".cloneMe").draggable("disable");
    };
    function activateTips($identifier){
     	$($identifier).tooltip({
     	    show: {
        	effect: "slideDown",
        	delay: 250
      	    },
     	    position: {
     	        my: "right",
     	        at: "left",
     	    },
     	});
    }
    function toggleTips(){
        var tipsOn= $("#tipButton")[0].checked;
        console.log(tipsOn);
        if(tipsOn){
            $(document).tooltip("option","disabled",true);
        }
        else{
        //    $(document).tooltip("destroy")
	 //   activateTips($(document));
	   // $(document).tooltip("enable").tooltip("option","show", 400); 
            console.log($(document).tooltip("option", "disabled","false"));
        }
        
    }
    function activateButtons(){
        $("#stageToolbar").buttonset();
        $("#tipButton, #copyButton").button();
        $("button").button({
        
        });
    }  
    
 $(document).ready(function(){ 
    //check for chrome, alert if !chrome
    var browser = navigator.vendor.toString();
    infoHeight = $("#info").outerHeight();
    userPageWidth = $("#userPage").outerWidth();
    headerHeight = $("#header").outerHeight();  
    /*
    // Tells user to use Google Chrome
    if(browser.search("Google") < 0){
    	alert("Please use Google Chrome for best experience.");    
    }
    */
    //activate jQuery UI tooltips
    activateTips($( document ));
    //deactivates jQmobile checkboxes, interfer with UI functions
    $("checkbox").checkboxradio("destrroy");
    //activate jQuery UI styling 
    activateButtons();
    
    //make #userList sortable
    $("#userList").sortable({handle: ".sortIcon", axis: "y", revert: 300});
    $( "#userList" ).disableSelection();
    // adjusts elements on resize
    /*
    $(window).resize(function(){

        $(".adjustable").addClass("notransistion");
        adjustAdjuster();
        adjustUserPage();
        if(userPageOn == false){
            hideUserPage();
        }
        setTimeout(function(){
            //sets pageHeight and pageWidth        
            $(".adjustable").removeClass("notransistion");
        }, 200);
    });  
     */
    
    //array of users plants, may be filled by user from plant selection page or filled by database
    userPlants = []; 
    //counts plants as add to userList used to id, starts with 1 not 0


    // variables needed to resize garden        
    var gardMetWidth, // metric width and height of garden, pulled from gardInfo form
        gardMetHeight,// metric Height ditto
        gardEmWidth, // gardMetWidth converted to em units
        gardEmHeight,
        gardForm,     // 
        ruleOfMeasure; //probably used later??

    $(".page").hide();
   // checks to see at which stage user is in creating their garden, then renders page accordingly
    $("#dimensionsForm").hide();
    if(stage == "new"){
        // counts the users plants as entered
        listId = 0; 
         
         
        //deactivates transitions for #info, hides it, then reactivates transitions
        $("#info").addClass("notransition");              
        compDisplay(true);
        $("#info").removeClass("notransition");
        //hides #info display button
        $("#infoArrowCon").hide();
        
        hideUserPage();
        //everything needed for showing the HardiMap page\
        displayHardiMap();  
            /*
                TODO: list those things?
            */
    }
    else if(stage == "zoneSelected"){
    	listId = 0;
        displayHardiPlants(event, zone);
        headerFrostDates(zone);
        // done selecting plants from hardiList
    
    }
    else if(stage == "plantsSelected"){
        
        headerFrostDates(zone);
        showUserPage();
        displayDimensionSelect();
        setULtoDB("userList");   
   	fillHardi(zone);
        compDisplay(compOn);
        
    }
    else if(stage == "dimensionsSelected"){
	changeHeader("Plot Garden")
        transferDimensions("loadFromDB");
	headerFrostDates(zone);        
        showUserPage();
        setULtoDB("userList");   
        $("#dirtDiv").show();
        compDisplay(compOn);
	fillHardi(zone);
	//$(".iconImageContainer").mousedown(function(){clickPlant($(this).data("userIndex"))});
    }
   // hides hardiPage and replaces userLists in database 
   $("#listDoneButton").click(function(){
       if(stage !== "zoneSelected"){
         // dragActivate($(".plantIcon"));
          cloneActivate();
          $(".cloneMe").draggable("enable");
       }
       $("#hardiPage").hide("slide",1000);

       setULtoDB(userPlants); 
      // $(".iconImageContainer").mousedown(function(){clickPlant($(this).data("userIndex"))});
   }); 
   // applies metrics from dimensionsForm to garden
   $("#dimensionButton").click(function(){
        //fills dimension variables with values from form
        gardForm = $("#gardForm")[0],
        ruleOfMeasure = gardForm.elements[0].value;
        gardMetWidth = gardForm.elements[2].value;
        gardMetHeight = gardForm.elements[3].value;
        stage = "dimensionsSelected";
        var parameters = {
            stage : stage,
            rom : ruleOfMeasure,
            metric : {
                x : gardMetWidth,
                y : gardMetHeight,
            }
        }
        //sends dimensions to database
        transferDimensions("setDB", parameters);
        //ensures form is filled completely
        if(gardMetWidth > 0 && gardMetHeight > 0){
            setDimensions(gardMetWidth, gardMetHeight);
            //$(".userIcon").find(".iconImageContainer").addClass("farts");
        }              
        else if (gardMetWidth <= 0 || gardMetHeight <= 0) {
            alert("Width and Height values must be greater than zero.")
        }
        else{
            alert("Fill out the damn form!")
        }   
       // $("#gardDimensionsPage").outerHeight("auto"); 
        cloneActivate();          
    });
    console.log("scripts.js over");
     
});  