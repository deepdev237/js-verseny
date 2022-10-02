//filmek

//template
//movies.push({title: "", categories: ["", ""], relase_date: "", img: "", link: ""})

var movies = []
movies.push({title: "Mission: Impossible", categories: ["Akció", "Kaland", "Thriller"], relase_date: "1996. május 22.", img: "https://upload.wikimedia.org/wikipedia/en/e/e1/MissionImpossiblePoster.jpg", link: "https://www.imdb.com/title/tt0117060/"});
movies.push({title: "Ready Player One", categories: ["Akció", "Sci-Fi"], relase_date: "2018. március 29.", img: "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_.jpg", link: "https://www.imdb.com/title/tt1677720/"});
movies.push({title: "The Suicide Squad", categories: ["Vígjáték", "Fantasy"], relase_date: "2021. július 30.", img: "https://m.media-amazon.com/images/M/MV5BMWU4NDQ2NjEtNjhkOS00Y2MwLWJkODItZmJhZGE0MDU1OWM4XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg", link: "https://www.imdb.com/title/tt6334354/"});
movies.push({title: "Don't Look Up", categories: ["Vígjáték", "Politikai szatíra"], relase_date: "2021. december 5.", img: "https://fr.web.img3.acsta.net/pictures/21/11/16/17/11/5656957.jpg", link: "https://www.imdb.com/title/tt11286314/"});
movies.push({title: "Countdown", categories: ["Horror", "Thriller"], relase_date: "2019. október 25.", img: "https://m.media-amazon.com/images/M/MV5BODY3OGEyMTgtYTZjZi00Y2YzLWFjY2UtMjEwYWE1MjRkOTc4XkEyXkFqcGdeQXVyODQxMTI4MjM@._V1_.jpg", link: "https://www.imdb.com/title/tt10039344/"});
movies.push({title: "No Time to Die", categories: ["Akció", "Thriller"], relase_date: "2021. szeptember 30.", img: "https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg", link: "https://www.imdb.com/title/tt2382320/"});
movies.push({title: "Top Gun: Maverick", categories: ["Akció", "Dráma"], relase_date: "2022. május 26.", img: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_FMjpg_UX1000_.jpg", link: "https://www.imdb.com/title/tt1745960/"})
movies.push({title: "Buddy Games", categories: ["Vígjáték"], relase_date: "2019. február 10.", img: "https://m.media-amazon.com/images/M/MV5BNmE4ZTZmYjAtNGU2OS00NDFlLWI2OWYtMjYwZmVjOWJlOWE1XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg", link: "https://www.imdb.com/title/tt7070818/"})
movies.push({title: "Love in the Villa", categories: ["Vígjáték", "Romantikus"], relase_date: "2022. szeptember 1.", img: "https://m.media-amazon.com/images/M/MV5BMjI5NmZmYTUtM2MzZS00ZmI0LTgyMzAtMTgwNWMyY2NjYjVkXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg", link: "https://www.imdb.com/title/tt15463032/"})
movies.push({title: "Panama", categories: ["Akció", "Thriller"], relase_date: "2022.március 18.", img: "https://m.media-amazon.com/images/M/MV5BMWQ0Mjc5ZjAtZmRjNi00MGY4LWFlNDYtOGVlMjc3YjJiNTk4XkEyXkFqcGdeQXVyMTI3NDk1ODY0._V1_FMjpg_UX1000_.jpg", link: "https://www.imdb.com/title/tt4029412/"})
movies.push({title: "Fall", categories: ["Thriller"], relase_date: "2022.augusztus 12.", img: "https://m.media-amazon.com/images/M/MV5BNGI3MWYwYjItNzZhYi00ZWIzLTkyMzYtN2JmNjg3ODg1NTg4XkEyXkFqcGdeQXVyMTMwMDA5ODU3._V1_FMjpg_UX1000_.jpg", link: "https://www.imdb.com/title/tt15325794/"})
movies.push({title: "I Me Wed", categories: ["Vígjáték", "Romantikus"], relase_date: "2009. május 6.", img: "https://m.media-amazon.com/images/M/MV5BMTA5NTA5MTAyNjJeQTJeQWpwZ15BbWU3MDA2MTA1NTE@._V1_FMjpg_UX1000_.jpg", link: "https://www.imdb.com/title/tt0991164/"})
movies.push({title: "Girl in Progress", categories: ["Vígjáték", "Dráma"], relase_date: "2012. május 11.", img: "https://m.media-amazon.com/images/M/MV5BMjEyMzk3MTgwNV5BMl5BanBnXkFtZTcwMTU3Njg2Nw@@._V1_FMjpg_UX1000_.jpg", link: "https://www.imdb.com/title/tt1817676/"})
movies.push({title: "Demigod", categories: ["Horror"], relase_date: "2021. oktober 15.", img: "https://m.media-amazon.com/images/M/MV5BZDRhZWQzYTctNzQwNy00MjUzLWI1ZWUtNDdlNDQ5NWEzZDRlXkEyXkFqcGdeQXVyNDM1MDI0MjA@._V1_FMjpg_UX1000_.jpg", link: "https://www.imdb.com/title/tt12058582/"})
movies.push({title: "The Dunes", categories: ["Thriller"], relase_date: "2021. október 21.", img: "https://m.media-amazon.com/images/M/MV5BNjE3OTJiNmQtZjBhOC00MzA0LWE2YzktNGQxOWI5ODA4OGZjXkEyXkFqcGdeQXVyMTI4NDM0MjE@._V1_FMjpg_UX1000_.jpg", link: "https://www.imdb.com/title/tt6910678/"})

function GetLikedCategories(){
	let x = $('input[name="like"]:checked').map(function(){return $(this).val();}).get();
	return x
}

function GetDislikedCategories(){
	let x = $('input[name="dislike"]:checked').map(function(){return $(this).val();}).get();
	return x
}

function ShowAllMovies(){
	//összes film megjelenitese
	all_movie = '';

	for (let index = 0; index < movies.length; index++) {
		all_movie += '<div class="movie_card" data-href="'+ movies[index].link +'"><img src="'+ movies[index].img +'" alt=""><div class="img_shadow"></div><div class="movie_card-details"><b>'+ movies[index].title +'</b><p id="category">'+ movies[index].categories[0] +', '+ movies[index].categories[1] +'</p><p id="release_date">'+ movies[index].relase_date +'</p></div></div>';
		$(".movies").html(all_movie);
	}
}

var categories = []
for (let i = 0; i < movies.length; i++) {
	const movie = movies[i];

	for (let mc = 0; mc < movie.categories.length; mc++) {
		const category = movie.categories[mc];

		if (!categories.includes(category)) {
			categories.push(category)
		}
	}
}
console.log(categories)

/* for now (label:id problem)
function fillCategories(){
	//get categories from movies
	var categories = []
	for (let i = 0; i < movies.length; i++) {
		const movie = movies[i];

		for (let mc = 0; mc < movie.categories.length; mc++) {
			const category = movie.categories[mc];

			if (!categories.includes(category)) {
				categories.push(category)
			}
		}
	}

	let likecategory_div = ""
	let dislikecategory_div = ""
	for (let i = 0; i < categories.length; i++) {
		const category = categories[i];
		let like_html = '<input type="checkbox" name="' + category + '" id="like">' + '<label for="' + category + '">' + category + '</label>'
		let dislike__html = '<input type="checkbox" name="' + category + '" id="' + category + '">' + '<label for="' + category + '">' + category + '</label>'
		likecategory_div = likecategory_div + like_html
		dislikecategory_div = dislikecategory_div + dislike__html
	}

	$("div.like.div.checkbox-container").html(like_html);
	$("div.dislike.div.checkbox-container").html(like_html);
}
*/

lastLiked = '';
$('input[name="like"]').change(function() {
	let category = $('input[name="like"]:checked').attr('id')

	if (category === undefined) {
		console.log('undefinedundefined')
		category = lastLiked
	}

	if (category) {
		lastLiked = category
		let category_label = document.getElementById(category).labels[0].textContent
		let dislikes = GetDislikedCategories()
		for (let i = 0; i < dislikes.length; i++) {
			let disliked_category = dislikes[i];
			
			if (disliked_category == category_label) {
				let dislike_category = '#' + 'dislike_' + category
				$(dislike_category).prop( "checked", false );
			}
		}
	} else {
		console.log('no category')
	}
});

lastDisliked = '';
$('input[name="dislike"]').change(function() {
	let category = $('input[name="dislike"]:checked').attr('id')

	if (category === undefined) {
		console.log('undefinedundefined')
		category = lastDisliked
	}

	if (category) {
		lastDisliked = category
		let category_label = document.getElementById(category).labels[0].textContent
		let likes = GetLikedCategories()
		for (let i = 0; i < likes.length; i++) {
			let disliked_category = likes[i];
			console.log(disliked_category)
			console.log(category_label)
			if (disliked_category == category_label) {
				let like_category = '#' + category.slice(8)
				$(like_category).prop( "checked", false );
			}
		}
	} else {
		console.log('no category')
	}
});

//kivalasztott kategoriak megejelenitese
//felig mukodik. ha egy film mind a ket kategoriat tratalmazza, akkor 2x jelenik meg

$('#done').click(function(event) {
	event.preventDefault();

    let likes = GetLikedCategories();
	let dislikes = GetDislikedCategories();
	//console.log(dislikes)

	let filtered_movies = "";

	let movie;
	for (let index = 0; index < movies.length; index++) { // loop through movies
		movie = movies[index];
		let show_movie = true;

		for (let c = 0; c < movie.categories.length; c++) { // loop through the categories of the film
			let category = movie.categories[c];
			let liked = false
			let disliked = false

			for (let i = 0; i < likes.length; i++) { // loop through liked categories
				let liked_category = likes[i];
				if (category === liked_category) { // if the category is liked
					liked = true;
					break;
				}
			}
			for (let i = 0; i < dislikes.length; i++) { // loop through disliked categories
				let disliked_category = dislikes[i];
				console.log(category)
				console.log(disliked_category)
				if (category === disliked_category) { // if the category is disliked
					disliked = true;
					break;
				}
			}
			//console.log(dislikes.length)
			if (disliked) {
				show_movie = false
			} else if (liked) {
				show_movie = true
			} else if (likes.length == 0 && dislikes.length == 0) {
				show_movie = true
			}
		}

		if (show_movie) {
			let cats = ''
			
			for (let i = 0; i < movie.categories.length; i++) {
				const category = movie.categories[i];

				if ((i + 1) == movie.categories.length) { // if it's at the end
					cats += category
				} else {
					cats += category +', '
				}
				
			}
			filtered_movies += '<div class="movie_card" data-href="'+ movie.link +'"><img src="'+ movie.img +'" alt=""><div class="img_shadow"></div><div class="movie_card-details"><b>'+ movie.title +'</b><p id="category">'+ cats +'</p><p id="release_date">'+ movie.relase_date +'</p></div></div>';
		}
	}

	$(".movies").html(filtered_movies);
});

//link_megnyitása

jQuery(document).ready(function($) {
	$(".movie_card").click(function() {
		window.location = $(this).data("href");
	});

	//fillCategories()
	ShowAllMovies()
});