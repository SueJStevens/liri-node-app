# Timothy (aka liri-node-app)

## What is Timothy?
Timothy is an application that will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.  It is sort-a-like SIRI but it can't take in voice commands.  The user must interface with Timothy through a text file or the command line.  Timothy will return useful information on par with the input provided by the user.  The user can type on the command line or the application can read a text file.     

Timothy started out as Homework Assignment #10 for UCSD Coding Bootcamp.  The official name of the assignment is 'Liri-Node_App'.  Since the assignment occured on the same week as C-Day, the application naturally morphed into Timothy.

## Requirements
- Make a command line Node.js app that depends on user provided parameters from the command line and can also accept user input from text file.
- The app will return formatted data from these APIs:
  - Bands in Town
  - Spotify
  - OMDB

## Technology
### Node.js
- Node.js
- Request (https://www.npmjs.com/package/request)
- Moment (https://www.npmjs.com/package/moment)
- DotEnv (https://www.npmjs.com/package/dotenv)
- Node.js: fs-filesystem
### API (via npm module)
- Bands In Town API (http://www.artists.bandsintown.com/bandsintown-api)
- Spotify API (https://www.npmjs.com/package/node-spotify-api)
- OMDB API (http://www.omdbapi.com)
### Coding Languages
- JavaScript
- Markdown

## Code Explanation
- Authentication keys for Spotify are stored in .env and accessed through the variables in keys.js.  This allows us to keep the API keys local (and confidential) while still providing other users of our app with the ability to obtain their own keys for Spotify authentication.  
- Bands in Town API uses coding bootcamp's ID.
- OMDB uses the key provided by Trilogy.
- The application will return information from one of the three APIs depending on what the user requests via the command line or via the text file.  There are limits on the information returned and to be useful, the user must type in valid commands.
  - concert-this + the name of an artist will return the concert venue hosting the requested artist that is located nearest to the user. (The logic behind this is simple:  SIRI always knows where you are.  All.The.Time.)
  - spotify-this-song + the name of an album track will return up to 5 albums that contain the song and other useful information.
  - movie-this + the name of a movie will return useful information about the move, including movie ratings.
  - do-what-it-says will return the same information as 'concert-this', 'spotify-this-song', or 'movie-this' except the value comes from the text file rather than from the user input on the command line.

## Use Cases
### Request a Concert
#### User supplies valid arguments via command line for a concert that exists in Bands in Town API
- Screen shot results here:
#### User supplies valid arguments via command line for a concert that does not exist in Bands in Town API
- Screen shot results here:
#### User fails to supply value argument
- Screen shot results here:
#### User supplies arguments via text file.  Only the valid argument example shown here
- Screen shot results here:


### Request a Song
#### User supplies valid arguments via command line for a song from an album track that exists in Spotify API
- Screen shot results here:
#### User supplies valid arguments via command line for a song from an album track that does not exist in Spotify API
- Screen shot results here:
#### User fails to supply value argument
- Screen shot results here:
#### User supplies arguments via text file.  Only the valid argument example shown here
- Screen shot results here:

### Request a Movie
#### User supplies valid arguments via command line for a movie that exists in OMDB API
- Screen shot results here:
#### User supplies valid arguments via command line for a movie that does not exist in OMDB API
- Screen shot results here:
#### User fails to supply value argument
- Screen shot results here:
#### User supplies arguments via text file.  Only the valid argument example shown here
- Screen shot results here:

### Examples of Invalid Requests
#### Arguments Not Supplied
![arguments_not_supplied](https://user-images.githubusercontent.com/39141985/47262267-d5176d80-d498-11e8-8635-5ee5e9c0d3df.png)

## Author & Copyright
Sue J. Stevens (StevensStock@gmail.com) &copy;2018. All Rights Reserved.

