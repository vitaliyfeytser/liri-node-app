// Spotify
// liri
// Bootcamp Project

var fs = require("fs");
var moment = require('moment');

require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var printTime = moment(Date.now()).format('LLLL');

// Create the Songs constructor
var Songs = function () {
    // divider will be used as a spacer between the movie and other data data we print in log.txt
    var divider = "\n------------------------------------------------------------\n";

    var spotify = new Spotify(keys.spotify);

    this.findSong = function (song) {
        // this is the Spotify API call
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            // code for evaluating if any object keys have a value of null and adding a string 'undefined' to the key
            var keysArray = Object.keys(data)
            for (var i = 0; i < keysArray.length; i++) {
                if (data[keysArray[i]] == null) {
                    data[keysArray[i]] = 'undefined';
                }
            }
            // make sure the object is not empty == song exists
            if (data.length !== 0 && data !== null && data !== undefined) {

                // songData ends up being the string containing the song data we will print to the console
                var songData = [
                    // * Artist(s)
                    // * The song's name
                    // * A preview link of the song from Spotify
                    // * The album that the song is from
                    // * If no song is provided then your program will default to "The Sign" by Ace of Base.

                    divider,
                    'Print-time.: ' + printTime,
                    divider,
                    'Song_______ ' + data.tracks.items[0].name,
                    'Album______ ' + data.tracks.items[0].album.name,
                    'Preview____ ' + data.tracks.items[0].preview_url,
                    'Artist_____ ' + data.tracks.items[0].artists[0].name,
                    'Log File___ ' + 'log.txt',
                    " " // this is a spacer for a prettier console.log
                ].join("\n");
                // Append songData and the divider to log.txt, print songData to the console
                fs.appendFile("log.txt", songData, function (err) {
                    if (err) throw err;
                });
                console.log(songData);
            } else {
                // if no such song exists - inform user
                return console.log(divider),
                    console.log('There is no data for this song.'),
                    console.log(divider)
            }
        });

    }
}

module.exports = Songs;

