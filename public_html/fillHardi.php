<?php

    require(__DIR__ . "/../includes/config.php");

    // ensure proper usage
    if (empty($_POST["hardi"]))
    {
        http_response_code(400); 
        exit;
    }
    // gets selected hardizone from $_POST, then inserts into users table
    $UID = $_SESSION["id"];
    $zone = $_POST["hardi"];
    $stage = $_POST["stage"];
       
    query("UPDATE users SET zone = ?, stage = ? WHERE id = ?", $zone, $stage, $UID);
    // gets array of plants and properties from database
    $plants = [];
    $plants = query("SELECT * FROM plants WHERE $zone = 1");
    foreach($plants as &$plant) // & needed to dereference $plant
    {
       $id = $plant["id"];
       $companions = query("SELECT * FROM companions WHERE idA = $id or idB = $id");
      
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
       
       $plant["companions"] = $companions;
    }
    //dump($plant);
    
    //returns pretty printed $plants to .post call
    if($plants !== false)
    {
        // output places as JSON (pretty-printed for debugging convenience)
        header("Content-type: application/json");
        print(json_encode($plants, JSON_PRETTY_PRINT));
    }
    // shouldn't need
    else
    {
        apologize("\$plants returned false");
    }
    
?>