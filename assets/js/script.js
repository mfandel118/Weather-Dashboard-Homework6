// When user inputs a city, the latitude & longitude coordinates are saved to use in OneCall call ✅ 

// OneCall call uses lat & lon to complete call to retrieve weather info

// When the user types in a city & clicks search button, the current weather & 5-day forecast is displayed
    // Displays temp
    // Displays wind speed
    // Displays humidity
    // Displays UV index

// When user searches for a city, the city is added to localStorage ✅ 
// When user searches for a city, the city is added to list of Previous Searches as a button ✅ 

// When the user refreshes the page, the Previous Searches are still there ✅

// When user clicks Clear Search History, the localStorage is cleared ✅
// When user clicks Clear Search History, the list of Previous Searches is cleared of all city buttons

// When user clicks button for city under Previous Searches, that city's weather & forecast is displayed


// Declare variables
var APIkey = "&appid=7dca179715285dbff858d4faf04c2d05";
// var lat = "";
// var long = "";
var now = moment().format('MMMM Do YYYY, h:mm:ss a');
// console.log(now);

var userInput = document.querySelector(".user-input");
var searchBtn = document.querySelector(".search-button");
var searchHistory = document.querySelector(".search-history");
// Populate search history from localStorage or empty array
var searchHistoryList = JSON.parse(localStorage.getItem("city")) || [];
var clearBtn = document.querySelector(".clear-history");

var city = document.querySelector(".city-name");
var temp = document.querySelector(".current-temp");
var wind = document.querySelector(".wind-speed");
var humidity = document.querySelector(".humidity");
var uvIndex = document.querySelector(".uv-index");

var forcast = document.querySelector("forecast");

// Function to display Previous Search History on page load
function init() {
    for (var i=0; i<searchHistoryList.length; i++) {
        var btnEl = searchHistoryList[i];
        var newBtn = document.createElement("button");
        newBtn.setAttribute("class", "btn btn-dark btn-lg m-3");
        newBtn.textContent = btnEl;
        searchHistory.append(newBtn);
    };
};
// Call function to render previous search history
init();

// TESTING API CALLS:
// console.log("http://api.openweathermap.org/geo/1.0/direct?q=Denver&appid=7dca179715285dbff858d4faf04c2d05") ✅ 
// console.log("https://api.openweathermap.org/data/2.5/onecall?lat=39.7392364&lon=-104.9848623&appid=7dca179715285dbff858d4faf04c2d05") ✅ 

// Event Listener & function to pull weather & add city buttons to list of Previous Searches
searchBtn.addEventListener("click",renderWeather)
function renderWeather() {
    var newCity = userInput.value;
    // console.log(newCity);

    // Display current weather info & 5-day forecast for user-inputted city
    // Function with fetch to pull latitude & longitude coordinates and then plug into OneCall API call
    function getCoords() {
        
        var geoCodingCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + newCity + APIkey;
        console.log(geoCodingCall);
        fetch(geoCodingCall)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // console.log(data);
                var coords = {
                lat: data[0].lat,
                long: data[0].lon
                }
                // console.log(coords);
                function getWeather() {
                    var OneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coords.lat + "&lon=" + coords.long + APIkey;
                    console.log(oneCallURL);
                    
                    fetch(oneCallURL)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        console.log(data);
                    });
                };
                getWeather();
            });
    };
    getCoords();
    
    // Add new city button to search history
    searchHistoryList.push(newCity);
    localStorage.setItem("city", JSON.stringify(searchHistoryList));

    function addNewBtn() {
        var newBtn = document.createElement("button");
        newBtn.setAttribute("class", "btn btn-dark btn-lg m-3");
        newBtn.textContent = newCity;
        searchHistory.append(newBtn);
    };
    addNewBtn();
    userInput.value = "";
};


// Event Listener & function to clear search history
clearBtn.addEventListener("click",clearHistory)
function clearHistory() {
    localStorage.clear();

};