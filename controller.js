// Authors: Katie Hummel and Kari Hoff
// Filename: controller.js
// Purpose: javascript for CS330 Midterm (MOBS)
// Date: 3 April 2018

function bttClck(bttSpec) {
  let display = document.querySelector("#displayOutput")
  if (bttSpec == "findBkBtt") {
    let titleElement = document.querySelector("#bookTitle");
    let title = titleElement.value;
    let authorElement = document.querySelector("#author");
    let author = authorElement.value;

    findBookInfo(title, author);
    findMovie(title)

    titleElement.value = "";
    authorElement.value = "";

  } else {
    let titleElement = document.querySelector("#movieTitle")
    let title = titleElement.value;
    findBookInfo(title, "");
    findMovie(title);
    titleElement.value = "";
  }
  // Display wrong result question
  document.getElementById("displayWrongResult").innerHTML = "Not what you're looking for? Please check your spelling and be sure to input the full title or movie and/or the author's name."

  // Unhide the bookMovieOutput div
  let outputDiv = document.getElementById("bookMovieOutput");
  if (outputDiv.className.indexOf("hidden") > -1) {
      outputDiv.className = "unhidden";
  }

  // Scroll bookMovieOutput into view
  outputView = document.getElementById("bookMovieOutput");
  outputView.scrollIntoView(true);
}

function findBookInfo(title, author) {
  let config = {}; // object, here's the method, body, headers
  config.method = 'GET';
  config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};

  fetch(`https://www.googleapis.com/books/v1/volumes?q={${title}, ${author}}`, config) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      try {
        let title = data["items"][0]["volumeInfo"]["title"]
        if (title != undefined) {
          document.getElementById("displayBookTitle").innerHTML = title;
        } else {
          document.getElementById("displayBookTitle").innerHTML = "Book title is unavailable";
        }
      } catch (e) {
        document.getElementById("displayBookTitle").innerHTML = "Book title is unavailable";
      }
      try {
        let author = data["items"][0]["volumeInfo"]["authors"][0];
        if (author != undefined) {
          document.getElementById("displayBookAuthor").innerHTML = author;
        } else {
          document.getElementById("displayBookAuthor").innerHTML = "Author unavailable";
        }
      } catch (e) {
        document.getElementById("displayBookAuthor").innerHTML = "Author unavailable";
      }
      try {
        let summary = data["items"][0]["volumeInfo"]["description"];
        if (summary != undefined) {
          document.getElementById("displayBookSummary").innerHTML = summary;
        } else {
          document.getElementById("displayBookSummary").innerHTML = "Summary unavailable";
        }
      } catch (e) {
        document.getElementById("displayBookSummary").innerHTML = "Summary unavailable";
      }
      try {
        let avgRating = data["items"][0]["volumeInfo"]["averageRating"];
        if (avgRating != undefined) {
          document.getElementById("displayAvgRating").innerHTML = `Average rating: ${avgRating}/5`;
        } else {
          document.getElementById("displayAvgRating").innerHTML = "Not rated";
        }
      } catch (e) {
        document.getElementById("displayAvgRating").innerHTML = "Not rated";
      }
      try {
        let bookImage = data["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"];
        let bookImageDisplay = document.getElementById("displayBookImage");
        if (bookImage != undefined) {
          let bookImageDisplay = document.getElementById("displayBookImage");
          bookImageDisplay.src = bookImage;
          bookImageDisplay.style = "width:167px;height:270px;float:left;padding-right:2%";
        } else {
          bookImageDisplay.src = "//:0";
        }
      } catch (e) {
        let bookImageDisplay = document.getElementById("displayBookImage");
        bookImageDisplay.src = "//:0";
      }
    });
}

function findMovie(title) {
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
      try {
        findMovieInfo(data["results"][0]["id"])
      } catch (e) {
        document.getElementById("displayMovieTitle").innerHTML = "No movie available";
        document.getElementById("displayMovieTagline").innerHTML = "";
        document.getElementById("displayMovieOverview").innerHTML = "";
        document.getElementById("displayMovieRating").innerHTML = "";
        document.getElementById("displayMovieDirector").innerHTML = "";
        let posterDisplay = document.getElementById("displayMoviePoster");
        posterDisplay.src = "//:0";
      }
    });
}

function findMovieInfo(movieId) {
  let api_key = "270ef537760087ddcea25e06616b754d";

  let config2 = {}; // object, here's the method, body, headers
  config2.method = 'GET';
  config2.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};

  // Fetch Title, Tagline, Overview, & Rating
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`, config2)
  .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      try {
        let title = data["original_title"];
        if (title != undefined) {
          document.getElementById("displayMovieTitle").innerHTML = title;
        } else {
          document.getElementById("displayMovieTitle").innerHTML = "Title unavailable";
        }
      } catch (e) {
        document.getElementById("displayMovieTitle").innerHTML = "Title unavailable";
      }
      try {
        let tagLine = data["tagline"];
        if (tagLine != undefined) {
          document.getElementById("displayMovieTagline").innerHTML = tagLine;
        } else {
          document.getElementById("displayMovieTagline").innerHTML = "Movie tagline unavailable";
        }
      }  catch (e) {
        document.getElementById("displayMovieTagline").innerHTML = "Movie tagline unavailable";
      }
      try {
        let overview = data["overview"];
        if (overview != undefined) {
          document.getElementById("displayMovieOverview").innerHTML = overview;
        } else {
          document.getElementById("displayMovieOverview").innerHTML = "Overview unavailable";
        }
      } catch (e) {
        document.getElementById("displayMovieOverview").innerHTML = "Overview unavailable";
      }
      try {
        let avgRating = data["vote_average"];
        if (avgRating != undefined) {
          document.getElementById("displayMovieRating").innerHTML = `Average rating: ${avgRating}/10`;
        } else {
          document.getElementById("displayMovieRating").innerHTML = "Not rated";
        }
      } catch (e) {
        document.getElementById("displayMovieRating").innerHTML = "Not rated";
      }
    });

  // Fetch Director
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`, config2)
  .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      try {
        let director = data["crew"][0]["name"];
        if (director != undefined) {
          document.getElementById("displayMovieDirector").innerHTML = `Directed by ${director}`;
        } else {
          document.getElementById("displayMovieDirector").innerHTML = "Director unavailable";
        }
      } catch (e) {
        document.getElementById("displayMovieDirector").innerHTML = "Director unavailable";
      }
      });

  // Fetch Image
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${api_key}`, config2) //return a promise that contains details about the response
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      try {
        let poster_path = data["posters"][0]["file_path"];
        if (poster_path != undefined) {
          let posterDisplay = document.getElementById("displayMoviePoster");
          posterDisplay.src = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`;
          posterDisplay.style = "width:167px;height:270px;float:left;padding-right:2%";
        } else {
          let posterDisplay = document.getElementById("displayMoviePoster");
          posterDisplay.src = "//:0";
        }
      } catch (e) {
        let posterDisplay = document.getElementById("displayMoviePoster");
        posterDisplay.src = "//:0";
      }
    });
}
