**<h1>Address Form</h1>**
<p>code javascript permettant le preremplissage de formulaire d'adresse en utilisation les API gouv.fr</p>
<h2>Requirements</h2>
<h3>formulaire d'adresse</h3>
<strong>inputs:</strong><br>
<p>-input de saisie d'adresse<br>
-input de reference d'adresse (hidden)<br>
-input de no d'adresse (hidden)<br>
-input de nom de rue d'adresse (hidden)<br>
-input de latitude (hidden)<br>
-input de longitude (hidden)</p>
<p>-input de saisie de code Postal</p>
<p>-input de code ville (hidden)<br>
-input de saisie de ville</p>
<strong>Tags:</strong><br>
Tous les inputs doivent avoir un tag "data-name" renseigné avec une id unique:<br>
Les inputs non "hidden" (donc visibles) doivent également avoir un tag "data-auto" renseigné à false par default<br>
<br>
<strong>Constantes:</strong><br>
toutes les nom d'inputs unique doivent être reportés dans les constantes prévues à cet effet dans le fichier FormConst.js<br>
Ce fichiers regroupant toutes les constantes sert également à renseigné les noms des différentes classes des éléments de la form, les nom des tags, etc.
Les id & name des inputs restent donc libres, les classes sont libres également à partir du moment ou elles sont renseignées dans les fichiers de constantes.<br>
<br>
L'affichage des choix d'adresse s'appuient sur des divs géré par default avec bootstrap. <br>
Il y a donc un div parent avec une classe "dropdown-menu" qui se manage en ajoutant ou en supprimant la valeur "show".<br>
En respectant la methodologie (affichage/masquage par la classe) le choix des noms de classes reste libre, à partir du moment ou il est renseigné dans le fichier FormConst.js.
