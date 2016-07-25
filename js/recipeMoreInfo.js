var recipeId = "";
var recipe;

$(".recipeInfo").on("click", function(e){
	e.preventDefault();
	recipeId = this.id;
	$('.recipe-more-info').empty();
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
	var searchRecipeAPI = 'http://api.yummly.com/v1/api/recipe/' + recipeId + '?';
	var searchLog = function(){
		console.log("searching" + searchRecipeAPI);
	};
	ajaxRequest(searchRecipeAPI, searchLog, successRecipeInfo);
}

function successRecipeInfo(data){
	recipe = data;
	appendRecipesList(recipe);
}

function appendRecipesList(recipe){

	var attributionHtml = recipe.attribution.html;
	var course = recipe.attributes.course;
	var cuisine = recipe.attributes.cuisine;
	var image = recipe.images[0].hostedLargeUrl;
	var ingredients = recipe.ingredientLines;
	var name = recipe.name;
	var rating = recipe.rating;
	var servings = recipe.yield;
	var sourceDisplayName = recipe.source.sourceDisplayName;
	var sourceRecipeUrl = recipe.source.sourceRecipeUrl;
	var sourceSiteUrl = recipe.source.sourceSiteUrl;
	var totalTime = recipe.totalTime;
	
	var recipeInfo = '<div id="recipeInfo"><h2 id="recipeInfoName">' + 
	name + '</h2><img src="' + image + '"><p><span class="recipeInfoAttributes">' 
	+ cuisine +	'.<span></span> ' + servings + 
	' servings.</span><span> Cooking time: ' + totalTime + 
	'</span><span>' + course + '</span></p><ul class="recipeInfoIngredients"></ul>' 
	+ '<p>' + rating + ' <span class="recipeInfoRating"></span></p>' +
	'<p>Source: ' + sourceDisplayName + '</p><a href="'+sourceRecipeUrl+
	'">' + sourceRecipeUrl + '</a></div>';
	
	$('.recipe-more-info').append(recipeInfo);

	for (var i = rating; i>0 ; i--){
		$('span.recipeInfoRating').append('<i class="fa fa-star" aria-hidden="true"></i>');
	}

	for (var j = 0; j<recipe.ingredientLines.length; j++) {
		$('.recipeInfoIngredients').append('<li>' + recipe.ingredientLines[j] + '</li>');
	}	
}

function failFunction(request, textStatus, errorThrown) {
	alert("An error occurred during your request: " + request.status + " " + 
		textStatus + " " + errorThrown);
}