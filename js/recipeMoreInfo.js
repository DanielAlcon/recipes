var recipeId = "";
var recipe;
var searchRecipeAPI = 'http://api.yummly.com/v1/api/recipe/';

$(".recipeInfo").on("click", function(e){
	e.preventDefault();
	recipeId = this.id;
	recipeMoreInfo();
});

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

function recipeMoreInfo(){
	searchRecipeAPI = searchRecipeAPI + recipeId + '?';
	var searchLog = function(){
		console.log("searching recipe");
	};
	ajaxRequest(searchRecipeAPI, searchLog, successRecipeInfo);
}

function successRecipeInfo(data){
	recipe = data;
	appendRecipesList(recipe);
}

function appendRecipesList(recipe){
	var servings = recipe.yield;
	var totalTime = recipe.totalTime;
	var image = recipe.images[0].hostedLargeUrl;
	var name = recipe.name;
	var sourceDisplayName = recipe.sourceDisplayName;
	var sourceSiteUrl = recipe.sourceSiteUrl;
	var sourceRecipeUrl = recipe.sourceRecipeUrl;
	var ingredients = recipe.ingredientLines;
	var attributionHtml = recipe.attribution.html;
	var course = recipe.attributes.course;
	var cuisine = recipe.attributes.cuisine;
	var rating = recipe.rating;

	console.log(servings);
	console.log(totalTime);
	console.log(image);
	console.log(name);
	console.log(sourceDisplayName);
	console.log(sourceSiteUrl);
	console.log(sourceRecipeUrl);
	console.log(ingredients);
	console.log(attributionHtml);
	console.log(course);
	console.log(cuisine);
	console.log(rating);

	// $('#searchResults').append(recipeCard);
	
}

function failFunction(request, textStatus, errorThrown) {
	alert("An error occurred during your request: " + request.status + " " + textStatus + " " + errorThrown);
}

//minified html
// '<h3 id="recipeName">name of the recipe</h3><img src="" id="picture"><ul id="ingredients">ingredients</ul>(nutritional values)cooking time<a href="#">link to source recipe. link to source and yummly api imgbutton to add to favourites (localstorage)</a>'