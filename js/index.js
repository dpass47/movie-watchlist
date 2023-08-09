const searchButton = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const movieContentHtml = document.querySelector('.movie-content');
const searchForm = document.querySelector('.search-form');
var movieListArr = [];
var localMovieArr = [];
var movieArrLocalStorage;

async function handleClick() {
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=4e5a6d0c&s=${searchInput.value}&type=movie`
	);
	const data = await res.json();
	movieListArr = data.Search.slice(0, 5);
	movieContentHtml.innerHTML = '';
	postData();
}

async function postData() {
	for (var i = 0; i < movieListArr.length; i++) {
		const res = await fetch(
			`http://www.omdbapi.com/?apikey=4e5a6d0c&t=${movieListArr[i].Title}`
		);
		const movieData = await res.json();
		movieContentHtml.innerHTML += `<div class="movie">
				<img src="${movieData.Poster}">
				<div class="movie-data">
				<h2 class="movie-title">${movieData.Title}</h2>
				<p><span class="run-time-text">${movieData.Runtime}</span><span class="genre-text">${movieData.Genre}</span><button class="watchlist-add-btn">Watchlist</button></p>
				<p class="plot-text">${movieData.Plot}</p>
				</div>	
				</div>`;
	}
	const watchlistBtns = document.querySelectorAll('.watchlist-add-btn');
	for (let i = 0; i < movieListArr.length; i++) {
		watchlistBtns[i].addEventListener('click', callback(i));
		watchlistBtns[i].addEventListener('click', function () {
			watchlistBtns[i].innerHTML = 'Added to watchlist!';
			watchlistBtns[i].style.backgroundImage = 'none';
			watchlistBtns[i].style.cursor = 'default';
			watchlistBtns[i].disabled = true;
		});
	}
}

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	handleClick();
});

function callback(x) {
	return function addEntry() {
		var exisiting = JSON.parse(localStorage.getItem('movieArr'));
		if (exisiting == null) exisiting = [];
		exisiting.push(movieListArr[x]);
		localStorage.setItem('movieArr', JSON.stringify(exisiting));
	};
}
