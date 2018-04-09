//Authors: Katie Hummel and Kari Hoff
//Filename: controller.js
//Purpose: javascript for CS330 Midterm (LitFilm)
//Date: 3 April 2018

function findBook() {
<<<<<<< HEAD
  let title = document.querySelector("#bookTitleInput").value;
  let author = document.querySelector("#authorInput").value;
=======
  let title = document.querySelector("#bookTitle").value;
  console.log("TTILE: "+title)
  let author = document.querySelector("#author").value;
>>>>>>> 5d8be53c20d83cb1e430c703bacc3025ec7850b2
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
=======
      console.log(data)
      let summary = data["items"][0]["volumeInfo"]["description"];

      let displayDiv = document.querySelector("#findBookOutput")

      let summaryDisplay = document.querySelector("#displayBookSummary")
      summaryDisplay.innerHTML = summary;
      console.log(summaryDisplay)
>>>>>>> 5d8be53c20d83cb1e430c703bacc3025ec7850b2
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
