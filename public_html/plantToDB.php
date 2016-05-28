<?php

    // configuration
    require("../includes/config.php");
     
    // looks for POSTed data
    if($_SERVER["REQUEST_METHOD"]=="POST")
    {   
    //dump($_POST);            
        $id = $_SESSION["id"];//probably come in handy
        // arry of hardizones: stores bool as 0 or 1, indicating if hardizone is cultivable
        $hardizone = []; 
        $hardizones = 13; // total hardizones
        // formats two parts of start date into one string for each respective start date
        $inStart = $_POST["inNumber"];              
        $outStart = $_POST["outNumber"];    
        $fallStart = $_POST["fallNumber"];  
        //stores selected companion plants to add object
        $companions = $_POST["companions"];
        //defaults all hardizone[] to false
        for($z = 1; $z <= $hardizones; $z++)
        {
            $hardizone["H".$z] = 0;
        }
        
        //sets appropriate ones to true
        for($z = 1; $z <= $hardizones; $z++){
            if(isset($_POST["H".$z])){
                $hardizone["H".$z] = $_POST["H".$z];
            }
        }        

        if (query("INSERT INTO plants (name, imgSrc, spacingStandard, spacingMetric, inStart, outStart, fallStart, daycount, sun, metricWater, standardWater, notes, H1, H2,H3, H4,H5,H6,H7,H8,H9,H10,H11,H12,H13) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", $_POST["name"], $_POST["imgSrc"], $_POST["spacingStandard"], $_POST["spacingMetric"], $inStart, $outStart, $fallStart, $_POST["daycount"],$_POST["sun"], $_POST["metricWater"], $_POST["standardWater"], $_POST["notes"], $hardizone["H1"], $hardizone["H2"], $hardizone["H3"], $hardizone["H4"], $hardizone["H5"], $hardizone["H6"], $hardizone["H7"], $hardizone["H8"], $hardizone["H9"], $hardizone["H10"], $hardizone["H11"], $hardizone["H12"], $hardizone["H13"]) !== false)
        {   
            //get id of last plant inserted
            $plantId = query("SELECT MAX(id) FROM plants")[0]["MAX(id)"];
            
            foreach($companions as &$companion)
            {   
            	if(isset($companion['id']))
                {	
                    //$companion['name'];
                    $companion['name'] = query("SELECT name FROM plants WHERE id = ?", $companion["id"])[0]['name'];
                    if (query("INSERT INTO companions (idA, nameA, idB, nameB, benefits) VALUES(?,?,?,?,?)",$plantId, $_POST["name"], $companion["id"],$companion["name"], $companion["benefits"]) === false)
                        {
                            apologize("couldn't insert into DB");
                        }
                }
            }
            //dump($companions);
            redirect("/");
        }
        else
        {
            apologize("Plant Data not inserted into DB correctly");
        }       
    }
    else
    {   
        //get list of all plants to offer as companions
        /*
            -change to only list plants that grow in selected hardizones
        */
        $companions = query("SELECT name, id, imgSrc FROM plants");
        
        //send list to newPlant
        render("newPlant.php",["title" => "New Plant","companions" => $companions]);
    }
?>