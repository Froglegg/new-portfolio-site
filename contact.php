<!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Contact | Hayes Crowley</title>
    <meta name="description" content="Hayes Crowley - Web Developer, Technical Writer, Hiker Trash, Musician">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles/normalize.css">
    <link rel="stylesheet" href="styles/nav.css">
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="stylesheet" href="styles/contact.css">
    <link href="https://fonts.googleapis.com/css?family=Karla|Montserrat|Poppins&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/7b1798d8eb.js" async defer></script>
    <script src="scripts/nav.js" async defer></script>
</head>

<body>
    <nav>
        <div class="logo">
            <h4><a href="index.html">Hayes Crowley</a></h4>
        </div>
        <ul class="nav-links">
            <li><a href="index.html">About</a></li>
            <li><a href="cv.html">Resumé</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="contact.php">Contact</a></li>
        </ul>
        <div class="burger">
            <div class="line1">

            </div>
            <div class="line2">

            </div>
            <div class="line3">

            </div>

    </nav>
    <div class="hero">
        <h1>Contact</h1>
    </div>
    <article id="main">
    <?php echo "<p style='color:red'>$message</p>";

?>
        <div>

            <form id="contactform" action="contact.php" method="post">

                <p1>Name:<br/><input name="name" type="text" required /></p>

                    <p1>Company Name: <br/><input name="company_name" type="text" /></p>

                        <p1>Email: <br/><input name="email" type="email" required/></p>

                            <p1>Message: <br/><textarea name="comments" required/> </textarea>
                                </p>

                                <input type="submit" name="submit" value="Send!" />

            </form>

        </div>
        <?php
if ($_POST){
if (!filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL)){
$message="Please provide a correct email address";} else {
  $name = strip_tags($_POST['name']);
  $company_name = strip_tags($_POST['company_name']);
  $email = $_POST['email'];
  $comments = strip_tags($_POST['comments']);
  $to = 'hayescrowley@gmail.com';
  $subject = 'Contact from site visitor.';
  $body = "\n Name: " .$name. "\n\n Comments: " .$comments. "\n\n Email: " .$email;
  $headers = 'From: contact_form@hayescrowley.com';
  $headers = "MIME-Version: 1.0\r\n";
  $headers = "Content-Type: text/html; charset=utf-8\r\n";
  $headers= "X-Priority: 1\r\n";
  if (mail($to, $subject, $body, $headers)) {
  echo "<p1>Thanks $name for reaching out! Look for my response at $email soon! </p1>";
  } else {
  $message = 'Sorry an error occurred. Please try again later.';
  }
  }}
?>
    </article>
    <footer>
        <br>
        <a href="https://www.github.com/froglegg"><i class="fab fa-github fa-2x"></i></a>
        <p style="font-size:.8em;">Made with 100% organic, free-range code!</p>
    </footer>

</body>

</html>