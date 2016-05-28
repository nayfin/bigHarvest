/*
	functions.js
	-holds all functions for site
	-organize and divide
*/

/*
	Prototypes
*/

	// replace all prototype, like .replace but replaces all instances of string inside another
	String.prototype.replaceAll = function(str1, str2, ignore) 
	{
	   return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
	};
/*
	Prototypes
*/	
	function changeHeader(subtitle){
	    $("#subtitle").html(subtitle);
	};
	
/*
	Garden Dimension Functions
	-resizes garden appropriately
	-converts dimensions as needes
*/
	//convert between em, metric, and px        
	function emToMet(em){
	    var met = em/10;
	    return met;
	};
	function metToEm(met){
	    var em = met * 10;
	    return em;
	}
	function emToPx(em){
	    var px = em * pxPerEm // replace with page.Fontsize later
	    return px;
	}
	
	//resizes all elements .gardDim
	//!! SWITCH TO jQuery !!
	function resizeSvg(svg, width, height){
	    for (var i = 0; i < svg.length; i++){
	        svg[i].style.width = width + "em";
	        svg[i].style.height = height + "em";
	    }
	}

/*
	Data Base Functions
*/      
        /* 
        Gets or sets userData in database
        transfer can be "get" or "set"
        
        */
        function updateUserData(transfer){
            
            $.post("fillHardi.php", parameters, function(data,status){
                if(status == "success"){
                    console.log(data);
                }
                else{
                    console.log(status);
                }
            })
        }
	//find plants for selected hardizone
	function fillHardi(zone){   
	    //store parameters for .post
	    var parameters = {
	        hardi: zone,
	        stage: stage,
	    };
	    $.post("fillHardi.php", parameters, function(data,status){
                if(status == "success"){
	            hardiList = [];
	            for(each in data){
	                var plantData = data[each], //creates object to pass to define plant
	                    index = data[each].id; // creates index to store original id, perhaps useful for indexing
	            //creates an object for plant to hold data and html   
	                hardiList[index] = definePlant(plantData); 
	            }
	            for(each in hardiList){
	            dataToIcon($("#hardiIconTemplate"),hardiList[each], $("#hardiList"));      	       
	       	    }
	       	    //displays plant info on mouseover of hardiPlant
	            $(".hardiIcon").mouseover(function(){
	                var index = parseFloat(this.id);
	                displayInfo(hardiList[index]);
	            });
	       	    $(".hardiIcon").click(function(){
	                //error checking
	            	if(!Number.isInteger(parseInt(listId))){	            	
	            	    listId = 0;
	            	}	                
	            	var hardiId = $(this).attr("id");

	            
	            	//copies data from hardiList[plant] to users new array of plants
	            	//ID set by order choosen, indexed to id
	            	userPlants[listId] = (JSON.parse(JSON.stringify(hardiList[parseFloat(hardiId)])));
	            	userPlants[listId].uPlantID = listId.toString();            
	            	//sets clones id to listId to provide easy acces
	            	
	            	dataToIcon($("#userIconTemplate"),userPlants[listId], $("#userList"));
	            	
	            	// makes edit and delete button on plants icon work
			//TODO:!!!!!!!!!!!
	            	// get ready for new plant
	            	listId++;
            	    });    
	    	}
	    	else{
	            // log error to browsers console
	            console.log(status);
	        }
	    })
	}
	// 
	function setULtoDB(uPlants){
    	    var parameters;

    	    if(uPlants !== "userList"){
        	//checks stage, if user hasn't progressed past plants selected already, stage is updated: else remains the same
    	        // prevents bug when adding more plants after some already chosen
        	if(stage == "zoneSelected"){
    	    	    stage = "plantsSelected";
    	        }
    	        parameters = {
             	    plants : uPlants,
                    stage : stage,
        	};
    	    }
    	    else {
                parameters = {
                    load : "userList"
                };
            }

            $.post("fillUserDB.php", parameters, function(data,status){
                if(status == "success"){
 
              	    if(data !== undefined){
                       
                	userPlants = [];
                	for(each in data){
                    	    var plantData = data[each]; //creates object to pass to define plant

                            //creates an object for plant to hold data and html   
                            userPlants[each] = definePlant(plantData); 
                        }
                        for(each in userPlants){
                            dataToIcon($("#userIconTemplate"),userPlants[each], $("#userList"));
                        }
                        $(".iconImageContainer").mousedown(function(){clickPlant($(this).data("userIndex"))});
	                if(stage === "dimensionsSelected"){
	                    cloneActivate();
                        }
                        if(userPlants.length === 0){
                            listId = 0;
                        }
                        else{
                            listId = parseFloat($(userPlants).last()[0].id) + 1;
			}
                    }
            	    else{
                	console.log("No Data Returned from DataBase");
            	    }
        	}
        	else{
            		console.log("fillUserDB.php status != 'success'");
        	}
    	    },"json");
    	    /*
    	    needs error checking .fail/ .done
    	    */
	}
	
	//creates plant objects from DB data
	function definePlant(plantData){
	   
	    var info = {};
	    info["name"] = plantData["name"];
	    //var id = 
	    info["id"] = function(){
	        // returns correct var r to id depending on which DB data set it is reading
	        var r;  
	              
	        if(plantData["uPlantID"] != undefined){
	            r = plantData["uPlantID"];
	        }
	        else if(plantData["id"] != undefined){
	            r = plantData["id"];
	        } 
	        return r;
	    }();
	    
	    info["uPlantID"] = info["id"];
	    info["oPlantID"] = plantData["oPlantID"];
	    info["src"] = plantData["imgSrc"];
	    info["spacing"] = {};
	    
	    info["spacing"]["metric"] = plantData["spacingMetric"];
	    info["spacing"]["standard"] = plantData["spacingStandard"];
	    //adjusts dia based on Rule of Measure or rom
	    /*
	!!! only sets to metric, needs to adjust for standard
	    */
	    info["spacing"]["rom"] = "metric";
	    if(info["spacing"]["rom"] === "metric")
	    {
	        info["dia"] = info["spacing"]["metric"]/10;
	        info["borderRad"] = info["spacing"]["metric"]/20;
	    }
	    info["sun"] = plantData["sun"];
	    info["metricWater"] = plantData["metricWater"];
	    info["standardWater"] = plantData["standardWater"];

	    info["companions"] = plantData["companions"];
	    info["daycount"] = plantData["daycount"];
	    //get first and last frost dates for zone, used to calculate start dates for plants
	    /*
	    * * * These should already be defined, thus deletable ***
	    */
	    var lastFrost = new Date(userFrostDates["last"]),
	        firstFrost = new Date(userFrostDates["first"]);
	    info["start"] = {};
	    info["start"]["in"] = calcStart(lastFrost, plantData["inStart"]);
	    info["start"]["out"] = calcStart(lastFrost, plantData["outStart"]);
	    info["start"]["fall"]= calcStart(firstFrost, plantData["fallStart"]);   
	    info["soil"] = plantData["soil"]; 
	    info["HTML"] = "";  //initializes, filled in by hardiListHTML() 
	    info["sown"] = 0;
	    info["notes"] = plantData["notes"];
	    return info;
	};
	function transferDimensions(command, parameters){
	    if (command === "loadFromDB"){
	        parameters = {
	            load : "DB"
	        };
	    }
	    $.post("transferDimensions.php", parameters, function(data,status){
	        if(status === "success"){
	            if(data !== undefined){
	                dimensions = data;
	                var width = parseFloat(dimensions["metricX"]),
	                    height = parseFloat(dimensions["metricY"]);
	                setDimensions(width, height)
	                
	            }
	            else{
	                console.log("dimensions undefined: functions.js 248 ");
	            }
	        }
	        else{
	            console.log("transferDimensions status = " + status);
	        }
	    },"json");
	}
		
		

/*
 	Garden Interaction Functions
*/

/*
formats plantHTML template with proper attributes from list then appends it to appentTo
    $iconTemplate: which template to clone and fill with data i.e. $(".userIconTemplate"), $("#hardiIconTemplate")
    list: array of plant data to turn into html elements
    $appendTo: element to append html
*/

function dataToIcon($iconTemplate, data, $appendTo){
 	var plant = data,
   	    $clone = $iconTemplate.clone(),
   	    $sunDiv = $clone.find(".sun"),
   	    template = $clone.attr("id");

   	if(template == "hardiIconTemplate"){
   	      $clone.attr("id", plant.id + "hardi"); 	
   	      $clone.data("hardiIndex", plant.id);	
   	      $clone.removeClass("template").addClass("hardiIcon");
   	}

   	
   	//names clone
   	$clone.find(".iconLabel").html("<h4>" + plant.name + "</h4>");
   	// sets daycount appropriately
   	$clone.find(".daycountDisplay").html(plant.daycount);
   	// sets soil appropriately   	
   	$clone.find(".soilDisplay").html(plant.soil);   	
   	//add image to container
   	$clone.find("img").attr("src", plant.src);
   	//checks dimensions.rom (ruleOfMeasure)to label water appropriately
   	if(dimensions.rom == "metric"){
   	    $clone.find(".waterText").html(" " + plant.metricWater + "cm");
   	}
   	else{
   	    $clone.find(".waterText").html(" " + plant.standardWater + "in");
   	}
        // get sun icon ready
   	// sets tooltip to display appropriate value
   	$sunDiv.attr("title", plant.sun);   	
   	// chooses correct sun icon
	var sunSymbol;
   	switch(plant.sun){
   	    case "Full Sun":
   	        sunSymbol = "&#9728;";
   	        break;    
   	    case "Light Shade":
   	        sunSymbol = "&#9925;";
   	        break; 
   	    case "Partial Shade":
   	        sunSymbol = "&#9729;";
   	        break;
   	    case "Full Shade":
   	        sunSymbol = "&#10061;";
   	        break;
   	    default:
   	        sunSymbol = "NoSym";
   	}   	
   	// sets correct sun icon
   	$sunDiv.html(sunSymbol);
   	//fills set start dates
   	for(each in plant.start){
   	   
   	    var dateStr = plant.start[each].string;
   	   
   	    if(dateStr !== null){
   	        $clone.find("." + each).prepend(dateStr);  
   	    }
   	    dateStr = null;   
   	}
 	if(template === "userIconTemplate"){
 	    var $imgContainer = $clone.find(".iconImageContainer");
 	    $clone.removeClass("template").addClass("userIcon");
   	    var index = plant.uPlantID;
   	    $clone.attr("id", index + "user");
	    $clone.data("userIndex", index);	
   	    //$imgContainer.addClass(index + "drag");
   	    // sets element data["userIndex"] to index of userPlantsn to provide easy access
   	    $imgContainer.data("userIndex", index).addClass("cloneMe");
   	    //assign number of sown plants to .sown
   	    if(plant.sown == undefined){
   	        plant.sown = 0;
   	    }
   	    $clone.find(".sown").html(plant.sown);
   	    $clone.find(".sown").attr("id", index + "sown");
   	    //activate trash button
   	    $clone.find(".deleteIcon").on("taphold",function(){
   	        // delets plant from userPlants   	        
   	        userPlants.splice(index,1,null);
   	        // !!!adjust DB to match
   	        $clone.hide("drop",{direction: "right"}, 500);
   	        setTimeout(function(){
   	            $clone.remove();
   	        }, 600);
   	    });
   	    //activate edit button
   // !!!! does not edit yet !!!!!
   	    $clone.find(".editIcon").click(function(){
   	        alert("Placeholder: will allow user to make edits to plant data");
   	    });
   	}  	
   	//puts clone into appendTo
   	$clone.hide();
   	$appendTo.prepend($clone);
   	$clone.show("drop",{direction: "up"}, 500);
   	
   	//waits a little, then reactivates tooltips
	/*
	setTimeout(function(){
	    $("[data-toggle='tooltip']").tooltip();
	}, 400);   
	*/
}

function cloneActivate(){
  
  dropzonesActivate();

  $('.cloneMe').draggable({
    //dia : userPlants[$(this).data("userIndex")].dia,
    helper: function(){
        var curWidth = $(this).width(), 
            curHeight = $(this).height(),   
            $clone = $(this).clone();
        //dia = userPlants[$(this).data("userIndex")].dia;
        //console.log(this.dia);
        $clone.removeClass("col-xs-4 ");
        $clone.width(curWidth).height(curHeight);
        //$clone.height(curHeight);       
        return $clone;
    },
    stack: ".drag",
    //grid: [gridBlock, gridBlock],
    appendTo: 'body',
    zIndex:5,
    revert: 'invalid',
    create: function(){
        var plant = userPlants[$(this).data("userIndex")],
            rad = plant.dia/2 * pxPerEm;
        $(this).draggable("option", "cursorAt", {top: rad, left: rad});
    },
    start: function(e,u){
        tEntered = false;
        userPlantIndex = $(this).data("userIndex");
        inGarden = false;
        var $clone = u.helper,           
            plantData = userPlants[userPlantIndex],
            dia = plantData.dia;

       setTimeout(function(){
           resize($clone, dia);          
       },5); 
                  
        displayInfo(plantData);

    },
    // rebuilds autoscroll feature
    drag: function(e, u) {
      var curPos = u.offset;
      var $target = $("#dirtDiv");
      var tVP = $target.offset();
      var tW = Math.floor($target.width());
      var tH = Math.floor($target.height());
      var pad = 64;
      var scrInc = 16;
      var x0 = tVP.top;
      var x1 = tVP.top + tH;
      var y0 = tVP.left;
      var y1 = tVP.left + tW;
   
      if (tEntered) {
        // Increase Scroll
        if (curPos.left >= (y1 - pad) && curPos.left <= y1) {
          $target.scrollLeft($target.scrollLeft() + scrInc);
        }
        if (curPos.top >= (x1 - pad) && curPos.top <= x1) {
          $target.scrollTop($target.scrollTop() + scrInc);
        }
        // Decrease Scroll
        if (curPos.left >= y0 && curPos.left <= (y0 + pad)) {
          $target.scrollLeft($target.scrollLeft() - scrInc);
        }
        if (curPos.top >= x0 && curPos.top <= (x0 + pad)) {
          $target.scrollTop($target.scrollTop() - scrInc);
        }
      }
    }
  });
}
function cloneDeactivate(){
    $(".cloneMe").draggable("disable");
}
//drag and drop activators
function dragActivate($elements){
  $($elements).draggable({ 
      scrollSensitivity: 48,
      scrollSpeed: 15,
      grid: [gridBlock, gridBlock], 
      stack: ".ui-draggable",
      helper: "original",    
      containment: "#content",
      start: function(e,u){
          //console.log($(this).data("userIndex"));
          inGarden = true;
      },
  });
  $($elements).draggable("enable");
};
function dragDeactivate(){
  $(".drag").draggable("disable");
};
function copyActivate($elements){
  $elements.draggable({
      scrollSensitivity: 48,
      scrollSpeed: 15,
      grid: [gridBlock, gridBlock],
      stack: ".copy",
      helper: "clone",
      //appendTo: "#dirtDiv",
      revert: "invalid",
      containment: "#dirtDiv",
      start: function(e,u){
          //stacks copies
          var z = u.helper.css("z-index");
          u.helper.css("z-index", z+1);
          inGarden = true;
      },
  });
  $elements.draggable("enable");
 
};
function copyDeactivate(){
  $(".copy").draggable("disable");
}
function dropzonesActivate(){
  $('#dirtSvgCon').droppable({
    //greedy: true,
    accept: '.copy, .drag, .cloneMe',
    over: function(event, ui) {     
      var clone = $(ui.helper).clone(); 
      var plant = userPlants[userPlantIndex];
      // ensures that .drag elements only add to plant.sown when dragged in from outside garden, otherwise will add to sown on every drag
      if(!clone.hasClass("drag") || (clone.hasClass("drag") && inGarden == false)){
	  plant.sown++;
          $("#" + userPlantIndex+ "sown").html(plant.sown);
      }         
      inGarden = true;
    },
    out: function(e, u) {
      
      inGarden= false;
      var plant = userPlants[userPlantIndex];
          plant.sown--;
      $("#" + userPlantIndex+ "sown").html(plant.sown);
    },
    drop: function(e, u) {
    }
  });    
  $('#dirtDiv').droppable({
    //greedy: true,
    accept: '.copy, .drag, .cloneMe',
    over: function(e, u) {
      tEntered = true;   
      //console.log(inGarden);  
    },
    out: function(e, u) {
      tEntered = false;
      //console.log(inGarden);
    },
    drop: function(event, ui) {

      var $clone = $(ui.helper).clone(); 
      if($clone.hasClass("drag")){
          $clone = $($clone.context);
      }
      //console.log($clone);
      if($clone.hasClass("cloneMe") || $clone.hasClass("copy")){         
              
          var parent = $("#dirtDiv");
          // pulls $clone from #userList and sticks to #dirtDiv     
          $clone.detach();
          $clone.appendTo(parent);
          $clone.data({"userIndex": userPlantIndex});
          if($clone.hasClass("cloneMe")){
              // accounts for changing positions when switching between divs
              var leftAdj =  (parseInt($clone.css("left")) - parent.offset().left - 6) + parent.scrollLeft();
              var topAdj = (parseInt($clone.css("top")) - parent.offset().top - 6) + parent.scrollTop();
              var snapLeft = function(){
                  var mod = leftAdj % gridBlock,
                      add = gridBlock - mod;                  
                  if(mod < gridBlock/2){
                      return -mod;
                  }
                  else{
                      return add;
                  }
                  
              },
                  snapTop = function(){
                  var mod = topAdj % gridBlock,
                      add = gridBlock - mod;                  
                  if(mod < gridBlock/2){
                      return -mod;
                  }
                  else{
                      return add;
                  }
                  
              };
              leftAdj += snapLeft();
              topAdj += snapTop();
              $clone.css({left: leftAdj, top: topAdj});
              // we don't want the draggabes acting like .cloneMe clones anymore
      	      //$clone.removeClass("cloneMe").addClass("drag");
      	      $clone.mousedown(function(){clickPlant($($clone).data("userIndex"))})
      	      if(copyOn){
      	          $clone.removeClass("cloneMe").addClass("copy");
      	          copyActivate($clone);   
      	      }
      	      else{
      	          $clone.removeClass("cloneMe").addClass("drag");
      	          dragActivate($clone);
      	      }
      	      $clone.draggable("option", "stack", ".ui-draggable");    	      
          }
          if($clone.hasClass("copy")){
      	      copyActivate($clone);
          }        
      }
      // this reinitializes the dropped elements as draggables, much less complex draggables
      if(inGarden!== true){  
         $clone.draggable("disable");     
         $clone.hide("highlight",500);
         setTimeout(function(){
             $clone.remove();
         },550);
      }
    },
  });
}

function resize($target, dia){
    //margin adjusts for change in size then slowly reverts to zero in time with growth
    var marginLeft = (dia - 2)/2 + "em",
        marginTop = (dia - 2)/2 + "em",
        borderRadius = dia/2;
           
    $target.css({"width": dia + "em", "height": dia + "em", "border-radius": borderRadius + "em","margin-left": 0 + "em" , "margin-top": 0 + "em", "background-color" : "16, 8,163,1"});         
}


// drag and drop settings

//takes frost date for zone and adjusts the planting date for each plant accordingly, returns as object
function calcStart(date, dayChange){
    var start = {};
    start.date = new Date(date.getTime());
    start.string = "";
    start.relative = null;
    // if dayChange is not an empty string then start date was input
    if(dayChange !== ""){
        //stores dayChange relative to frost date
        start.relative = dayChange;
        //sets start.date by account for day change from frost
        start.date.setDate(date.getDate() + (parseFloat(dayChange)));
        start.string = start.date.toString().slice(4,10);
    }
    else{
        //empty date
        start.date = null;
    } 
    return start;
};   
//displays companions and notes in div #compInfo 
function displayInfo(plant){
    //fill compInfo element with companions
    var companionsHTML = "";
    for (each in plant.companions){
        var companion = plant.companions[each];
        companionsHTML += companion.name + " : " + companion.benefits + "<br>" ;
    }
    document.getElementById("compInfo").innerHTML = companionsHTML;
    // plantNotes element with notes
    var notesArr = plant.notes.split("\n"),
        notesHTML = "";
    
    //!!!!!!!!!!!!!kill after rebooting database: from here
    if (notesArr.length == 1){
        notesArr = plant.notes.split("-");
    } 
    //!!!!!!!!!!!!!!!!! to here           
    for(var i = 0; i < notesArr.length; i++){
        notesHTML += notesArr[i] + "<br>"
    }
    document.getElementById("plantNotes").innerHTML = notesHTML;
};
//sets plant info to display on mousedown for userlist plants and draggables
function activateClickInfo(){
     $(".userIcon, .drag").mousedown(function(){
         displayInfo(userPlants[$(this).data("userIndex")]);
     });
}

    	/*
    	Garden Options
    	*/
	
	//adjusts #adjuster to compensate for #userlist and/or #compInfo
    	function adjustAdjuster(){

    	    var $headerAdjuster = $("#headerAdjuster"),
    	        $adjuster = $("#adjuster"),
    	        headerHeight = $("#header").height(),
    	        adjHeight = $(window).outerHeight() - headerHeight,   	     
                adjWidth = $(window).width(),
    	        userPageWidth = $("#userPage").outerWidth();
    	    
	// checks to see if #userPage is in view, adjusts adjHeight if so
    	    if(userPageOn === true){  	    
                adjWidth -= userPageWidth;
    	    }
            //checks to see if #info is in view, adjusts adjHeight if so
            if(compOn === true){
                adjHeight -= infoHeight;
            }
            $adjuster.css("top", headerHeight);
            $adjuster.outerWidth(adjWidth);
            $headerAdjuster.outerWidth(adjWidth);
            $adjuster.outerHeight(adjHeight); 
            $(".page").outerHeight(adjHeight);//.parent().outerHeight(adjHeight -  6);
            
        };
	// turns #info on andern/public_html/js/functions.js off
	function adjustUserPage(){
	
	    var $userList = $("#userList"),
	    	$userPage= $("#userPage"),
    	        userPageHeight = $(window).outerHeight();
    	      
	    //checks to see if #info is in view, adjusts adjHeight if so
            if(compOn === true){
                userPageHeight -= infoHeight;
            }       
            
            $userPage.outerHeight(userPageHeight);
            
            var listHeight = userPageHeight - ($("#userListLabel").outerHeight() + $("#gardenButtons").height());
            $userList.outerHeight(listHeight);// .parent().outerHeight(listHeight);
        
	}
	
	function compDisplay(bool){
	    
	    var $info = $("#info"),
	        $arrow = $("#infoArrowCon"),
	        hidePx =(- $info.outerHeight()) + "px";    
	    
	    if(bool !== true){
	        $("#infoArrow").addClass("rotate-one-eighty");
	    	$info.css({"bottom": "0px"});    	
	    	$arrow.css("top", ".05em");
		bool = true;
	    }
	    else{
	        $("#infoArrow").removeClass("rotate-one-eighty");
	 	$info.css({"bottom": hidePx});
	 	$arrow.css("top", "-2.5em");
	 	bool = false;
	    }
	    compOn = bool;
	    adjustAdjuster();
	    adjustUserPage();
	    return bool;
	}
	//runs once to set to offscreen so that it slides into view on transition
	// turns grid on or off                
	function gridDisplay(){
	   gridOn = divDisplay("grid", gridOn)
	};

	function divDisplay(divStr, bool){
	
	// divStr a string of the id of division, bool variable that tracks on/off
	    var div = document.getElementById(divStr);
	    if(bool !== false){
	        div.style.display = "none";
	        bool = false;
	    }
	    else{
	        div.style.display = "initial";
	        bool = true;
	    }
	    return bool;
	}
	
	
// !!! probably deprecated !!!