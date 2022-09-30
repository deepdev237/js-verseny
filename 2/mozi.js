categories = ['sci-fi', 'fantasztikus', 'történelmi', 'akció', 'dráma']
/*
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
*/

function fillCategories() {
	let likecategory_div = ""
	let dislikecategory_div = ""
	for (let i = 0; i < categories.length; i++) {
		const category = categories[i];
		let like_html = '<input type="checkbox" name="' + category + '" id="' + category + '">' + '<label for="' + category + '">' + category + '</label>'
		let dislike__html = '<input type="checkbox"  class="dislike" name="' + category + '" id="' + category + '">' + '<label for="' + category + '">' + category + '</label>'
		likecategory_div = likecategory_div + like_html
		dislikecategory_div = dislikecategory_div + dislike__html
	}
	//console.log(categories_div)
	document.getElementsByClassName("like")[0].getElementsByClassName("checkbox-container")[0].innerHTML = likecategory_div;
	document.getElementsByClassName("dislike")[0].getElementsByClassName("checkbox-container")[0].innerHTML = dislikecategory_div;
}

function getCheckBoxBool(checkbox) {
	return document.querySelector(checkbox).value;
}

function setFilms() {
	$.getJSON('filmek.json', (data) => {
		const markup = data.items
		  .map(item => `<li>${item.key}: ${item.value}</li>`)
		  .join('');
  
		const list = $('<ul />').html(markup);
  
		$showData.html(list);
  
		$raw.text(JSON.stringify(data, undefined, 2));
	  });

	/*
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
	*/
}

window.onload = function() {
    console.log('hey');

	fillCategories()
	setFilms()
};
