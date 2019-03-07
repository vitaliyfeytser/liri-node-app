// Spotify
// liri
// Bootcamp Project

// Client ID cdd472dde2e34191b572e8dade3364d0
// Client Secret 9b7ca51508264d5f975d4d5b9913b766

var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

var Spotify = require('node-spotify-api');

var printTime = moment(Date.now()).format('LLLL');

// Create the Songs constructor
var Songs = function () {


    var spotify = new Spotify({
        id: 'cdd472dde2e34191b572e8dade3364d0',
        secret: '9b7ca51508264d5f975d4d5b9913b766'
    });

    this.findSong = function (song) {
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        });

    }
}

module.exports = Songs;