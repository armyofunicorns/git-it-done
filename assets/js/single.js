/* File created by Anthony Hall on March 19, 2023 */
/* Updated on March 23, 2023 */

var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var queryString = document.location.search;
var repoNameEl = document.querySelector("#repo-name");
var backButtonEl = document.querySelector("#btn-back");

var displayWarning = function(repo) {
    limitWarningEl.textContent = "To see more than 30 entries, visit...";

    var linkEl = document.createElement("a");
    linkEl.textContent = "More at GitHub.com.";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
};

var getRepoName = function(queryString) {
    var repoName = queryString.split("=")[1];
    if (repoName) {
        getRepoIssues(repoName);
        // Update the text on the page.
        repoNameEl.textContent = repoName;
        backButtonEl.setAttribute("href", "./index.html?repo=" + repoName);
        backButtonEl.setAttribute("target", "_self");
    } else {
        document.location.replace("./index.html?err=nogo");
    };
};

var getRepoIssues = function(repo) {
    // console.log("start getRepoIssues... " + repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // console.log(apiUrl);

    // fetch(apiUrl);

    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayIssues(data);

                    // check if api has paginated issues
                    if (response.headers.get("Link")) {
                        // console.log("repo has more than 30 issues");
                        displayWarning(repo);
                    }
                });
            }
            else {
                alert("Your request...no dice!");
            }
      })
        .catch(function(error) {
            // if not successful, redirect to homepage
            document.location.replace("./index.html");
        });
    };

var displayIssues = function(issues) {
    // console.log("start displayIssues");
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // console.log(i);
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
        typeEl.textContent = "(Pull request)";
        } else {
        typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    };
};

// 
getRepoName(queryString);
// getRepoIssues("openai/openai-cookbook");

