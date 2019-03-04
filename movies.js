var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

// Create the TV constructor
var Movies = function() {
  // divider will be used as a spacer between the movie and other data data we print in log.txt
  var divider = "\n------------------------------------------------------------\n";

  // findmovie takes in the name of a movie and searches the OMDB API
  this.findMovie = function(movie) {
    var URL = "http://www.omdbapi.com/?&apikey=a7377846&t=" + movie;

    axios.get(URL).then(function(response) {
      // Place the response.data into a variable, jsonData.
      var jsonData = response.data;
      console.log("movie jsonData: ", jsonData);
      // if(jsonData.network) {
      //   name = js
      // }

      // code for evaluating if any object keys have a value of null and adding a string 'undefined' to the key
      var keysArray = Object.keys(jsonData)
      for(var i= 0; i < keysArray.length; i++) {
        if(jsonData[keysArray[i]] == null) {
          jsonData[keysArray[i]] = 'undefined';
        }
      }
      // movieData ends up being the string containing the movie data we will print to the console
      // var now = Date.now();
      // console.log('now: ', now);
      var printTime = moment(Date.now()).format('LLLL');
      console.log("printTime: ", printTime);

      var movieData = [
        // * Title of the movie.
        // * Year the movie came out.
        // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie.
        // * Country where the movie was produced.
        // * Language of the movie.
        // * Plot of the movie.
        // * Actors in the movie.

        divider,
        "Print-time: " + printTime,
        divider,
        "Title: " + jsonData.Title,
        "Year: " + jsonData.Released,
        "IMDB Rating: " + jsonData.Ratings[0].Value,
        "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
        "Country: " + jsonData.Country,
        "Language(s): " + jsonData.Language,
        "Plot: " + jsonData.Plot,
        "Actors: " + jsonData.Actors
        // "Network: " + ((jsonData.network !== null)?jsonData.network.name:'undefined'),      // code for evaluating if any object keys have a value of null and adding a string 'undefined' to the key
      ].join("\n");

      // Append movieData and the divider to log.txt, print movieData to the console
      fs.appendFile("log.txt", movieData + divider, function(err) {
        if (err) throw err;
       
      });
    });
  };

  this.findActor = function(actor) {
    var URL = "http://api.tvmaze.com/search/people?q=" + actor;

    // Add code to search the TVMaze API for the given actor
    // The API will return an array containing multiple actors, just grab the first result
    // Append the actor's name, birthday, gender, country, and URL to the `log.txt` file
    // Print this information to the console

    axios.get(URL).then(function(response) {
      // Place the response.data into a variable, jsonData.
      var jsonData = response.data;
      console.log('jsonData: ', jsonData);
      console.log('jsonData[0]: ', jsonData[0]);
      console.log('jsonData[1]: ', jsonData[1]);

      // movieData ends up being the string containing the movie data we will print to the console
      var actorData = [
        "Name: " + jsonData[0].person.name,
        "Birthday: " + jsonData[0].person.birthday,
        "Gender: " + jsonData[0].person.gender,
        "Country: " + jsonData[0].person.country,
        "Log File: " + "/Users/Vitaliy/Desktop/UCDVSAC201811FSF2/11-js-constructors/01-Activities/14-Stu_FinalTVApp/Unsolved/log.txt"
      ].join("\n\n");

      // Append movieData and the divider to log.txt, print movieData to the console
      fs.appendFile("log.txt", actorData + divider, function(err) {
        if (err) throw err;
       
      });
    });
  };
};

module.exports = Movies;