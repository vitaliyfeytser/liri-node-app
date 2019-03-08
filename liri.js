// require("dotenv").config();

// var keys = require("./keys.js");

// var Spotify = require('node-spotify-api');

// var spotify = new Spotify(keys.spotify);


// The code above is from hw instructions - activate when needed
///////////////////////////////////////////////////////////////////////////////////////////////

var Movies = require("./movies");
var Concerts = require('./concerts');
var Songs = require('./songs');
// var Songs = require('./songs.js/index.js');

// Create a new MOVIE object
var movie = new Movies();
var concert = new Concerts();
var song = new Songs();

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since an actor or a Movie name may contain spaces
var term = process.argv.slice(3).join(" ");

var instructions = "\nThis app searches for movies, cocerts and songs using multiple APIs.\nApp Use Instructions in Node.js CLI.\n\nSearch commands should be entered in this fashion:\n\n$ node liri.js < search-command > < search item >\n\n1. To search for a Movie use command < movie-this > < movie name >\n2. To search for a Concert use command < concert-this > < artist or band name >\n3. To search for a Song use command < spotify-this-song > < song name >\n";

// By default, if no search type is provided, search for a Movie
if (!search || !term) {
  console.log(instructions);

  // search = "movie-this";
} else {

  // By default, if no search term is provided, search for "Cast Away"
  // if (!term) {
  //   // console.log(instructions);
  //   // term = "Mr. Nobody";
  // }

  // Print whether searching for a Movie or actor, print the term as well
  if (search === "movie-this") {
    console.log("\nSearching for a Movie\n");
    movie.findMovie(term);
  }
  else if (search === "spotify-this-song") {
    song.findSong(term);
    console.log("\nSearching for a Song\n");
  }
  else if (search === "concert-this") {
    concert.findArtist(term);
    console.log("\nSearching for an Artist\n");
  }
  else if (search === "do-what-it-says") {
    // movie.findActor(term);
    // console.log("\nSearching for an Actor\n");
  }
}

