<?php
	if (isset($_GET['submit']))  // heeft HTML gegevens verzonden?
	{
		$string1 = $_GET['input1'];  //haal cijfer 1 uit de HTML
		$string2 = $_GET['input2'];
		$string3 = $string1 . " " . $string2;

		$test0 = "False";
		$test1 = "True";
		$test2 = "True";
		$test3 = "True";
		$test4 = "True";
		$test5 = "Valid email format";

		if (strlen($string3) == 1){
		$test0 = "True";}
		$strings = explode (" ", $string1);
		if (count($strings) > 1){
		$test1 = "False";}
		$strings = explode ("@", $string1);
		if (count($strings) != 2){
		$test2 = "False";}
		$strings = explode (".", $string1);
		if (count($strings) != 2){
		$test3 = "False";}
		if (strpos($string1, 'PHP') !== false){
		$test4 = str_replace('PHP', 'NodeJS', $string1);
		if (!filter_var($string1, FILTER_VALIDATE_EMAIL)) {
  	$test5 = "Invalid email format";
	}
		}
	}
	?>

	<!DOCTYPE html>
	<html lang="nl"><head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
			<meta charset="utf-8">
			<meta name="description" content="Scripting MD1A MD1B">
			<meta name="author" content="Ma">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link href="PHP%20String%20handler%20opdracht_bestanden/css.css" rel="stylesheet">
			<link rel="stylesheet" type="text/css" href="PHP%20String%20handler%20opdracht_bestanden/style.css">
			<title>PHP String handler opdracht</title>
		</head>
		 <body>
			<img src="PHP%20String%20handler%20opdracht_bestanden/Logo_blok.svg" alt="logo" width="30">
			<div class="wrapper">
				<form method="GET" action="stringhandler.php">
					<fieldset>
					 <legend>Stringhandler basis</legend>
					 <input type="text" name="input1" placeholder="string1" value="<?PHP echo $string1 ?>"><br>
					 <input type="text" name="input2" placeholder="string2" value="<?PHP echo $string2 ?>">
					 <input type="submit" id="submit" name="submit" value="submit">
				 </fieldset>
				</form>
				<hr>
			<ul>
						<li class="showSpaces">Ingevoerde string 1:   <?PHP echo $string1;?> </li>
						<li class="showSpaces">Ingevoerde string 2:   <?PHP echo $string2;?> </li>
						<li>String 1 getrimd trim():   <?PHP echo trim($string1);?> </li>
						<li>String 2 getrimd trim():   <?PHP echo trim($string2);?> </li>
						<li>String 3 is de concatenation van string 1 en string 2: <?PHP echo $test0;?> </li>
						<li>De lengte van string 3 is: 0  characters <?PHP echo $test1;?> </li>
						<li>Zoeken naar spaties. Er zit een spatie op positie <?PHP echo $test2;?> </li>
						<li>Zoeken naar @. Er zit een @ op positie <?PHP echo $test3;?> </li>
						<li>Zoeken naar "." . Er zit een  "."  op positie <?PHP echo $test4;?> </li>
						<li>Zoek naar substring <strong>"PHP"</strong> vervang dit door <strong>"NodeJS"</strong><?PHP echo $test4;?>  </li>
						<li>Wijzig de eerste letter van string 3 naar hoofdletter: <?PHP echo ucfirst($string3)?> </li>
						<li>Alles in hoofdletters:  <?PHP echo strtoupper($string3)?> </li>
				</ul>
				<hr>
				<li>Opdracht:<br> Stringhandler. Maak de PHP code voor <a href="http://schw.hosts.ma-cloud.nl/stringhandler/stringhandler.php">Stringhander</a><a>
				</a></li><li><a>Hoe moet jij inleveren?: <br>
						1) Link naar de werkende code in jouw portfoliomap bij Ma-cloud<br>
						2) Link naar jouw code bij GITHUB</a></li><a>
				<li>Bonus opdracht: maak PHP code waarmee jij controleert of een
	input een geldig e-mail adres zou kunnen zijn. Met JS controleren is
	niet toegestaan. <?PHP echo $test5;?></li>
				<li>Bonus opdracht: na submitten form, schrijf de eerder ingevoerde strings terug met PHP in de formulier invoer velden</li>

			</a></div><a>


	</a></body></html>
