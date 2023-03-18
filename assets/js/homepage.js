/* Created by Anthony Hall
Updated on March 17, 2023 */

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

// Get All the Repos By Users
var getUserRepos = function(user) {
    console.log("start");

    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    
    // var response = fetch("https://api.github.com/users/armyofunicorns/repos");
    // console.log(response);
    // fetch("https://api.github.com/users/armyofunicorns/repos").then(function(response) {
    //     response.json().then(function(data) {
    //         console.log(data);
    //     });    
    // });
     
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        });
    });
    console.log("outside");
};

userFormEl.addEventListener("submit", formSubmitHandler);
// getUserRepos(username);