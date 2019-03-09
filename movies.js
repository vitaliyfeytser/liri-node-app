var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

var printTime = moment(Date.now()).format('LLLL');

// Create the Movies constructor
var Movies = function () {
    // divider will be used as a spacer between the movie and other data data we print in log.txt
    var divider = "\n------------------------------------------------------------\n";

    // findmovie takes in the name of a movie and searches the OMDB API
    this.findMovie = function (movie) {
        var URL = "http://www.omdbapi.com/?&apikey=a7377846&t=" + movie;

        axios.get(URL).then(function (response) {
            // Place the response.data into a variable, jsonData.
            var jsonData = response.data;

            // code for evaluating if any object keys have a value of null and adding a string 'undefined' to the key
            var keysArray = Object.keys(jsonData)
            for (var i = 0; i < keysArray.length; i++) {
                if (jsonData[keysArray[i]] == null) {
                    jsonData[keysArray[i]] = 'undefined';
                }
            }

            // these variables and if statements handle errors for older movies where ratings do not exist
            var imdbRating = 'none';
            var tomatoRating = 'none';

            if (typeof jsonData.Ratings[0] !== 0 && jsonData.Ratings[0] !== null && jsonData.Ratings[0] !== undefined) {
                imdbRating = jsonData.Ratings[0].Value;
                if (typeof jsonData.Ratings[1] !== 0 && jsonData.Ratings[1] !== null && jsonData.Ratings[1] !== undefined) {
                    tomatoRating = jsonData.Ratings[1].Value;
                }
            } 
            
            if (jsonData.length !== 0 && jsonData !== null && jsonData !== undefined) {

                // movieData ends up being the string containing the movie data we will print to the console
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
                    "Print-time.............." + printTime,
                    divider,
                    "Title___________________" + jsonData.Title,
                    "Year____________________" + jsonData.Released,
                    "IMDB Rating_____________" + imdbRating,
                    "Rotten Tomatoes Rating__" + tomatoRating,
                    "Country_________________" + jsonData.Country,
                    "Language(s)_____________" + jsonData.Language,
                    "Plot____________________" + jsonData.Plot,
                    "Actors__________________" + jsonData.Actors,
                    "Log File________________" + "log.txt",
                    " " // this is a spacer for a prettier console.log
                ].join("\n");

                // Append movieData and the divider to log.txt, print movieData to the console
                fs.appendFile("log.txt", movieData, function (err) {
                    if (err) throw err;
                    console.log(movieData);
                });
            } else {
                return console.log(divider),
                    console.log('There is no data for this movie.'),
                    console.log(divider)
            }
        });
    };

};

module.exports = Movies;
