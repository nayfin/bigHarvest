/*
	globals.js
*/

//holds frost dates for all zones
var zoneFrostDays = {
    "h1" : {"first": "07/15/2016", "last" : "06/15/2016"},
    "h2" : {"first": "08/15/2016", "last" : "05/15/2016"},
    "h3" : {"first": "09/15/2016", "last" : "05/15/2016"},
    "h4" : {"first": "09/15/2016", "last" : "05/15/2016"},
    "h5" : {"first": "10/15/2016", "last" : "04/15/2016"},
    "h6" : {"first": "10/15/2016", "last" : "04/15/2016"},
    "h7" : {"first": "10/15/2016", "last" : "04/15/2016"},
    "h8" : {"first": "11/15/2016", "last" : "03/15/2016"},
    "h9" : {"first": "12/15/2016", "last" : "02/15/2016"},
    "h10" : {"first": "12/15/2016", "last" : "01/31/2016"},
    "h11" : {"first": null, "last" : null},
    "h12" : {"first": null, "last" : null},
    "h13" : {"first": null, "last" : null}
};  


// global variables used to associate plant info with plant icon, and other nice things.
var userPageOn = false,
    gridOn = true, // tells grid button that grid is on
    compOn, //
    tEntered = false,
    inGarden = false;
    //stage = "new";
    
// associate with style.fontSize         
var pxPerEm = 16, // used to convert em units to px. !! replace 16 with fontsize query
    gridBlock = pxPerEm/2;
// Plant variables

var dimensions = {},    
    hardiList = [],
    userPlants = [],
    userPlantIndex;
    //plant;

/*!!!!!  This will need to be picked by user when zone is picked!!!!!!*/
dimensions.rom = "metric";

/*
    sets dirtHeight and userListHeight to get current heights of #dirtDiv and #userList, respectively
    needed for slimscroll plugin
*/
dirtHeight = function(){ return $("#dirtDiv").outerHeight();}
userListHeight = function(){ return $("#userList").outerHeight();}

             
