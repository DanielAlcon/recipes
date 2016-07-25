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
	var attributionHtml = recipe.attribution.html;
	var course = recipe.attributes.course; // hecho
	var cuisine = recipe.attributes.cuisine; // hecho
	var image = recipe.images[0].hostedLargeUrl; // hecho
	var ingredients = recipe.ingredientLines;
	var name = recipe.name; // hecho
	var rating = recipe.rating;
	var servings = recipe.yield;
	var sourceDisplayName = recipe.source.sourceDisplayName;
	var sourceRecipeUrl = recipe.source.sourceRecipeUrl;
	var sourceSiteUrl = recipe.source.sourceSiteUrl;
	var totalTime = recipe.totalTime; // hecho
	var star = "&#8902";

	var recipeInfo = '<div id="recipeInfo"><h2 id="recipeInfoName">' + 
	name + '</h2><img src="' + image + '"><p><span class="recipeInfoAttributes">' 
	+ cuisine +	'.<span></span> ' + servings + 
	' servings.</span><span> Cooking time: ' + totalTime + 
	'</span></p><ul class="recipeInfoIngredients"></ul>' + 
	'<'
	
	// cerrar el div, , 

	// hacer un for para append ingredients

	console.log('servings:'+ servings);
	console.log('time:' +totalTime);
	console.log('image' + image);
	console.log('name' + name);
	console.log('sourceDisplayName:' +sourceDisplayName);
	console.log('sourceSiteUrl' + sourceSiteUrl);
	console.log('sourceRecipeUrl' + sourceRecipeUrl);
	console.log('ingredients' +ingredients);
	console.log('attributionHtml' + attributionHtml);
	console.log('course'+course);
	console.log('cuisine'+cuisine);
	console.log('rating' + rating);
	//
	// $('#searchResults').append(recipeCard);
	
}

function failFunction(request, textStatus, errorThrown) {
	alert("An error occurred during your request: " + request.status + " " + 
		textStatus + " " + errorThrown);
}