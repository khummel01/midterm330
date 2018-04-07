//Authors: Katie Hummel and Kari Hoff
//Filename: controller.js
//Purpose: javascript for CS330 Midterm (LitFilm)
//Date: 3 April 2018

function findBook() {
  let title = document.querySelector("#bookTitle").value;
  console.log("TTILE: "+title)
  let author = document.querySelector("#author").value;
  let config = {}; // object, here's the method, body, headers
  config.method = 'GET';
  config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};

  fetch(`https://www.googleapis.com/books/v1/volumes?q={${title}, ${author}}`, config) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let summary = data["items"][0]["volumeInfo"]["description"];

      let summaryDisplay = document.querySelector("#displayBookSummary")
      summaryDisplay.innerHTML = summary;
    });

    let titleDisplay = document.querySelector("#displayBookTitle")
    titleDisplay.innerHTML = title;
}

function findMovie() {
  let title = document.querySelector("#movieTitle").value;
  let api_key = "270ef537760087ddcea25e06616b754d"

    // Fetches movie id
  let config1 = {}; // object, here's the method, body, headers
  config1.method = 'GET';
  config1.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${title}`, config1) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let firstResult = data["results"][0];
      movieId = firstResult["id"]
    });

  // Fetch Movie Information
  let movieId = 505;
  let config2 = {}; // object, here's the method, body, headers
  config2.method = 'GET';
  config2.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
  fetch(`https://api.themoviedb.org/3/search/movie/${movieId}?api_key=${api_key}`, config2) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data)
      // let firstResult = data["results"][0];
      // let movieId = firstResult["id"]
      // document.querySelector("#displayMovieSummary").innerHTML = movieId;
      let summary = "Display Summary Here";
      document.querySelector("#displayMovieSummary").innerHTML = summary;
    });
    let titleDisplay = document.querySelector("#displayMovieTitle")
    titleDisplay.innerHTML = title;
}
