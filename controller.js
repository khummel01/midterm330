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
      console.log(data)
      let summary = data["items"][0]["volumeInfo"]["description"];

      let displayDiv = document.querySelector("#findBookOutput")

      let summaryDisplay = document.querySelector("#displayBookSummary")
      summaryDisplay.innerHTML = summary;
      console.log(summaryDisplay)
    });

    let titleDisplay = document.querySelector("#displayBookTitle")
    titleDisplay.innerHTML = title;
    console.log("TITLEDISPLAY: " +titleDisplay)
}

function findMovie() {
  let title = document.querySelector("#movieTitle").value;
  let config = {}; // object, here's the method, body, headers
  config.method = 'GET';
  config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
  let api_key = "270ef537760087ddcea25e06616b754d"
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${title}`, config) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data)
      let x = data["items"][0];
      console.log(x)
      // console.log(x.title)
      document.querySelector("#findMovieOutput").innerHTML = x;
    });
}
