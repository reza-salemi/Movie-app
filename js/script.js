const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=df035ca7a9e05fb57352487cd5e48d31&page1';
const imagePath = 'https://image.tmdb.org/t/p/w1280';
const searchApi = 'https://api.themoviedb.org/3/search/movie?api_key=df035ca7a9e05fb57352487cd5e48d31&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
// Get initial movies
getMovies(apiUrl);

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies){
    main.innerHTML = "";
    movies.forEach((movie) => {
        const {title,poster_path,vote_average,overview} = movie;

        const movieEl = document.createElement('article');

        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${imagePath + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return('red');
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm && searchTerm !=='') {
        getMovies(searchApi + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }

});

