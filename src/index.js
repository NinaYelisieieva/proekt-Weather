let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = currentDate.getDate();
let currentDay = days[currentDate.getDay()];
let currentMonth = months[currentDate.getMonth()];
let currentYear = currentDate.getFullYear();
let display = document.querySelector("#day");
display.innerHTML = `${currentDay} ${date} ${currentMonth}  ${currentYear}`;

function time() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
  let time = `${hour}:${minute}`;
  return time;
}
document.getElementById("time").innerHTML = time();

function showWeahter(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  //console.log(response);
}

function searchCity(city) {
  let apiKey = "b49ebabb6ba777958eb2df291f29f025";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeahter);
}
//city-input
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
//location
function getLocation(position) {
  let apiKey = "b49ebabb6ba777958eb2df291f29f025";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeahter);
}

//current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
//listen to the city
let searchForm = document.querySelector("#cityForm");
searchForm.addEventListener("submit", handleSubmit);

//listen to current location
let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kiev");

function Icon(response) {
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
