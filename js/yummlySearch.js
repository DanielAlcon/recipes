var searchQuery;
var searchEndpoint = "http://api.yummly.com/v1/api/recipes?&q="
var recipes = [];
var searchText;

$("#searchButton").on("click", function(e){
	e.preventDefault();
	searchText = encodeURI($("#searchRecipe").val());
	searchRecipes();
	console.log("search button ok");
	console.log(searchText);
});

function searchOnEnter(e){
	e = e || window.event;
	if (e.keyCode == 13)
	{
		searchText = encodeURI($("#searchRecipe").val());
		searchRecipes();
		return false;
	}
	return true;
}

function ajaxRequest(url, func1, func2){
	$.ajax({
		url: url, 
		dataType:"json",
		headers: {
			"X-Yummly-App-ID": "4f8d5f5a",
			"X-Yummly-App-Key": "15ca836c85d71216be87d521578d34d8",				
		},
		beforeSend:func1,
	}).done(func2)
	.fail(failFunction);
}

function searchRecipes(){
	searchQuery = searchEndpoint + searchText;
	var searchLog = function(){
		console.log("searching recipe");
	};
	$('#searchResults').empty();
	recipes = [];
	if (searchText != "") {
		withPictures();
		includeIngredients();
		excludeIngredients();
		allergies();
		diets();
		includedCuisines();
		excludedCuisines();
		console.log(searchQuery);
		ajaxRequest(searchQuery, searchLog, successFunction);
	} else {
		alert ("We are searching random recipes since you didn't entered any recipe name");
	}
}

function failFunction(request, textStatus, errorThrown) {
	alert("An error occurred during your request: " + request.status + " " + textStatus + " " + errorThrown);
}

function successFunction(data){
	for (var i=0; i<data.matches.length; i++) {
		recipes.push(data.matches[i]);
	}
	appendRecipesList(recipes);
}

function appendRecipesList(recipes){
	for (var j=0; j<recipes.length; j++){
		// var ingredients = recipes[j].ingredients;
		var cookingTime = recipes[j].totalTimeInSeconds;
		cookingTime = timeToMinutesHours(cookingTime)
		var recipeCard = '<div class="recipe col-md-4"><h4 class="name">' + recipes[j].recipeName + '</h4><img src="' + recipes[j].smallImageUrls[0] + '"><p>Time: ' + cookingTime + '.</p> <a class="btn btn-info recipeInfo" href="#/" id="' + recipes[j].id +'"role="button">More info</a> </div>';
		$('#searchResults').append(recipeCard);
	}
	$("#searchRecipe").val("");
	loadjscssfile("./js/recipeMoreInfo.js", "js");
}

function timeToMinutesHours(timeInSeconds){
	var time = Math.floor(timeInSeconds / 60);
	if (time >= 60) {
		time = time / 60;
		if(time = 1) {
			return time + ' hour'
		} else {
			return time + ' hours';
		}
	} else {
		return time + ' minutes';
	}
}

function withPictures(){
	if ($('#pictures') != undefined) {
		searchQuery = searchQuery + '&requirePictures=true';
		console.log('searching only with pictures');
	} else {
		console.log('searching with or without pictures');
	}

}

function includeIngredients(){
	if ($('#included-ingredients').val() != ""){
  	// split by spaces  $("#searchquery").text().split(/ +/);
  	var ingredientsToInclude = $('#included-ingredients').val();
  	ingredientsToInclude = ingredientsToInclude.split(" ");
  	for (var i = 0; i<ingredientsToInclude.length; i++){
  		var addedIngredient = encodeURI(ingredientsToInclude[i]);
  		searchQuery = searchQuery + "&allowedIngredient[]=" + addedIngredient;
  	}
  }
  console.log('searching with the following ingredients' + ingredientsToInclude);
}

function excludeIngredients(){
	if ($('#excluded-ingredients').val() != ""){
		var ingredientsToExclude = $('#excluded-ingredients').val();
		ingredientsToExclude = ingredientsToExclude.split(" ");
		for (var i = 0; i<ingredientsToExclude.length; i++){
			var excludedIngredient = encodeURI(ingredientsToExclude[i]);
			searchQuery = searchQuery + "&excludedIngredient[]=" + excludedIngredient;
		}
	}
	console.log('searching without the following ingredients' + ingredientsToExclude);
}

function allergies() {
	var allergies = [];
	$('.allergies:checkbox:checked').each(function() {
		allergies.push($(this).val());
	});
	if (allergies != []) {
		for (var i = 0; i<allergies.length; i++){
			var allergy = allergies[i];
			searchQuery = searchQuery + "&allowedAllergy[]=" + allergy;
		}
	}
	console.log('searching for the following allergies' + allergies);
}

/*function cookingTime(){

}*/

function diets(){
	var diets =[];
	$('.diets:checkbox:checked').each(function() {
		diets.push($(this).val());
	});
	if (diets != []) {
		for (var i = 0; i<diets.length; i++){
			var diet = diets[i];
			searchQuery = searchQuery + "&allowedAllergy[]=" + diet;
		}
	}	
	console.log('searching for the following diets' + diets);
}

function includedCuisines(){
	var includedCuisines =[];
	$('.included-cuisines:checkbox:checked').each(function() {
		includedCuisines.push($(this).val());
	});
	if (includedCuisines != []) {
		for (var i = 0; i<includedCuisines.length; i++){
			var includedCuisine = includedCuisines[i];
			searchQuery = searchQuery + "&allowedCuisine[]=" + includedCuisine;
		}
	}	
	console.log('searching with the following cuisines' + includedCuisines);
}

function excludedCuisines(){
	var excludedCuisines =[];
	$('.excluded-cuisines:checkbox:checked').each(function() {
		excludedCuisines.push($(this).val());
	});
	if (excludedCuisines != []) {
		for (var i = 0; i<excludedCuisines.length; i++){
			var excludedCuisine = excludedCuisines[i];
			searchQuery = searchQuery + "&excludedCuisine[]=" + excludedCuisine;
		}
	}	
	console.log('searching without the following cuisines' + excludedCuisines);
}
