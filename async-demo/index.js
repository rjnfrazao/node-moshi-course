
// Assyncronous demo application using named function
// This avoid nested callback function.

console.log('before');
getUser(1, getRepositories);    // Assyncronous function with callback function
console.log('after');           // 'after' will be displayed just afte 'before', while getUSer function is processing. 


// Second Step : Named callback function user at getUser function
function getRepositories (user) {
    gitRepositories(user,getCommits); // Call function to get the git repositories after reference getCommits
};

// Third step: After read repositories from user, this function is called to returs commits.
// Named callback function user at gitRepositories function
function getCommits (repos) {
    gitCommits(repos, displayCommits);
  
};

function displayCommits (commits) {
    console.log('Commits : ' + commits);  
};


// First step : get user data
function getUser(id, callback) {
    setTimeout(()=> {
        console.log('Reading user from DB...');
        callback ({ id:id, gitUser:'rjnfrazao'});
    },1000);

};



// Second step: get repositories from user
function gitRepositories(user, callback) {
    const repositories = ['repo1','repo2','repo3'];
    setTimeout(()=>{
        console.log('Reading repositories from user: '+ user.gitUser);
        callback (repositories);
    },1000);
};


function gitCommits(repo, callback) {
    
    setTimeout(()=>{
        const commits = ['commits1','commits2','commits3'];
        console.log('Reading commits from repository: '+ repo[0]);
        callback (commits);
    },1000);
};










