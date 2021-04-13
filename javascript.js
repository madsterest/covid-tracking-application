// Get the input from the form using event listener. "submit" for the form and "click" for the button.
var button = document.querySelector("button");
var formInput = document.getElementById("search-focus");
var form = document.querySelector("form");
var locationDisplay = document.querySelector(".card-title");
var statsDisplay = document.querySelector(".card-text");

button.addEventListener("click", function () {
  console.log("hey there");
  var countryName = formInput.value.trim();
  console.log(countryName);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("submitted");
  var countryName = formInput.value.trim();
  console.log(countryName);
});

// function vaccineAPI(locationName) {
//   var requestUrl =
//     "https://covid-api.mmediagroup.fr/v1/vaccines?country=" + locationName;
//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// }

function covidStats(locationName) {
  var requestUrl =
    "https://covid-api.mmediagroup.fr/v1/cases?country=" + locationName;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentCases =
        data.All.confirmed - data.All.deaths - data.All.recovered;
      var percentage = (currentCases / data.All.population) * 100;
      console.log(percentage);
    });

  var requestVaccineUrl =
    "https://covid-api.mmediagroup.fr/v1/vaccines?country=" + locationName;
  fetch(requestVaccineUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var vaccinated = data.All.people_partially_vaccinated;
    });
}

function getLocation() {
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
      locationDisplay.innerHTML = "Current Location: " + countryName;
    });
}

function init() {
  getLocation();
}

init();
