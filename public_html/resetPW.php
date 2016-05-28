<?php

    // configuration
    //require("../includes/config.php"); 
    require("../includes/constants.php");
    require("../includes/functions.php");
    
    if($_SERVER["REQUEST_METHOD"]=="POST")
    {   
        require_once("libphp-phpmailer/class.phpmailer.php");
        $to = $_POST["email"];
        $hash = query("SELECT hash FROM users WHERE email = ?", $to)[0]["hash"];
        if(empty($hash))
        {
            apologize("couldn't find that account email, did you enter it in correctly?");
        }
        else
        {
          
            $mail = new PHPMailer();
            $mail->IsSMTP();
            $mail->Host = "smtp.charter.net";
            $mail->SetFrom("banosdelfuturo@gmail.com");
            $mail->AddAddress("$to");
            $mail->Subject = "CS50 Finance Password Reset";
            $mail->Body = "<html><body>Click here to reset your password</body></html>";
            if($mail->Send() === false)
            {
                apologize("sorry email failed, probably your fault");
            }
            else
            {
                redirect("index.php");
            }
        }
    }
    else 
    {
        render("resetPW.php", ["title" => "Change Password"]);
    }
?>
