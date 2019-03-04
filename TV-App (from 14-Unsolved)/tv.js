var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

// Create the TV constructor
var TV = function() {
  // divider will be used as a spacer between the tv data we print in log.txt
  var divider = "\n------------------------------------------------------------\n\n";

  // findShow takes in the name of a tv show and searches the tvmaze API
  this.findShow = function(show) {
    var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;

    axios.get(URL).then(function(response) {
      // Place the response.data into a variable, jsonData.
      var jsonData = response.data;
      console.log("show jsonData: ", jsonData);
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
      // showData ends up being the string containing the show data we will print to the console
      // var now = Date.now();
      // console.log('now: ', now);
      var printTime = moment(Date.now()).format('LLLL');
      console.log("printTime: ", printTime);

      var showData = [
        "Print-time: " + printTime,
        "Show: " + jsonData.name,
        "Genre(s): " + jsonData.genres.join(", "),
        "Rating: " + jsonData.rating.average,
        // "Network: " + ((jsonData.network !== null)?jsonData.network.name:'undefined'),      // code for evaluating if any object keys have a value of null and adding a string 'undefined' to the key
        "Network: " + jsonData.network.name,
        "Summary: " + jsonData.summary
      ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", showData + divider, function(err) {
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

      // showData ends up being the string containing the show data we will print to the console
      var actorData = [
        "Name: " + jsonData[0].person.name,
        "Birthday: " + jsonData[0].person.birthday,
        "Gender: " + jsonData[0].person.gender,
        "Country: " + jsonData[0].person.country,
        "Log File: " + "/Users/Vitaliy/Desktop/UCDVSAC201811FSF2/11-js-constructors/01-Activities/14-Stu_FinalTVApp/Unsolved/log.txt"
      ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", actorData + divider, function(err) {
        if (err) throw err;
       
      });
    });
  };
};

module.exports = TV;
