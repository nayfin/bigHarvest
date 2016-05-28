<?php
    // configuration
    require("../includes/config.php"); 
    //$userData = {};
    $UID = $_SESSION["id"];
    
    $stage = query("SELECT stage FROM users WHERE id = ?", $UID)[0]["stage"];
    if(!isset($stage) || $stage === "")
    {
        $stage = "new";
    }
    
    $zone = query("SELECT zone FROM users WHERE ID = ?", $UID)[0]["zone"];
    //dump($zone);
    if ($zone == false)
    {
        $zone = null;
    }
    
    render("startGarden.php",[ "title" => "Garden", "stage"=> $stage, "zone" => $zone]);
    exit;
?>
