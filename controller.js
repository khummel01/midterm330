//Authors: Katie Hummel and Kari Hoff
//Filename: controller.js
//Purpose: javascript for CS330 Midterm (LitFilm)
//Date: 3 April 2018

function findBook() {
  let title = document.querySelector("#bookTitleInput").value;
  let author = document.querySelector("#authorInput").value;
  let config = {}; // object, here's the method, body, headers
  config.method = 'GET';
  config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};

  fetch(`https://www.googleapis.com/books/v1/volumes?q={${title}, ${author}}`, config) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
<<<<<<< HEAD
      let title = data["items"][0]["volumeInfo"]["title"];
      let author = data["items"][0]["volumeInfo"]["authors"][0];
      let summary = data["items"][0]["volumeInfo"]["description"];
      let avgRating = data["items"][0]["volumeInfo"]["averageRating"];
      let bookImage = data["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"];

      let titleDisplay = document.getElementById("bookTitle");
      let authorDisplay = document.getElementById("bookAuthor");
      let summaryDisplay = document.getElementById("bookSummary");
      let avgRatingDisplay = document.getElementById("avgRating");
      let possWrongResultDisplay = document.getElementById("possWrongResult");
      let bookImageDisplay = document.getElementById("bookImage");

      titleDisplay.innerHTML = title;
      authorDisplay.innerHTML = author;
      possWrongResultDisplay.innerHTML = "Not what you're looking for? Please check your spelling and be sure to input the full title and author's name."
      bookImageDisplay.innerHTML =  `<img src=${bookImage} style=width:167px;height:270px>`;
;

      if (summary == undefined) {
        summaryDisplay.innerHTML = "Summary unavailable";
      } else {
        summaryDisplay.innerHTML = summary;
      }
      if (avgRating == undefined) {
        avgRatingDisplay.innerHTML = "Not rated";
      } else {
        avgRatingDisplay.innerHTML = `Average rating: ${avgRating}/5`;
      }
      let summary = data["items"][0]["volumeInfo"]["description"];
      let avgRating = data["items"][0]["volumeInfo"]["averageRating"];
      let bookImage = data["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"];

      let titleDisplay = document.getElementById("bookTitle");
      let authorDisplay = document.getElementById("bookAuthor");
      let summaryDisplay = document.getElementById("bookSummary");
      let avgRatingDisplay = document.getElementById("avgRating");
      let possWrongResultDisplay = document.getElementById("possWrongResult");
      let bookImageDisplay = document.getElementById("bookImage");

      titleDisplay.innerHTML = title;
      authorDisplay.innerHTML = author;
      possWrongResultDisplay.innerHTML = "Not what you're looking for? Please check your spelling and be sure to input the full title and author's name."
      bookImageDisplay.innerHTML =  `<img src=${bookImage} style=width:167px;height:270px;float:left;>`;
;

      if (summary == undefined) {
        summaryDisplay.innerHTML = "Summary unavailable";
      } else {
        summaryDisplay.innerHTML = summary;
      }
      if (avgRating == undefined) {
        avgRatingDisplay.innerHTML = "Not rated";
      } else {
        avgRatingDisplay.innerHTML = `Average rating: ${avgRating}/5`;
      }
    });
}

function findMovie() {
  let title = document.querySelector("#movieTitle").value;
  let api_key = "270ef537760087ddcea25e06616b754d"

  // Fetches movie id
  let config1 = {}; // object, here's the method, body, headers
  config1.method = 'GET';
  config1.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
  let movieId = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${title}`, config1) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let firstResult = data["results"][0];
      findMovieInfo(firstResult["id"]);
    });
}

function findMovieInfo(movieId) {
  let api_key = "270ef537760087ddcea25e06616b754d"

  let config2 = {}; // object, here's the method, body, headers
  config2.method = 'GET';
  config2.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};

  // Fetch Summary & Rating
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`, config2)
  .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let title = data["original_title"];
      let titleDisplay = document.querySelector("#displayMovieTitle").innerHTML = title;
      let tagline = data["tagline"];
      document.querySelector("#displayMovieTagline").innerHTML = tagline;
      let overview = data["overview"];
      document.querySelector("#displayMovieSummary").innerHTML = overview;
      let rating = data["vote_average"]
      document.querySelector("#displayMovieRating").innerHTML = `Vote average: ${rating}/10`;
    });
  // Fetch Director
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`, config2)
  .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let director = data["crew"][0]["name"];
      document.querySelector("#displayMovieDirector").innerHTML = `Directed by ${director}`;
    });
  // Fetch Image
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${api_key}`, config2) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let poster_path = data["posters"][0]["file_path"];
      let posterDisplay = document.querySelector("#displayMoviePoster")
      posterDisplay.src = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`;
      posterDisplay.style = "width:167px;height:270px;float:left;padding-right:2%";
    });
  //Fetch Video -- add later
  // fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}`, config2) //return a promise that contains details about the response
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(data) {
  //     console.log(data)
  //   });
}
