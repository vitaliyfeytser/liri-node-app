
var fs = require('fs');

var LiriSearch = require('./liri.js')

// var liriSearch = new LiriSearch();

var Random = function () {

    var randomSearch = [];

    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            console.log('An error has occurred!');
            console.log(error);
        }

        console.log('data: ', data);

        randomSearch = data.split(',');
        console.log('randomSearch after split(): ', randomSearch);

        
    })
    
    // return randomSearch;
    // liriSearch(randomSearch[0], randomSearch[1]);
}
module.exports = Random;