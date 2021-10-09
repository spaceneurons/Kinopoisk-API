const api = "db0ad9af-0c2b-4373-ad89-7ee5b20b0e05";
const api_Top =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const api_Search =
    "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(api_Top);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": api,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}

function showMovies(data) {
    document.querySelector(".movies").innerHTML = "";
    const moviesEl = document.querySelector(".movies");
    data.films.forEach((movie) => {
                const movieEl = document.createElement("div");
                movieEl.classList.add("movie");
                movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__year">${movie.year}</div>
        <div class="movie__category">${movie.genres.map(
          (genre) => ` ${genre.genre}`
        )}</div>
        ${
          movie.rating &&
          `
        <div class="movie__average movie__average--${getClassByRate(
          movie.rating
        )}">${movie.rating}</div>
        `
        }
      </div>
        `;
    moviesEl.appendChild(movieEl);
  });
}


function getClassByRate(vote) {
  if (vote >= 7) {
      return "green";
  } else if (vote > 5) {
      return "orange";
  } else {
      return "red";
  }
}


const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${api_Search}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});