'use strict'
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=df035ca7a9e05fb57352487cd5e48d31&page1';
const imagePath = 'https://image.tmdb.org/t/p/w1280';
const searchApi = 'https://api.themoviedb.org/3/search/movie?api_key=df035ca7a9e05fb57352487cd5e48d31&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');

// Get initial movies
getMovies(apiUrl);

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
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

