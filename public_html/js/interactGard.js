var resetD,
    plant, // associates plant object with id of target
    attributes,
    dia,
    style,
    target,
    copyOn = false;

//fires on every click of plant                    
/**/
function clickPlant(index){
    userPlantIndex = index;
    associatePlant(index);
    // if target is div and not child of div
    if(plant === undefined){
        console.log("index = " + userPlantIndex);
        console.log("plant == undefined");
    }   
    displayInfo(plant);
}

// associates var plant with plants.plant                   
function associatePlant(index){
    plant = userPlants[index];
    return plant;
}

function shiftPressed(event){
    if(event.shiftKey){
        copyControl(false);
    }
    else{
        copyControl(true);
    }
}
function copyControl(bool) {
    var $button = $("#copyButton");
    if(bool === true){
        //copyDeactivate();
        var $elements = $(".copy");
        copyDeactivate();
 
        setTimeout(function(){
            $elements.removeClass("copy");
            $elements.addClass("drag");
            dragActivate($(".drag"));
        }, 100);
        $button.css("backgroundColor","#66BBAE");   
        copyOn = false;
    }
    else{
        
        var $elements = $(".drag");
        dragDeactivate();
        setTimeout(function(){
            $elements.addClass("copy");
            $elements.removeClass("drag");
            copyActivate($(".copy"));
        }, 200);
        $button.css("backgroundColor","#CAE8DC");
        copyOn = true;
    }
}
/*
//sets data-x, -y to account for offset, defaults to centered on pageX, Y
function setDataToOffset(target, event, offsetX, offsetY){
    //check for offset value, default to page offset
    if(offsetX === undefined || offsetY === undefined){
        var offsetX = (dia * pxPerEm / 2),
            offsetY = (dia * pxPerEm / 2); 
    };
    
    var x = (event.pageX - offsetX),
        y = (event.pageY - offsetY);
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

//aligns drops to a grid pattern
function setToGrid(target, dataX, dataY){  
                                    
    var gridSpacer = pxPerEm/2, // vertical and horizantal space between grid points
        moduloX = dataX % gridSpacer, // determines if snap left or right
        moduloY = dataY % gridSpacer, // determines if snap up or down
        adjustX, // distances to snap
        adjustY;
    // snaps horizontally
    if(moduloX > (gridSpacer/2)){
        adjustX = gridSpacer - moduloX;
        dataX += adjustX ;
    }
    else{
        dataX -= moduloX;
    }
    // snaps vertically
    if(moduloY > (gridSpacer/2)){
        adjustY = gridSpacer - moduloY;
        dataY += adjustY ;
    }
    else{
        dataY -= moduloY;
    }
    target.setAttribute('data-x', dataX);
    target.setAttribute('data-y', dataY);
    //reset targets x, y translate coordinates
    style.webkitTransform =
        style.transform =
    'translate(' + dataX + 'px, ' + dataY + 'px)';  

function dragMoveListener (event) {
    //prevents strange event.d coordinates from screwing everything up
    //need to find better way of doing this
    if (resetD < 1){
        event.dx = 0,
        event.dy = 0;
        resetD++;
    }
    //var target = event.target,
    //keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    //translate the element
    target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

    //update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}
//resizes icon

function resize(event, borRad, dia, target){
    //margin adjusts for change in size then slowly reverts to zero in time with growth
    style.marginLeft = (dia - 2)/2 + "em";
    style.marginTop = (dia - 2)/2 + "em";

   // Not exactly sure why I need a setTimeout here but transitions do not work without it.
    
    //sets height and width to plant values
    setTimeout(function(){
        style.borderRadius = borRad + "em";
        style.width = dia + "em";
        style.height = dia + "em";
        style.marginLeft = "0em";
        style.marginTop = "0em"; 
        //changes size of image to match div
        //will use later to add infographics to empty space
        style = target.children[0].style;
        style.width = "inherit";
        style.height = "inherit";
    },1);
}

// details how to interact with plant icons in list               
interact('#dirtSvg').dropzone({
    ondragenter: function(event){
    //if not already in garden
        if(target.inGarden !== true){
            //0 opacity indicates that icon has been dropped outside garden
            if(target.style.opacity !== "0"){ 
                //adds 1 to number of plants sown 
                plant.sown++;
              
                var sownClass = "#" + (parseFloat(target.classList[1])) + "Sown";
                
            $(sownClass).html(plant.sown);
                target.inGarden = true;
                //event.relatedTarget.style.backgroundColor = "rgba(16, 202,163,0.8)";
                target.style.opacity = "1";

            }
        }
    },
    ondragleave: function(event){
        if(target.style.opacity !== "0"){
            plant.sown--;
            var sownClass = "#" + (parseFloat(target.classList[1])) + "Sown";
            
            $(sownClass).html(plant.sown);
        }
        target.inGarden = false;
        //target.style.backgroundColor = "rgba(16, 202,163,0.2)";
        target.style.opacity = "0.4";
    },
});
interact("#paletteDiv").dropzone({
    ondragenter: function(event){
        target.inPalette = true;
        event.relatedTarget.style.backgroundColor = "rgba(16, 202,163,0.5)";
    },
    ondragleave: function(event){
        target.inPalette = false;
        event.relatedTarget.style.backgroundColor = "rgba(16, 202,163,1)";
    }
});

interact('.copy')
    .on('down', function(event){
        target = event.currentTarget;
        target.inDzone = false;
        //clickPlant(event);
        var clone = event.currentTarget.cloneNode(true);

        
    //    clone.className = "plantDrag";
    //    clone.classList.add("clone");
        $(clone).removeClass("iconDiv userIcon").addClass("clone");
        if(copyOn === true){
            clone.classList.add("copy");
        }
        style = clone.style;
        style.left = 0;
        style.top = 0;
        setDataToOffset(clone, event);
        document.body.appendChild(clone);
        var x = clone.getAttribute('data-x');
            y = clone.getAttribute('data-y');
        style.webkitTransform =
            style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
        var borderRad = plant.borderRad;
        //resizes icon to correct diameter, positions img and infographics
        //resize(event, borderRad, dia, clone);
        resetD = 0;
    }); 

interact('.iconDiv')
    .on('down', function(event){
        target = event.currentTarget;
        target.inDzone = false;
        clickPlant(event);
        var clone = event.currentTarget.cloneNode(true);
        $(clone).addClass("clone plantDrag").removeClass("iconDiv");
        if(copyOn === true){
            clone.classList.add("copy");
        }
        style = clone.style;
        style.left = 0;
        style.top = 0;
        setDataToOffset(clone,event);
        document.body.appendChild(clone);
        var x = clone.getAttribute('data-x');
            y = clone.getAttribute('data-y');
        style.webkitTransform =
            style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
        var borderRad = plant.borderRad;
        //resizes icon to correct diameter, positions img and infographics
        resize(event, borderRad, dia, clone);
        resetD = 0;
    });           
    // details how to interact with icons after being pulled from list
interact('.inGarden');
interact('.clone')                    
    .draggable({
        autoScroll: true,
        onmove: dragMoveListener, 
        onend: function(event) {
            style = target.style;
            var padding = 1 * pxPerEm,    // used to account for padding while calculating offset
                outline = 0.4 * pxPerEm,
                offsetX,
                offsetY;  // accounts for outline ...
            //if target is dropped in garden: append to dirtDiv, calibrate offsets
            if(target.inUserList === true){
                UserList.appendChild(target);
            }
            else if(target.inGarden === true) { 
                var dirtSvg = document.getElementById("dirtSvg");
                dirtDiv.appendChild(target);
                offsetX = padding + outline - dirtDiv.scrollLeft, // accounts for padding and scrollLeft
                offsetY = header.offsetHeight + outline - dirtDiv.scrollTop;
            }
            // if target dropped in palette: append, calibrate offsets
            else if(target.inPalette === true) {
                paletteDiv.appendChild(target);
                //offset for size of other divisions, set data x y, set to grid
                offsetX = dirtDiv.offsetWidth + padding + outline,
                offsetY = header.offsetHeight + outline;
            }
            // target drop outside a dropzone: fades, waits .5 sec, then deleted
            else{
            // target dropped outside dropzone, fades, number of plants sown drops by one                
                document.body.removeChild(event.target);                                
                
            }
            var dataX = (parseFloat(target.getAttribute('data-x'))) - offsetX,
                dataY = (parseFloat(target.getAttribute('data-y'))) - offsetY; 
            setToGrid(target, dataX, dataY);
            target.classList.remove("clone");    
        },
    })
    .on('down', function(event){ 
        clickPlant(event);    
    })                                   
    .on('move', function(event){
        var interaction = event.interaction;
        if(interaction.pointerIsDown && !interaction.interacting()){
            target = event.currentTarget;                      
            interaction.start({name:'drag'}, event.interactable, target);
        }
    })
interact('.plantDrag')                    
    .draggable({
        autoScroll: true,
        onstart: function(event){
                setDataToOffset(event.target, event);
                document.body.appendChild(event.target);
        },
        onmove: dragMoveListener, 
        onend: function(event) {
            style = target.style;
            var padding = 1 * pxPerEm,    // used to account for padding while calculating offset
                outline = 0.4 * pxPerEm,
                offsetX,
                offsetY;  // accounts for outline ...
            //if target is dropped in garden: append to dirtDiv, calibrate offsets
            if(target.inGarden === true) { 
                dirtDiv.appendChild(target);
                offsetX = padding + outline - dirtDiv.scrollLeft, // accounts for padding and scrollLeft
                offsetY = header.offsetHeight + outline - dirtDiv.scrollTop;
            }
            // if target dropped in palette: append to paletteDiv, calibrate offsets
            else if(target.inPalette === true) {
                paletteDiv.appendChild(target);
                //offset for size of other divisions, set data x y, set to grid
                offsetX = dirtDiv.offsetWidth + padding + outline,
                offsetY = header.offsetHeight + outline;
            }
            // target drop outside a dropzone: fades, waits .5 sec, then deleted
            else{
            // target dropped outside dropzone, deleted
               
                document.body.removeChild(event.target);                                
            }
            var dataX = (parseFloat(target.getAttribute('data-x'))) - offsetX,
                dataY = (parseFloat(target.getAttribute('data-y'))) - offsetY; 
            setToGrid(target, dataX, dataY);
        }
    })
    .on('down', function(event){
        target = event.currentTarget; 
        clickPlant(event);    
    })
    */