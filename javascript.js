// Get the input from the form using event listener. "submit" for the form and "click" for the button.
var button = document.querySelector("button");
var formInput = document.getElementById("search-focus");
var form = document.querySelector("form");
var locationDisplay = document.querySelector(".card-title");
var statsDisplay = document.querySelector(".card-text");
var recentSearchList = document.getElementById("searches");
var countryNameArray = [];
countryNameArray = localStorage.getItem('country');
countryNameArray = JSON.parse(countryNameArray);

button.addEventListener("click", function () {
  var countryName = formInput.value.trim();
  if(countryNameArray.includes(countryName)) {
     
  } else { 
   countryNameArray.push(countryName);
   console.log('Array ' + countryNameArray)
   localStorage.setItem('country',JSON.stringify(countryNameArray));
   arrToUl();
 }

 covidStats(countryName);
});



function arrToUl() {
  recentSearchList.innerHTML = "";
  var recentSearches = localStorage.getItem('country');
  recentSearches = JSON.parse(recentSearches);
  console.log('Searches:' + recentSearches);
  for(i=0;i < recentSearches.length;i++) {
    var li = document.createElement('li');
    recentSearchList.appendChild(li);
    li.innerHTML=li.innerHTML + recentSearches[i];
    li.setAttribute("data-search", recentSearches[i]);
    li.setAttribute("class", 'recentSearch');
    li.setAttribute("onClick", 'resubmitSearch(this)');
  } 
}
arrToUl();

function resubmitSearch(e) {
  var search = e.getAttribute("data-search");
  console.log(search);
  covidStats(search);
}

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


