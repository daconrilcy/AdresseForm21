<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome!</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22><text y=%221.2em%22 font-size=%2296%22>⚫️</text></svg>">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
	    <link href="style.css" rel="stylesheet">
    </head>
    <body>

		<div class="container">
            <h1>Hello - test page</h1>
			<p> test formulaire adresse</p>
			<form action="" method="POST">
				<div class="mb-3">
                    <div class="form-group mb-3" id="divpays">
                        <label for="inputpays" class="form-label"> Pays</label>
                        <input type="text" id="inputpays" name="inputpays" class="form-control" placeholder="Indiquer le pays">
                    </div>
                    <div class="form-group mb-3" id="divadress">
                        <label for="inputaddress" class="form-label"> Adresse</label>
                        <input type="text"  id="inputaddress" name="inputaddress" class="form-control" placeholder="Adresse" data-name="inputaddress" data-auto=false>
                        <label hidden for="inputrefaddress"></label>
                        <input type="text" id="inputrefaddress" name="inputrefaddress" data-name="inputrefaddress" hidden>
                        <label hidden for="inputnoaddress"></label>
                        <input type="text" id="inputnoaddress" name="inputnoaddress" data-name="inputnoaddress" hidden>
                        <label hidden for="inputstreetaddress"></label>
                        <input type="text" id="inputstreetaddress" name="inputstreetaddress" data-name="inputstreetaddress" hidden>
                        <label hidden for="inputlataddress"></label>
                        <input type="text" id="inputlataddress" name="inputlataddress" data-name="inputlataddress" hidden>
                        <label hidden for="inputlonaddress"></label>
                        <input type="text" id="inputlonaddress" name="inputlonaddress" data-name="inputlonaddress" hidden>
                    </div>
					<div class="form-group mb-3" id="divzipcode">
						<label for="inputzipcode" class="form-label"> Code postal</label>
						<input type="text" name="inputzipcode" class="form-control" placeholder="Code Postal" id="inputzipcode" data-name="inputzipcode" data-auto=false>
						<div style="display: none; color: #f55" id="error_msg_zipcode"></div>
					</div>
					<div class="form-group mb-3" id="divcity">
                        <label for="inputcity" class="form-label"> Ville</label>
                        <input type="text" id="inputcity" name="inputcity" class="form-control" placeholder="Ville" data-name="inputcity" data-auto=false>
                        <label for="inputcodecity" class="form-label" hidden></label>
                        <input type="text" name="inputcodecity" id="inputcodecity" data-name="inputcodecity" hidden>
					</div>
					<div class="mb-3">
						<button type="submit" class="btn btn-primary">soumettre</button>
					</div>
				</div>
			</form>	
		</div>

		<script
				src="https://code.jquery.com/jquery-3.6.0.js"
				integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
				crossorigin="anonymous">
		</script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" 
				integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" 
				crossorigin="anonymous">
		</script>
       <!-- <script type="module" src="src/js/script.js"></script> -->
        <script type="module" src="dist/assets/js/formaddress.js"></script>
	</body>
</html>
