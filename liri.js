/*Global Variables
-------------------------------------------------------------------------------
Spotify
*/
//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//Add the code required to import the `keys.js` file and store it in a variable.
var keys = require('./keys');

//Access the spotify API
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
// Store user supplied arguments in an array
var nodeArgs = process.argv;

/*
-------------------------------------------------------------------------------
Array of valid user requests:
*/
var ArrValidOperators = [
  "concert-this",
  "spotify-this-song",
  "movie-this",
  "do-what-it-says",
]

/*
-------------------------------------------------------------------------------
User Input, Validation, and seting global Operator and Value variables:
*/

//get user input & validate it
if (process.argv[2] === undefined) {
  //user did not provide an argument
  console.log("You must make a request.")
  console.log("Valid requests are:")
  console.log(ArrValidOperators.join("\n"));
} else {
  //check to make sure the argument provided is valid
  if (arrayContains(process.argv[2], ArrValidOperators) === false) {
    console.log("Your request isn't valid.")
    console.log("Valid requests are:")
    console.log(ArrValidOperators.join("\n"));
  } else {
    //user supplied a valid operator so set the variable
    var operator = process.argv[2];
    //console.log("Operator: " + operator);

    //set the value (it may not have been supplied)
    if (process.argv[3] === undefined) {
      var value = "";
    } else {
      //user might have supplied a multi-word value
      var value = (concatValue(nodeArgs, 3, " "));
    } //end test for value
    //console.log("Value: " + value);
    //call function processUserRequest
    processUserRequest(operator, value);
  } //end
} //end test user input

/*Functions
-------------------------------------------------------------------------------
*/

//process user request
function processUserRequest(operator, value) {
  identifyOperation(operator, value);
}; //end process function

//user requested a song
function spotifyThisSong(operatorIn, valueIn) {
  console.log("Operator: " + operatorIn);
  console.log("Value: " + valueIn);
  console.log("=========================================");

  // //add code to read and set any environment variables with the dotenv package:
  // require("dotenv").config();

  // //Add the code required to import the `keys.js` file and store it in a variable.
  // var keys = require('./keys');

  // //Access the spotify API
  // var Spotify = require('node-spotify-api');

  // var spotify = new Spotify(keys.spotify);

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

//      console.log(JSON.stringify(data));
      //console.log(data.tracks.items.length);
      //if(data.tracks.items.length != 0) {
      //  console.log("I'm zero!!")
     // };

      //test for situation where no song is returned
//      if (data.length.items!= 0 && data.tracks.items.length != 0) {
  if (data.tracks.items.length != 0) {

        itemNum = 0;
        for (var i = 0; i < data.tracks.items.length; i++) {
          // showData ends up being the string containing the show data we will print to the console
          var tracksData = [
            i + 1 + ".",
            "The Name of the Song is: " + data.tracks.items[i].name,
            "The Name of the Artist is: " + data.tracks.items[i].artists[0].name,
            "The Name of the Album is: " + data.tracks.items[i].album.name,
            "The Preview URL is: " + data.tracks.items[i].preview_url,
            "The ID: " + data.tracks.items[i].id,
            "----------------------------------------------------------------------"
          ].map(function (x) { return x.replace(/null/g, 'Not Available'); }).join("\n");
          console.log(tracksData);


          /*
                    console.log("Search for a song and return 5 items")
                    console.log(i + 1 + ".");
                    console.log("The Name of the Song is: " + data.tracks.items[i].name)
                    console.log("The Name of the Artist is: " + data.tracks.items[i].artists[0].name);
                    console.log("The Name of the Album is: " + data.tracks.items[i].album.name);
                    console.log("The Preview URL is: " + data.tracks.items[i].preview_url);
                    console.log("The ID: " + data.tracks.items[i].id);
                    console.log("-------------------------------------------------------------")
          */
        }

      } else {
        //request a particular song
        //If no song is provided then your program will default to "The Sign" by Ace of Base.
        spotify
          .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
          .then(function (data) {

            var tracksData = [
              "The Name of the Song is: " + data.album.name,
              "The Name of the Artist is: " + data.album.artists[0].name,
              "The Name of the Album is: " + data.name,
              "The Preview URL is: " + data.preview_url,
              "The ID: " + data.album.id,
              "----------------------------------------------------------------------"
            ].map(function (x) { return x.replace(/null/g, 'Not Available'); }).join("\n");
            console.log(tracksData);

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

//user requested a movie
function movieThis(operatorIn, valueIn) {
  console.log("Operator: " + operatorIn);
  console.log("Value: " + valueIn);
  console.log("=========================================");

  // Include the request npm package 
  var request = require("request");

  // Grab the movieName which will always be the third node argument.
  //var movieName = process.argv[2];
  var movieName = valueIn;

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  //console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      //test for situation where no song is returned
      if (JSON.parse(body).Response != "False") {

        // Parse the body of the site to recover the required info
        console.log(movieData(body));

      } else {
        //return Mr. Nobody
        console.log(JSON.parse(body).Error);
        console.log("Maybe you would like this movie: \n");
        var queryUrl = "http://www.omdbapi.com/?i=tt0485947&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {
          if (JSON.parse(body).Response != "False") {
            // Parse the body of the site to recover the required info
            console.log(movieData(body));
          }
        });
      }
    };
  });

  function movieData(body) {

    result = [
      "Title: " + JSON.parse(body).Title,
      "Release Year: " + JSON.parse(body).Year,
      "IMDB Rating: " + JSON.parse(body).imdbRating,
      "Rotten Tomatoes Ratings: " + ratingData(body),
      "Country: " + JSON.parse(body).Country,
      "Language: " + JSON.parse(body).Language,
      "Plot: " + JSON.parse(body).Plot,
      "Actors: " + JSON.parse(body).Actors,
      "----------------------------------------------------------------------"
    ].map(function (x) { return x.replace(/null/g, 'Not Available'); }).join("\n");

    return result;

  };

  function ratingData(body) {
    // Rotten Tomatoes Rating of the movie. //an array
    for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
      if (JSON.parse(body).Ratings[i].Source === 'Rotten Tomatoes') {
        result = (JSON.parse(body).Ratings[i].Value);
      }
    };
    return result;
  };

}; //end movie-this function

//user requested a concert
function concertThis(operatorIn, valueIn) {
  console.log("Operator: " + operatorIn);
  console.log("Value: " + valueIn);
  console.log("=========================================");
  var moment = require("moment");

  // Include the request npm package 
  var request = require("request");

  // Set artistName in Variable.
  var artistName = valueIn;

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

  // This line is just to help us debug against the actual URL.
  //console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      //test for empty return
      if (JSON.parse(body).length === 0) {
        console.log("We're sorry, but this band isn't playing near you.")
      } else {

        /*We want to display the venue that is the nearest location to where I am at now.
         *In this example, I am at Lat 33.0990465 Long -117.267091
         *In the real world, the "Siri" would know where I am.  --all-the-damn-time--like Santa Claus
         *We are going to get from Bands In Town the Lat/Long of all the venues one by one
         *Calc the distance between my location and the venue
         *For the first venue populate the venue object 
         *For all subsequent venues compare 
         *If the comparison shows the venue closer than existing value in object then replace object value
        */

        //Carlsbad CA Lat/Long
        var myLat = 33.0990465;
        var myLong = -117.267091;

        //Seattle Washington Lat/Long
        //var myLat = 47.6129432;
        //var myLong = -122.4821475;

        //Evans Georgia Lat/Long 
        //var myLat = 33.5145179;
        //var myLong = -82.2118206;

        //Washington DC Lat/Long 
        //var myLat = 38.890193;
        //var myLong = -76.991921;

        var venueLat = 0;
        var venueLong = 0;
        var distance = 0;
        var distanceCompare = 0;
        var venue = "";
        var location = "";
        var date = "";

        // Parse the body of the site to recover the required info
        var venueCount = JSON.parse(body).length;

        //loop thru data
        for (var i = 0; i < venueCount; i++) {
          //Get The Lat/Long of Venue
          venueLat = JSON.parse(body)[i].venue.latitude;
          venueLong = JSON.parse(body)[i].venue.longitude;
          //Calculate the Distance
          distanceCompare = distanceInKmBetweenEarthCoordinates(myLat, myLong, venueLat, venueLong);
          //        distanceCompare = Math.abs(myLat - venueLat) + Math.abs(myLong - venueLong);
          //Compare the Distance
          if (i === 0) {
            distance = distanceInKmBetweenEarthCoordinates(myLat, myLong, venueLat, venueLong);
            //          distance = Math.abs(myLat - venueLat) + Math.abs(myLong - venueLong);
            //set Location, Venue and Date
            venue = JSON.parse(body)[i].venue.name;
            location = JSON.parse(body)[i].venue.city;
            date = JSON.parse(body)[i].datetime;
          } else {
            //compare 
            if (distanceCompare < distance) { //this venue is closer
              //reset Location, Venue and Date
              venue = JSON.parse(body)[i].venue.name;
              location = JSON.parse(body)[i].venue.city;
              date = JSON.parse(body)[i].datetime;
            } //end compare
          } //end compare loop
        } //end of data loop

        //Print Info

        // Name of the venue
        console.log("Venue: " + venue);

        // Venue location
        console.log("Location: " + location);

        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        console.log("Date: " + moment(date).format("MM/DD/YYYY"));
      }
    }
  });

}; //end concertThis function

//user's request is supplied in a text file called random.txt
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
    var operatorFromFile = dataArr[0];
    var valueFromFile = dataArr[1];
    processUserRequest(operatorFromFile, valueFromFile);

  }); //end fs.readFile

} //end function doWhatItSays

//function used to get distance between two points on a map
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

//function used to get distance
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

//function to check if a string is in an array; returns true or false
function arrayContains(needle, arrhaystack) {
  return (arrhaystack.indexOf(needle) > -1);
}

//function to concatanate an array starting at any point and with any string
function concatValue(arr, start, str) {
  //create string of supplied values
  var result = "";
  for (var i = start; i < arr.length; i++) {
    if (i > start && i < arr.length) {
      result = result + str + arr[i];
    }
    else {
      result += arr[i];
    }
  }
  return result;
} //end function concatValue

//function to identify which operation the user requests
function identifyOperation(operatorIn, valueIn) {
  //console.log(operatorIn);

  switch (operatorIn) {
    case "concert-this":
      concertThis(operatorIn, valueIn);
      break;
    case "spotify-this-song":
      spotifyThisSong(operatorIn, valueIn);
      break;
    case "movie-this":
      movieThis(operatorIn, valueIn);
      break;
    case "do-what-it-says":
      doWhatItSays(valueIn);
      break;
    default:
      result = "Unknown";
  } //end switch  
} //end function
