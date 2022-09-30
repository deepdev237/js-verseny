categories = ['sci-fi', 'fantasztikus', 'történelmi', 'akció', 'dráma']
films = {}

$.getJSON( "ajax/test.json", function( data ) {
	var items = [];
	$.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	});
	
	$( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	}).appendTo( "body" );
});

function fillCategories() {
	let categories_div = ""
	for (let i = 0; i < categories.length; i++) {
		const category = categories[i];
		let string = "<input type=checkbox id=" + category +  "name=" + category + " value=" + category + "><label for=" + category + ">" + category + "</label><br>";
		categories_div = categories_div + string
	}
	//console.log(categories_div)
	document.getElementById('categories').innerHTML = categories_div;
}

function getCheckBoxBool(checkbox) {
	return document.querySelector(checkbox).value;
}

function setFilms() {
	for (let i = 0; i < films.length; i++) {
		const name = films[i];
		const img_src = films[i]["img"]
		films[i].forEach(element => {
			if (element != "img") {
				if (getCheckBoxBool(element)) {
					console.log(element)
				}
			}
		});
	}
}

window.onload = function() {
    console.log('hey');

	fillCategories()
};
