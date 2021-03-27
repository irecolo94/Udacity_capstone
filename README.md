# Udacity_capstone
# Project Aim
The aim of this project is to render a single page web application which allows users to find out information about their upcoming trips.

# Required skills

The project was built with the use of:
- Node for setting up the webserver
- Express for routing
- Build tool: Webpack, webpack loaders and plugins for bundling project files
- Sass for styling
- Service workers for offline content
- APIs offered by Geonames, Weatherbit, Pixabay and Restcountries
- Jest is used for testing javascript, supertest tests server
- uuid is used for generating unique ids
- Html2pdf is used to export pdf
- Icons have been self painted with procreate

# Extended option implemented (according to requirements)
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- Integrate the REST Countries API to pull in data for the country being visited.
- Allow the user to remove the trip.
- Incorporate icons into forecast.
- Allow user to Print their trip and/or export to PDF.
- Allow the user to add additional trips

# Steps followed

## Start and Webpack configuration  
Fork and download starter code. Correct set up npm in the project folder. Set up Webpack following the configuration used through Udacity's Nanodegree lecture on the topic.

## API configuration
Register on Geonames, Weatherbit, Pixabay. Save API_KEY and encrypt it before using it. API request set up on server side and client side. Set up URL for fetch request following the documentation on the specific websites

## PDF export
Html2pdf will render a pdf of the selected card.
**IMPORTANT**  Pictures won't be printed because of cross origin!

## Jest framework for testing
Set up Jest to test the javascript on the client side.
Set up Supertest to test the server.
**IMPORTANT**  Server needs to be closed before testing! Otherwise the port will be already occupied by the server and supertest won't be able to make the test.

## Service Workers
Project uses service workers to make webpage available offline.

## Deploying
The next step will be that of deploying the project wiht [Heroku](https://www.heroku.com/)
