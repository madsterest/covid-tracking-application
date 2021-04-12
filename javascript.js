// Get the input from the form using event listener. "submit" for the form and "click" for the button.
var button = document.querySelector("button");
var formInput = document.getElementById("search-focus");

button.addEventListener("click", function () {
  console.log("hey there");
  var countryName = formInput.value.trim();
  console.log(countryName);
  var requestUrl =
    "https://covid-api.mmediagroup.fr/v1/vaccines?country=" + countryName;
  vaccineAPI(requestUrl);
});

function vaccineAPI(URL) {
  fetch(URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
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
