// require functionality files and fs for writing the log file
var fs = require('fs');
var Movies = require("./movies");
var Concerts = require('./concerts');
var Songs = require('./songs');
// colorized node cli
var colors = require('colors');
// var Random = require('./random')

// Create a new objects
var movie = new Movies();
var concert = new Concerts();
var song = new Songs();
// var random = new Random();

// Grab search command line argument
var searchLiri = process.argv[2];
// Joining the remaining arguments with spaces
var termLiri = process.argv.slice(3).join(" ");

// app instructions text
var instructions = "\nThis app searches for movies, cocerts and songs using multiple APIs.\n\nApp Use Instructions in Node.js CLI.\n\nSearch commands should be entered in this fashion witout angle brackets:\n\n$ node liri.js < search-command > < search item >\n\n1. To search for a Movie use command < movie-this > < movie name >\n2. To search for a Concert use command < concert-this > < artist or band name >\n3. To search for a Song use command < spotify-this-song > < song name >\n4. To search for a random item use command < do-what-it-says >\n\nLIRI will save the items you search into the 'log.txt' local file.\n";


// this function is called with "do-what-it-says" command - it takes arguments from the 'random.txt' file
var random = function () {

  var randomSearch = [];

  fs.readFile('random.txt', 'utf8', function (error, data) {
    if (error) {
      console.log('\nAn error has occurred!' .red);
      console.log(error);
    }

    randomSearch = data.split(',');

    LiriSearch(randomSearch[0], randomSearch[1]);

  })

}

// the main search function of the LIRI app
var LiriSearch = function (search, term) {

  // By default, if no search type is provided, print app instructions
  if (!search && !term) {
    console.log(instructions.blue);

  } else {

    // Print what you're searching for and call it's function

    // spotify without a search term entered
    if (search === "movie-this" && !term) {
      console.log('\nNo movie name was provided..'.yellow);
      console.log('\nDefault movie search for Fury with Brad Pitt: '.bgBlue);
      movie.findMovie('Fury ');
      console.log(instructions.blue);
    }
    else if (search === "movie-this") {
      console.log("\nSearching for a Movie".bgBlue);
      movie.findMovie(term);
    }


    // spotify without a search term entered
    else if (search === "spotify-this-song" && !term) {
      console.log('\nNo song name was provided..'.yellow);
      console.log('\nDefault search for The Sign by Ace of Base: '.bgBlue);
      song.findSong('The Sign Ace of Base');
      console.log(instructions.blue);
    }
    // spotify with the search term
    else if (search === "spotify-this-song") {
      song.findSong(term);
      console.log("\nSearching for a Song".bgBlue);
    }


    // concert search without a search term
    else if (search === "concert-this" && !term) {
      console.log('\nNo artist or band was provided..'.yellow);
      console.log(instructions.blue);
      // cocert search with the search term
    } else if (search === "concert-this") {
      concert.findArtist(term);
      console.log("\nSearching for an Artist".bgBlue);
    }


    // random search read from a file random.txt
    else if (search === "do-what-it-says") {
      console.log("\nSearching for a random item..".rainbow);
      random();
    } else {
      // print instructions if commands do not match
      console.log(instructions.blue);
    }

  }

}
LiriSearch(searchLiri, termLiri);