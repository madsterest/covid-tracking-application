// Get the input from the form using event listener. "submit" for the form and "click" for the button.
var button = document.querySelector("button");
var formInput = document.getElementById("search-focus");
var form = document.querySelector("form");
var locationDisplay = document.querySelector(".card-title");
var statsDisplay = document.querySelector(".card-text");
var recentSearchList = document.getElementById("searches");
var countryNameArray = [];
var casesDisplay = document.querySelector(".card-subtitle");
var vaccineStats = document.querySelector("#vaccinatedStats");
var deathStats = document.querySelector("#deathStats");
var percentageStats = document.querySelector("#percentageStats");
var safeRanking = document.querySelector("#safeRank");

function arrToUl() {
  recentSearchList.innerHTML = "";
  var recentSearches = JSON.parse(localStorage.getItem("country"));
  console.log("Searches:" + recentSearches);
  if (recentSearches !== null) {
    for (i = 0; i < recentSearches.length; i++) {
      var li = document.createElement("li");
      recentSearchList.appendChild(li);
      li.innerHTML = li.innerHTML + recentSearches[i];
      li.setAttribute("data-search", recentSearches[i]);
      li.setAttribute(
        "class",
        "recentSearch list-group-item bg-dark text-white"
      );
      li.setAttribute("onClick", "resubmitSearch(this)");
    }
  }
}
arrToUl();

function resubmitSearch(e) {
  var search = e.getAttribute("data-search");
  console.log(search);
  covidStats(search);
}

//used below as results only showed when the button was manually clicked and not when pressing enter on the keyboard.
function onLocationSubmit(event) {
  event.preventDefault();
  var countryName = formInput.value.trim();
  console.log(countryName);
  covidStats(countryName);
  var countrySavedArray = localStorage.getItem("country");
  if (countrySavedArray !== null) {
    var nameIncluded = countryNameArray.includes(countryName);
    if (nameIncluded) {
      return;
    } else {
      countryNameArray.push(countryName);
      console.log("Array " + countryNameArray);
      localStorage.setItem("country", JSON.stringify(countryNameArray));
      arrToUl();
    }
  } else {
    countryNameArray = countryName;
    console.log("Array " + countryNameArray);
    localStorage.setItem("country", JSON.stringify(countryNameArray));
    arrToUl();
  }
  covidStats(countryName);
}

function formatLocationName(locationName) {
  // title case location name
  var titleCasedLocation = locationName.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  // uri encode location name
  console.log(encodeURI(titleCasedLocation));
  return encodeURI(titleCasedLocation);
}

var statsDisplay = document.querySelector(".card-text");

function covidStats(locationName) {
  locationDisplay.innerHTML = locationName;

  // format locationName to title case and uri encode
  var formattedLocationName = formatLocationName(locationName);

  var requestUrl =
    "https://covid-api.mmediagroup.fr/v1/cases?country=" +
    formattedLocationName;
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentCases =
        data.All.confirmed - data.All.deaths - data.All.recovered;
      console.log(currentCases);
      if (currentCases > 999) {
        var formattedCases = numberWithCommas(currentCases);
        casesDisplay.innerHTML = "Active cases: " + formattedCases;
      } else {
        casesDisplay.innerHTML = "Active cases: " + currentCases;
      }

      var percentage = ((currentCases / data.All.population) * 100).toFixed(2);
      console.log(percentage);
      percentageStats.innerHTML =
        "Percentage of active cases in total population: " + percentage + "%";

      if (percentage <= 2) {
        safeRanking.innerHTML = "Safe to travel";
        safeRanking.style.color = "green";
      } else if (percentage > 2 && percentage <= 5) {
        safeRanking.innerHTML = "Take care";
        safeRanking.style.color = "yellow";
      } else {
        safeRanking.innerHTML = "DO NOT TRAVEL";
        safeRanking.style.color = "red";
      }

      var currentDeaths = data.All.deaths;
      console.log(currentDeaths);
      if (currentDeaths > 999) {
        var formattedDeaths = numberWithCommas(currentDeaths);
        deathStats.innerHTML = "Deaths: " + formattedDeaths;
      } else {
        deathStats.innerHTML = "Deaths: " + currentDeaths;
      }

      var percentage = (currentCases / data.All.population) * 100;
      console.log(percentage);
    });

  var requestVaccineUrl =
    "https://covid-api.mmediagroup.fr/v1/vaccines?country=" +
    formattedLocationName;
  console.log("formattedLocationName", formattedLocationName);
  fetch(requestVaccineUrl)
    .then(function (response) {
      console.log({ response, formattedLocationName });
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var vaccinated = data.All.people_partially_vaccinated;
      console.log(vaccinated);
      if (vaccinated > 999) {
        var formattedVaccinated = numberWithCommas(vaccinated);
        vaccineStats.innerHTML = "Vaccinated: " + formattedVaccinated;
      } else {
        vaccineStats.innerHTML = "Vaccinated: " + vaccinated;
      }
    });
}
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

// Initial page. Current location and stats displayed
function init() {
  url = "https://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var countryName = data.country_name;
      console.log(data);
      console.log(countryName);
      covidStats(countryName);
    });
}

init();
