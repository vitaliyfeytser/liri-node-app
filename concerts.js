var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

var printTime = moment(Date.now()).format('LLLL');

// Create the Concerts constructor
var Concerts = function () {
    // divider will be used as a spacer between the concert and other data data we print in log.txt
    var divider = "------------------------------------------------------------";

    // findArtist takes in the name of a artist and searches the Bands in Town API
    this.findArtist = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

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
            // code for making sure the object isn't empty
            if (jsonData.length !== 0 && jsonData !== null && jsonData !== undefined) {
                // concertData ends up being the string containing the concert data we will print to the console
                var concertData = [
                    // * Name of the venue
                    // * Venue location
                    // * Date of the Event (use moment to format this as "MM/DD/YYYY")

                    divider,
                    "Print-time......... : " + printTime,
                    divider,
                    "Artist(s)____________ " + jsonData[0].lineup,
                    "Name of venue________ " + jsonData[0].venue.name,
                    "Venue location_______ " + jsonData[0].venue.city + " " + jsonData[0].venue.region + " " + jsonData[0].venue.country,
                    "Date of the Event____ " + moment(jsonData[0].datetime).format("MM/DD/YYYY"),
                    " " // this is a spacer for a prettier console.log
                ]
                    .join("\n");

                // Append concertData and the divider to log.txt, print concertData to the console
                fs.appendFile("log.txt", concertData, function (err) {
                    if (err) throw err;
                });
                console.log(concertData.green);

            } else {
                return console.log(divider),
                    console.log('There are no events for this artist.'.yellow),
                    console.log(divider)
            }
        });
    };

};

module.exports = Concerts;
