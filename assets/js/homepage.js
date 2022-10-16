
// Get All the Repos By Users
var getUserRepos = function() {
    console.log("function was called");
    fetch("https://api.github.com/users/armyofunicorns/repos");
};
  
getUserRepos();