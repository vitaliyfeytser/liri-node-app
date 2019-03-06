// require("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


// The code above is from hw instructions - activate when needed
///////////////////////////////////////////////////////////////////////////////////////////////

var Movies = require("./movies");
var Concerts = require('./concerts');

// Create a new MOVIE object
var movie = new Movies();
var concert = new Concerts();

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since an actor or a Movie name may contain spaces
var term = process.argv.slice(3).join(" ");

// By default, if no search type is provided, search for a Movie
if (!search) {
  search = "movie";
}

// By default, if no search term is provided, search for "Cast Away"
if (!term) {
  term = "Mr. Nobody";
}

// Print whether searching for a Movie or actor, print the term as well
if (search === "movie") {
  console.log("Searching for a Movie");
  movie.findMovie(term);
} 
else if (search === "actor") {
  movie.findActor(term);
  console.log("Searching for an Actor");
}
// else if (search === "song") {
//   song.findSong(term);
//   console.log("Searching for a Song");
// }
else if (search === "artist") {
  concert.findArtist(term);
  console.log("Searching for an Artist");
}
// else if (search === "concert") {
//   concert.findConcert(term);
//   console.log("Searching for a concert");
// }

