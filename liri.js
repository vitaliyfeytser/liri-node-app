// require("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


// The code above is from hw instructions - activate when needed
///////////////////////////////////////////////////////////////////////////////////////////////

var Movies = require("./movies");

// Create a new MOVIE object
var movie = new Movies();

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
// else {
//   movie.findActor(term);
//   console.log("Searching for TV Actor");
// }
