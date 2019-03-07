// Spotify
// liri
// Bootcamp Project

// Client ID cdd472dde2e34191b572e8dade3364d0
// Client Secret 9b7ca51508264d5f975d4d5b9913b766

var axios = require("axios");
var fs = require("fs");
var moment = require('moment');



var printTime = moment(Date.now()).format('LLLL');

// Create the Songs constructor
var Songs = function () {
    // divider will be used as a spacer between the concert and other data data we print in log.txt
    var divider = "\n------------------------------------------------------------\n";

    // findSong takes in the name of a song and searches the Bands in Town API
    this.findSong = function (song) {
        // var URL = "https://rest.bandsintown.com/songs/" + song + "/events?app_id=codingbootcamp";

        var Spotify = require('node-spotify-api');
        
        var spotify = new Spotify({
          id: 'cdd472dde2e34191b572e8dade3364d0',
          secret: '9b7ca51508264d5f975d4d5b9913b766'
        });
         
        spotify.search({ type: 'track', query: song }, function(err, data) {


        // axios.get(URL).then(function (response) {
            // Place the response.data into a variable, jsonData.
            // var jsonData = response.data;

            // code for evaluating if any object keys have a value of null and adding a string 'undefined' to the key
            // var keysArray = Object.keys(jsonData)
            // for (var i = 0; i < keysArray.length; i++) {
            //     if (jsonData[keysArray[i]] == null) {
            //         jsonData[keysArray[i]] = 'undefined';
            //     }
            // }

            // if (jsonData.length !== 0 && jsonData !== null && jsonData !== undefined) {
            //     // concertData ends up being the string containing the concert data we will print to the console
            //     var concertData = [
            //         // * Name of the venue
            //         // * Venue location
            //         // * Date of the Event (use moment to format this as "MM/DD/YYYY")

            //         divider,
            //         "Print-time: " + printTime,
            //         divider,
            //         "song(s): " + jsonData[1].lineup,
            //         "Name of venue: " + jsonData[1].venue.name,
            //         "Venue location: " + jsonData[1].venue.city + ", " + jsonData[1].venue.region,
            //         "Date of the Event: " + moment(jsonData[1].datetime).format("MM/DD/YYYY"),
            //         " " // this is a spacer for a prettier console.log
            //     ]
            //         .join("\n");

                // Append concertData and the divider to log.txt, print concertData to the console
                
                // fs.appendFile("log.txt", concertData, function (err) {
                //     if (err) throw err;
                // });
                // console.log("concert concertData: ", concertData);
                if (err) {
                    return console.log('Error occurred: ' + err);
                  }
                 
                console.log(data); 
                });

            // } 
            // else {
            //     return console.log(divider),
            //         console.log('There are no events for this song.'),
            //         console.log(divider)
            // }
        // });
    };

};

// module.exports = Songs;
