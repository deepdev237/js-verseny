//filmek

const movie1 = {title: "Mission: Impossible", categories: ["Akció", "Fantasztikus"], relase_date: "1996. május 22.", img: "https://upload.wikimedia.org/wikipedia/en/e/e1/MissionImpossiblePoster.jpg", link: "https://www.imdb.com/title/tt0117060/"};
const movie2 = {title: "Ready Player One", categories: ["Akció", "Sci-Fi"], relase_date: "2018. március 29.", img: "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_.jpg", link: "https://www.imdb.com/title/tt1677720/"};
const movie3 = {title: "The Suicide Squad", categories: ["Vígjáték", "Fantasy"], relase_date: "2021. július 30.", img: "https://m.media-amazon.com/images/M/MV5BMWU4NDQ2NjEtNjhkOS00Y2MwLWJkODItZmJhZGE0MDU1OWM4XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg", link: "https://www.imdb.com/title/tt6334354/"};
const movie4 = {title: "Don't Look Up", categories: ["Vígjáték", "Politikai szatíra"], relase_date: "2021. december 5.", img: "https://fr.web.img3.acsta.net/pictures/21/11/16/17/11/5656957.jpg", link: "https://www.imdb.com/title/tt11286314/"};
const movie5 = {title: "Countdown", categories: ["Horror", "Thriller"], relase_date: "2019. október 25.", img: "https://m.media-amazon.com/images/M/MV5BODY3OGEyMTgtYTZjZi00Y2YzLWFjY2UtMjEwYWE1MjRkOTc4XkEyXkFqcGdeQXVyODQxMTI4MjM@._V1_.jpg", link: "https://www.imdb.com/title/tt10039344/"};
const movie6 = {title: "No Time to Die", categories: ["Akció", "Thriller"], relase_date: "2021. szeptember 30.", img: "https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg", link: "https://www.imdb.com/title/tt2382320/"};
const movies = [movie1, movie2, movie3, movie4, movie5, movie6];

//oesszes film megjelenitese

all_movie = '';

for (let index = 0; index < movies.length; index++) {
	all_movie += '<div class="movie_card" data-href="'+ movies[index].link +'"><img src="'+ movies[index].img +'" alt=""><div class="img_shadow"></div><div class="movie_card-details"><b>'+ movies[index].title +'</b><p id="category">'+ movies[index].categories[0] +', '+ movies[index].categories[1] +'</p><p id="release_date">'+ movies[index].relase_date +'</p></div></div>';
	$(".movies").html(all_movie);
}

//ha mar egy kategoria ki van jelolve akkor mar a nem kedvelt kategoriakban ne lehessen
//nem mukodik meg

$('input[name="like"]').change(function() {

	//dislike_id = 'dislike_' + $('input[name="like"]:checked').attr('id');
	//$(dislike_id).addClass("liked");
	console.log($('input[name="like"]:checked').attr('id'))

});

//kivalasztott kategoriak megejelenitese
//felig mukodik. ha egy film mind a ket kategoriat tratalmazza, akkor 2x jelenik meg

$('#done').click(function(event) {

	filtered_movie = "";

	event.preventDefault();

    like = $('input[name="like"]:checked').map(function(){
      return $(this).val();
    }).get();


	for (let index = 0; index < movies.length; index++) {
		for (let liked_movies = 0; liked_movies < like.length; liked_movies++) {
			if (movies[index].categories[0] == like[liked_movies] || movies[index].categories[1] == like[liked_movies]) {
				filtered_movie += '<div class="movie_card" data-href="'+ movies[index].link +'"><img src="'+ movies[index].img +'" alt=""><div class="img_shadow"></div><div class="movie_card-details"><b>'+ movies[index].title +'</b><p id="category">'+ movies[index].categories[0] +', '+ movies[index].categories[1] +'</p><p id="release_date">'+ movies[index].relase_date +'</p></div></div>';
			}
		}
	}

	$(".movies").html(filtered_movie);

});

//link_megnyitása

jQuery(document).ready(function($) {
	$(".movie_card").click(function() {
		window.location = $(this).data("href");
	});
});