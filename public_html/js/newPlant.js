/*
-add companions.companion to a HTML list instead of current display

// associates var plant with plant.[                   
function associatePlant(divId){
    plant = plants[divId];
    return plant;
}

*/
// HTML for plant divs to be formatted for rendering plants 
var plantHTML = "<div id='%id%hl' class='col-sm-4 col-xs-3 hardiPlant'>" + //%name% might be useful in there later
                    "<table>" +
                        "<tr class='row1' >" +                   
                            "<td colspan='2'>%name%</td><td>Daycount: %daycount%</td><td>Start:</td>" +
                        "</tr>" +   
                        "<tr class='row2'>" +    
                            "<td colspan='2' rowspan='3'><div id='%id%Image' class='plantIcon'><img src='%src%'></div></td><td>Sun: %sun%</td><td>%inStart%</td>" +
                        "</tr>" +
                        "<tr class='row3'>" +
                            "<td>Water: %water%</td><td>%outStart%</td>" + 
                        "</tr>" + 
                        "<tr class='row4'>" +
                            "<td>%soilType%</td><td>%fallStart%</td>" + 
                        "</tr>" +
                    "</table>" +
                "</div>";
             
/*
formats plantHTML with proper attributes
    list: array of plant data to turn into html elements
    appendTo: element to append html
*/
function plantListHTML(list, appendTo){
    //console.log(list);
    for (each in list){
     //   console.log(list[each]);
        var plant = list[each],
            HTML;
    
        HTML = plantHTML.replaceAll("%name%",plant["name"])
            .replaceAll("%src%", plant["src"])
            .replaceAll("%id%", plant["id"])
            .replaceAll("%sun%", plant["sun"])
            .replaceAll("%water%", plant["water"])
            .replaceAll("%daycount%", plant["daycount"])  
    // !!! Here is where to mess with soil type for icon     
            .replaceAll("%soilType%", "Soil Type");
        for(start in plant["start"]){
            // if start date exists
            if(plant["start"][start]["string"] !== ""){   
                //replace placeholder with start info
                HTML = HTML.replaceAll("%" + start + "Start%", start + " : " + plant["start"][start]["string"] + "<br>");  
            }
            // else replace with empty string
            else{
                HTML = HTML.replaceAll("%" + start + "Start%", "");  
            }
        }    
     
    list[each].HTML = HTML; //adds string of the HTML that lays out each list division to the plant object 
     //   console.log(list[each]);
    appendTo.append(list[each].HTML);
    }                             
};
//creates plant objects from DB data
function definePlant(plantData){
    
    var info = {};
    info["name"] = plantData["name"];
    //var id = 
    info["id"] = function(){
        // returns correct var r to id depending on which DB data set it is reading
        var r;  
        if(plantData["id"] != undefined){
            r = plantData["id"];
        }       
        else if(plantData["uPlantID"] != undefined){
            r = plantData["uPlantID"];
        }
        return r;
    }();
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
    info["companions"] = plantData["companions"];
    info["daycount"] = plantData["daycount"];
    //get first and last frost dates for zone, used to calculate start dates for plants
    var lastFrost = new Date(userFrostDates["last"]),
        firstFrost = new Date(userFrostDates["first"]);info["start"] = {};
    info["start"]["in"] = calcStart(lastFrost, plantData["inStart"]);
    info["start"]["out"] = calcStart(lastFrost, plantData["outStart"]);
    info["start"]["fall"] = calcStart(firstFrost, plantData["fallStart"]);   
    info["water"] = "";  // figure something out for this
    info["soil"] = "";  //figure something out for this
    info["HTML"] = "";  //initializes, filled in by hardiListHTML() 
    info["sown"] = 0;
    info["notes"] = plantData["notes"];
    return info;
};
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
        start.string = start.date.toString().slice(0,10);
    }
    else{
        //empty date
        start.date = null;
    } 
 // console.log(start);
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
//kill after rebooting database: from here
    if (notesArr.length == 1){
        notesArr = plant.notes.split("-");
    } 
// to here           
    for(var i = 0; i < notesArr.length; i++){
        notesHTML += notesArr[i] + "<br>"
    }
    document.getElementById("plantNotes").innerHTML = notesHTML;
};
