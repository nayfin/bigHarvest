<?php

    // configuration
    require("../includes/config.php");
    
// if user reached page via GET (as by clicking a link or via redirect)
    if ($_SERVER["REQUEST_METHOD"] == "GET")//
    {
        // render form
        render("changePW.php", ["title" => "Change Password"]);
    }

    // else if user reached page via POST (as by submitting a form via POST)
    else if($_SERVER["REQUEST_METHOD"] == "POST")
    {   
        if (empty($_POST["password"]))
        {
            apologize("Missing Password");
        }
        else if ($_POST["password"] !== $_POST["confirmation"])
        {
            apologize("Password does not match confirmation");
        }
        else
        {
        // update password
        query("UPDATE users SET hash = ? WHERE id = ?", crypt($_POST["password"]), $_SESSION["id"]);
        
        // redirect to portfolio
        redirect("index.php");
        }
    }
    else
    {
        render("changePW.php", ["title" => "Change Password"]);
    }
?>
