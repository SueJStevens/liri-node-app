function spotifyThisSong(valueIn) {
  console.log("spotify-this-song");
  console.log(valueIn);
  console.log("=========================================");

  //add code to read and set any environment variables with the dotenv package:
  require("dotenv").config();

  //Add the code required to import the `keys.js` file and store it in a variable.
  var keys = require('./keys');

  //You should then be able to access the spotify API
  var Spotify = require('node-spotify-api');

  var spotify = new Spotify(keys.spotify);

  //set the name of the song to search for as a variable
  var trackName = valueIn;

  /*search with callback -- We are going to use promises instead
  spotify.search({ type: 'track', query: trackName, limit: '5' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
    itemNum = 0;
    for (var i = 0; i < data.tracks.items.length; i++) {
      console.log(i+1+".");
      console.log("The Name of the Song is: " + data.tracks.items[i].name)
      console.log("The Name of the Artist is: " + data.tracks.items[i].artists[0].name);
      console.log("The Name of the Album is: " + data.tracks.items[i].album.name);
      console.log("The Preview URL is: " + data.tracks.items[i].preview_url)
      console.log("The ID: "+ data.tracks.items[i].id)
      console.log("-------------------------------------------------------------")
    }
  });
  */

  //search with promises -- We are going to use this
  spotify
    .search({ type: 'track', query: trackName, limit: '5' })
    .then(function (data) {

      console.log("Length: " + data.tracks.items.length)

      //test for situation where no song is returned
      if (data.tracks.items.length != 0) {

        itemNum = 0;
        for (var i = 0; i < data.tracks.items.length; i++) {
          console.log("Search for a song and return 5 items")
          console.log(i + 1 + ".");
          console.log("The Name of the Song is: " + data.tracks.items[i].name)
          console.log("The Name of the Artist is: " + data.tracks.items[i].artists[0].name);
          console.log("The Name of the Album is: " + data.tracks.items[i].album.name);
          console.log("The Preview URL is: " + data.tracks.items[i].preview_url)
          console.log("The ID: " + data.tracks.items[i].id)
          console.log("-------------------------------------------------------------")
        }

      } else {
        //request a particular song
        //If no song is provided then your program will default to "The Sign" by Ace of Base.
        spotify
          .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
          .then(function (data) {

            console.log("Request A Particular Song")
            console.log("The Name of the Song is: " + data.name)
            console.log("The Name of the Artist is: " + data.album.artists[0].name);
            console.log("The Name of the Album is: " + data.album.name);
            console.log("The Preview URL is: " + data.preview_url)
            console.log("-------------------------------------------------------------")

          })
          .catch(function (err) {
            console.error('Error occurred: ' + err);
          });


      }

    })
    .catch(function (err) {
      console.log(err);
    });

}; //end spotifyThisSong function

function movieThis(valueIn) {

  // Include the request npm package 
  var request = require("request");

  // Grab the movieName which will always be the third node argument.
  //var movieName = process.argv[2];
  var movieName = valueIn;

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site to recover the required info

      // Title of the movie.
      console.log("Title: " + JSON.parse(body).Title);
      // Year the movie came out.
      console.log("Release Year: " + JSON.parse(body).Year);
      // IMDB Rating of the movie. 
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      // Rotten Tomatoes Rating of the movie. //an array
      for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
        if (JSON.parse(body).Ratings[i].Source === 'Rotten Tomatoes') {
          console.log("Rotten Tomatoes Ratings: " + JSON.parse(body).Ratings[i].Value);
        }
      }
      // Country where the movie was produced.
      console.log("Country: " + JSON.parse(body).Country);
      // Language of the movie.
      console.log("Language: " + JSON.parse(body).Language);
      // Plot of the movie.
      console.log("Plot: " + JSON.parse(body).Plot);
      // Actors in the movie.
      console.log("Actors: " + JSON.parse(body).Actors);


    }
  });

}; //end movie-this function

function concertThis(valueIn) {

  // Include the request npm package 
  var request = require("request");

  // Set artistName in Variable.
  var artistName = valueIn;

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
  console.log(queryUrl);

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site to recover the required info
      console.log("Venue: " + JSON.parse(body).length);

      // Name of the venue
      console.log("Venue: " + JSON.parse(body)[0].venue.name);

      // Venue location
      console.log("Location: " + JSON.parse(body)[0].venue.city);

      // Date of the Event (use moment to format this as "MM/DD/YYYY")
      console.log("Date: " + JSON.parse(body)[0].datetime);


    }
  });

}; //end concertThis function

function doWhatItSays() {

  // fs is a core Node package for reading and writing files
  var fs = require("fs");

  // This block of code will read from the "random.txt" file.
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // Then split it by commas and put in a data array
    var dataArr = data.split(",");
    var operator = dataArr[0];
    var value = dataArr[1];
    console.log(operator);
    console.log(value);

    /** operator valid answers:
       * `concert-this`
       * `spotify-this-song`
       * `movie-this`
       * `do-what-it-says`
    */

    switch (operator) {
      case "concert-this":
        concertThis(value);
        break;
      case "spotify-this-song":
        spotifyThisSong(value)
        break;
      case "movie-this":
        movieThis(value)
        break;
      default:
        result = "Unknown";
    } //end switch

  }); //end fs.readFile


} //end function doWhatItSays

//call function doWhatItSays
doWhatItSays();

