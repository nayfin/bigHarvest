<?php

    require(__DIR__ . "/../includes/config.php");
    /*
    // ensure proper usage
    if (empty($_POST))
    {
        http_response_code(400); 
        exit;
    }
    */
    if (!isset($_POST))
    {
        http_response_code(400); 
        exit;
    }
    $UID = $_SESSION["id"];// user Id
                                //!!! probably delete below
    if((isset($_POST["plants"]) || empty($_POST["plants"])) && isset($_POST["stage"]))
    {   
       $stage = $_POST["stage"];
       $userPlants = $_POST["plants"];
       query("UPDATE users SET stage = ? WHERE id = ? ", $stage, $UID);
       //clears previous user entries  before replacing with new entries to avoid redundant entries
       query("DELETE FROM userLists WHERE UID = $UID");

       foreach($userPlants as $uPlant)
       {   
         if(!empty($uPlant["name"])){
            // format $uPlant.value so DB can accept
            $name = $uPlant["name"];
            $uPlantID = (int)$uPlant["uPlantID"];
            if (isset($uPlant["oPlantID"])){
                $oPlantID = (int)$uPlant["oPlantID"];
            }
            else{
                $oPlantID = (int)$uPlant["id"];
            }
            $imgSrc = $uPlant["src"];
            $daycount = (int)$uPlant["daycount"];
            $notes = $uPlant["notes"];
            $sun = $uPlant["sun"];
            $soil = $uPlant["soil"];
            $inStart = $uPlant["start"]["in"]["relative"];
            $outStart = $uPlant["start"]["out"]["relative"];
            $fallStart = $uPlant["start"]["fall"]["relative"];
            $spacingMetric = (int)$uPlant["spacing"]["metric"];
            $spacingStandard = (int)$uPlant["spacing"]["standard"];
            $metricWater = $uPlant["metricWater"];
            $standardWater = $uPlant["standardWater"];
            /*TODO: work out RuleOfMeasure
            $rom = $uPlant["spacing"]["rom"];
            */
            query("INSERT INTO userLists (UID, name, uPlantID, oPlantID, imgSrc, spacingMetric, spacingStandard, metricWater, standardWater, daycount, notes, sun, soil, inStart, outStart, fallStart) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", $UID, $name, $uPlantID, $oPlantID, $imgSrc, $spacingMetric, $spacingStandard, $metricWater, $standardWater, $daycount,$notes, $sun, $soil, $inStart, $outStart, $fallStart);
         }
       }     
    }
    
    elseif(isset($_POST["load"]))
    {   
        $userPlants = query("SELECT * FROM userLists WHERE UID = ?", $UID);
        
        foreach($userPlants as &$plant) // & needed to dereference $plant
	{
	    $id = $plant["oPlantID"];
	    $companions = query("SELECT * FROM companions WHERE idA = $id or idB = $id");
	    if(isset($companions))
	    {   
	        foreach($companions as &$companion)
	        {
	            if($companion["idA"] === $id)
	            {
	                $companion["name"] = $companion["nameB"];
	            }
	            else
	            {
	                $companion["name"] = $companion ["nameA"];
	            }
	        }
	    }   
	    $plant["companions"] = $companions;
	}
	
        // Kill this after successful insert into database
        // output places as JSON (pretty-printed for debugging convenience)
        header("Content-type: application/json");
        print(json_encode($userPlants, JSON_PRETTY_PRINT));   
    }
/*
    else
    {
        print(json_encode($_POST, JSON_PRETTY_PRINT));   
        // go to select plants from hardi plants screen  
       // apologize("You didn't select any plants!?");
    }
    */
?>