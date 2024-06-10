
let inputData = document.querySelector('.search-bar');
let searchBtn = document.querySelector('[search-btn]');
let nameOfUser = document.querySelector('[data-name]');
let displayedUsername = document.querySelector('[data-username]');
let joinedDate = document.querySelector('[data-joined-date]');
let userDesc = document.querySelector('[data-desc]');
let No_Repo = document.querySelector('[data-repo]');
let No_followers = document.querySelector('[data-followers]');
let No_following = document.querySelector('[data-following]');
let UserLocation = document.querySelector('[data-location]');
let blogLink = document.querySelector('[data-blog-link]');
let twitter = document.querySelector('[data-twitter]');
let companyName = document.querySelector('[data-company-name]');
let avatarImage = document.querySelector('[data-Userimage]');
let searchError = document.querySelector('.error');
let socialMediaSection = document.querySelector('.social-media-section');
let darkModeBtn = document.querySelector('.dark-mode-btn');
let moonBtn = document.querySelector('.moon');
let sunBtn = document.querySelector('.sun');
let DarkText = document.querySelector('.dark-text');
let root = document.querySelector(':root');



// initial variables
let userName = 'Rahilsamani' ;
const url = "https://api.github.com/users/";
let darkMode = false ;


// shuru mein pranay ka display karna hai
getTheData();


// handles when username is empty
function checkUsername(name){
    if(name === '')
        return
    else
        getTheData();
}


// when user press enter after giving input
inputData.addEventListener('keypress', (event) => {
    if(event.key === "Enter"){
        userName = inputData.value.toLowerCase();
        checkUsername(userName);
    }
})


// search button par click karne ke baad
searchBtn.addEventListener('click', () => {
    userName = inputData.value.toLowerCase();
    checkUsername(userName);
});

function darkTheme(){
    root.style.setProperty('--bg-bluishWhite', '#141D2F');
    root.style.setProperty('--white', '#1E2A47');
    root.style.setProperty('--text-dBlue', 'white');
    root.style.setProperty('--black-text', 'white');
    root.style.setProperty('--lm-icon-bg', 'brightness(1000%)');
}

function whiteTheme(){
    root.style.setProperty('--bg-bluishWhite', '#F6F8FF');
    root.style.setProperty('--white', '#FEFEFE');
    root.style.setProperty('--text-dBlue', '#4B6A9B');
    root.style.setProperty('--black-text', '#000000');
    root.style.setProperty('--lm-icon-bg', 'brightness(100%)');
}

// Event listner on dark mode
darkModeBtn.addEventListener('click', () => {
    if(darkMode === false){
        darkMode = true;
        DarkText.innerText = 'Light';
        sunBtn.classList.toggle('active');
        moonBtn.classList.toggle('active');
        darkTheme();
    }
    else{
        darkMode = false;
        DarkText.innerText = 'Dark';
        sunBtn.classList.toggle('active');
        moonBtn.classList.toggle('active');
        whiteTheme();
    }
});

// this function will get the data from the API
async function getTheData(){
    try{
        let response = await fetch(url.concat(userName));
        if(!(response.status >= 200 && response.status <= 299)){
            searchError.classList.add('active');
            return;
        }
        else{
            searchError.classList.remove('active');
            let data = await response.json();
            handlingUI(data);
        }
    }
    catch(err){
        prompt(err);
    }

}

function checkAvailabilitySocial(param, data){
    if(data === '' || data === null){
        param.style.opacity = 0.5;
        if(param === userDesc){
            console.log('I am userDesc');
            return 'This profile has no bio';
        }
        param.previousElementSibling.style.opacity = 0.5;
        return 'Not available'
    }
    else
        return data;
}

function beautifyDay(day){
    if(day<10)
        day = '0' + day;
    return day;
}

function handlingUI(data){
    // Name of the user
    nameOfUser.innerText = data?.name === null ? data?.login : data?.name ;

    // display username
    displayedUsername.innerText = `@${data?.login}` ;
    displayedUsername.href = data?.html_url ;

    // joined date
    const date = new Date(data?.created_at);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let day = date.getUTCDate();
    joinedDate.innerText = `Joined ${beautifyDay(day)} ${months[date.getUTCMonth()]} ${date.getFullYear()}`;

    // Description
    userDesc.innerText = checkAvailabilitySocial(userDesc, data?.bio) ;

    // number of repository
    No_Repo.innerText = data?.public_repos ;

    // number of followers
    No_followers.innerText = data?.followers ;

    // number of following
    No_following.innerText = data?.following ;

    // location
    UserLocation.innerText = checkAvailabilitySocial(UserLocation, data?.location) ;

    // blog
    blogLink.innerText = checkAvailabilitySocial(blogLink, data?.blog) ;
    blogLink.href = data?.blog ;

    // twitter
    twitter.innerText =  checkAvailabilitySocial(twitter, data?.twitter_username) ;
    twitter.href = `https://twitter.com/${data?.twitter_username}` ;

    // company
    companyName.innerText =  checkAvailabilitySocial(companyName, data?.company);

    // Image
    avatarImage.src = data?.avatar_url ;
    
}





















