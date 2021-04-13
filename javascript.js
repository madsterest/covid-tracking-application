// Get the input from the form using event listener. "submit" for the form and "click" for the button.
var button = document.querySelector("button");
var formInput = document.getElementById("search-focus");
var form = document.querySelector("form");

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
    });

  var requestVaccineUrl =
    "https://covid-api.mmediagroup.fr/v1/vaccines?country=" + locationName;
  fetch(requestVaccineUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
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
    });
}

function init() {
  getLocation();
}
// $(document).ready(function () {
//   $.ajax({
//     url: "https://geolocation-db.com/jsonp",
//     jsonpCallback: "callback",
//     dataType: "jsonp",
//     success: function (location) {
//       $("#country").html(location.country_name);
//       $("#state").html(location.state);
//       $("#city").html(location.city);
//       $("#latitude").html(location.latitude);
//       $("#longitude").html(location.longitude);
//       $("#ip").html(location.IPv4);
//     },
//   });
//   $.get("https://covid-api.mmediagroup.fr/v1/cases", function (data) {
//     console.log(data.Global.All.confirmed);
//     console.log(data);
//   });
// });
init();
