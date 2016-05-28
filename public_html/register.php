<?php

    // configuration
    require("../includes/config.php");

    // if user reached page via GET (as by clicking a link or via redirect)
    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        // render form
        render("register_form.php", ["title" => "Register"]);
    }

    // else if user reached page via POST (as by submitting a form via POST)
    else if ($_SERVER["REQUEST_METHOD"] == "POST")
    {   
        
        if (empty($_POST["username"]))
        {
            apologize("Missing Username");
        }
        else if (empty($_POST["email"]))
        {
            apologize("Missing Email");
        }
        else if (empty($_POST["password"]))
        {
            apologize("Missing Password");
        }
        else if ($_POST["password"] !== $_POST["confirmation"])
        {
            apologize("Password does not match confirmation");
        }
        if (query("INSERT INTO users (username, hash, email) VALUES(?, ?, ?)", $_POST["username"], crypt($_POST["password"]), $_POST["email"]) !== false)
        {

            $rows = query("SELECT LAST_INSERT_ID() AS id");
            $id = $rows[0]["id"];
            $_SESSION["id"] = $id;

            // redirect to portfolio
            redirect("index.php");
        }
        else
        {
            apologize("Username already exists");
        }
    }

?>
