
const tmdb_api_key = '6631e5f1dc96088e0d26b86da29b5b6a';
const lang = 'fr';
const with_original_language = 'fr';

var btn_lesmeilleurs = document.querySelector(".button1");
var btn_lesplus = document.querySelector(".button2");
var btn_actuelles = document.querySelector(".button3");
var btn_cesoir = document.querySelector(".button4");

// var btns = document.querySelectorAll(".button");

var movies_container = document.querySelector(".movies");
var popups_container = document.querySelector(".wrapperpopuptableau");





btn_lesmeilleurs.addEventListener("click", tmdb_query, false );
btn_lesplus.addEventListener("click", tmdb_query, false );
btn_actuelles.addEventListener("click", tmdb_query, false );
btn_cesoir.addEventListener("click", tmdb_query, false );



function tmdb_query( event ) {

	// window.alert(event.currentTarget.getAttribute('data-tv'));
	
	let data_query = event.currentTarget.getAttribute('data-tv');
	
	
	
	fetch('https://api.themoviedb.org/3/tv/'+data_query+'?api_key='+tmdb_api_key+'&language='+lang+'&with_original_language='+with_original_language)
	
	  .then( (response) => response.json())
	  
	  .then( (data) => {
		  
		  
		// console.log(data);
		
		movies_container.innerHTML = "";
		popups_container.innerHTML = "";
		
		  
		let movies_items = data.results;
		

		movies_items.forEach(movie => {
			
			// console.log(movie);

			movies_container.innerHTML += '<div class="wrappermovie" data-movie-id="'+movie.id+'">'+
                    '<div class="titremovie">'+
                        '<span>'+movie.name+'</span>'+
                    '</div>'+
                    '<div class="movie">'+
						'<img src="https://image.tmdb.org/t/p/w500/'+movie.poster_path+'" alt="">'+
                        '<div class="popup">'+
                        'Popularity'+
                        '<span>'+movie.vote_average+'/10</span>'+
                        '</div>'+
                    '</div>'+
                '</div>';
				
				
				
			popups_container.innerHTML += '<div class="popuptableau" id="popuptableau_'+movie.id+'">'+
				'<img src="https://image.tmdb.org/t/p/w500/'+movie.poster_path+'" alt="">'+
				'<div class="textpopup">'+
					'<h1>'+movie.name+'</h1>'+
					'<span>'+movie.overview+'</span>'+
					'<strong>'+movie.popularity+'</strong>'+
					'<span onclick="clsPopup(this)">CLOSE</span>'+
				'</div>'+
			'</div>';
			
			
				
				
			let html_movies_items = document.querySelectorAll(".wrappermovie");
			
			
			//SINTASSI FOREACH UGUALI
			
			// html_movies_items.forEach(function(single_movie_item) {
				// .....
			// });
			
			
			// html_movies_items.forEach(single_movie_item => {
				// ......
			// });
			
			
			
			html_movies_items.forEach(single_movie_item => {
				
				single_movie_item.onclick = function() {
					
					let popup_id = 'popuptableau_' + single_movie_item.getAttribute('data-movie-id');
					
					document.getElementById(popup_id).classList.add('up');
					document.getElementById(popup_id).style.display = 'flex';
					
					
					// alert(popup_id);
					
				}
				
			})

		});


		
	  })
	  .catch((error) => {
		console.error("Erreur lors de la récupération des données :", error); 
	  });
	
	
}




function clsPopup(elem) {
	let parent = elem.parentNode.parentNode
	parent.style.display = 'none';
	parent.classList.remove("up");
	return false;
}
