<?php

    // configuration
    require("../includes/config.php"); 
    $u_history = query("SELECT symbol, transaction, shares, time, shares, price FROM history WHERE id = ?", $_SESSION["id"]);
    
    // Gives history all the values of $u_history to echo into the html
    render("history.php", ["title" => "History", "u_history" => $u_history]);

?>
