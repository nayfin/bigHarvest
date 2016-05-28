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
   
    if(isset($_POST["stage"]) && isset($_POST["rom"]))
    {   
    
        $stage = $_POST["stage"];
        $metric = $_POST["metric"];
        $standard = $_POST["standard"];
        // update DB with garden dimensions
        query("UPDATE users SET stage = ?, rom = ?, metricX = ?, metricY = ? WHERE id = ? ", $stage, "metric", (int)$metric["x"], (int)$metric["y"], $UID);
       
    }
    
    elseif(isset($_POST["load"]))
    {   
        $rom = query("SELECT rom FROM users WHERE id = ?", $UID)[0]["rom"];
        if($rom !== false)
        {   
            $dimensions = query("SELECT metricX, metricY, standardX, standardY FROM users WHERE id = ?", $UID)[0];
            if($dimensions !== false){
                $dimensions["rom"] = $rom;
            }
            else{
            	apologize("Could not get dimensions from database");
            } 
        }
        else{
            apologize("Could not get rom from database");
        } 
        
        
        // Kill this after successful insert into database
        // output places as JSON (pretty-printed for debugging convenience)
        header("Content-type: application/json");
        print(json_encode($dimensions, JSON_PRETTY_PRINT));   
    }

    else
    {
        header("Content-type: application/json");
        print(json_encode($_POST, JSON_PRETTY_PRINT));   
        // go to select plants from hardi plants screen  
       // apologize("You didn't select any plants!?");
    }
    
?>