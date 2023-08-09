const movieContentHtml = document.querySelector('.movie-content');
const moviePlacehold = document.querySelector('.movie-placehold');
var movieArr;

function getData() {
	movieArr = JSON.parse(localStorage.getItem('movieArr'));
}

getData();

function clearData() {
	if (movieArr.length >= 1) {
		moviePlacehold.style.display = 'none';
	} else {
		moviePlacehold.style.display = 'flex';
	}
}

clearData();

async function postData() {
	movieContentHtml.innerHTML = '';
	for (var i = 0; i < movieArr.length; i++) {
		const res = await fetch(
			`http://www.omdbapi.com/?apikey=4e5a6d0c&t=${movieArr[i].Title}`
		);
		const movieData = await res.json();
		movieContentHtml.innerHTML += `<div class="movie">
				<img src="${movieData.Poster}">
				<div class="movie-data">
				<h2 class="movie-title">${movieData.Title}</h2>
				<p><span class="run-time-text">${movieData.Runtime}</span><span class="genre-text">${movieData.Genre}</span><button class="watchlist-remove-btn">Remove</button></p>
				<p class="plot-text">${movieData.Plot}</p>
				</div>	
				</div>`;
	}
	const watchlistRemoveBtns = document.querySelectorAll(
		'.watchlist-remove-btn'
	);
	for (let i = 0; i < movieArr.length; i++) {
		watchlistRemoveBtns[i].addEventListener('click', function () {
			var exisiting = JSON.parse(localStorage.getItem('movieArr'));
			if (exisiting == null) exisiting = [];
			exisiting.splice(i, 1);
			movieArr.splice(i, 1);
			localStorage.setItem('movieArr', JSON.stringify(exisiting));
			postData();
			clearData();
		});
	}
}

postData();
