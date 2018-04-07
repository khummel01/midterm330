//Authors: Katie Hummel and Kari Hoff
//Filename: controller.js
//Purpose: javascript for CS330 Midterm (LitFilm)
//Date: 3 April 2018

function findBook() {
  let title = document.querySelector("#bookTitle").value;
  let author = document.querySelector("#author").value;
  let config = {}; // object, here's the method, body, headers
  config.method = 'GET';
  config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};

  fetch(`https://www.googleapis.com/books/v1/volumes?q={${title}, ${author}}`, config) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let x = data["items"][0]["volumeInfo"]["description"];
      
      let displayDiv = document.getElementById("findBookOutput")
      let titleDisplay = document.getElementById("bookTitle")
      titleDisplay.innerHTML = title;
      let summaryDisplay = document.getElementById("bookSummary")
      summaryDisplay.innerHTML = x;
      console.log(displayDiv)
    });
}

function findMovie() {
  let title = document.querySelector("#movieTitle").value;
  let config = {}; // object, here's the method, body, headers
  config.method = 'GET';
  config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
  let api_key = "270ef537760087ddcea25e06616b754d"
  fetch(`https://api.themoviedb.org/3/search/${title}?api_key=270ef537760087ddcea25e06616b754d`, config) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let x = data["items"][0]["volumeInfo"]["description"]; //change to TMDB specific
      document.getElementById("findMovieOutput").innerHTML = x;
    });
}
