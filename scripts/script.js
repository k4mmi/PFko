/****************************** MENU ******************************/

let menuStatus;

function openCloseMenu() {

    // This will check if is the menu already opened

    if (menuStatus === true) {
        document.getElementById("menu").style.display = "none";
        return menuStatus = false;
    } else {
        document.getElementById("menu").style.display = "flex";
        return menuStatus = true;
    }

}

/****************************** PARAMS CATCHING and SETTINGS ******************************/

const urlCatch = document.URL;

// User config
let userConfig = {
    color: undefined,
    snow: false
};

function getParams() {
     
    let url = new URL(document.URL);
    
    c = url.searchParams.get("c"); // Add hash
    s = url.searchParams.get("s");

    // Redefine variables from params
    if (c !== null) {
        
        userConfig.color = "#" + c; // Add hash
    }
    
    if (s == "true") {
        
        userConfig.snow = true;

    } else if (s == "false") {

        userConfig.snow = false;

    }
}

getParams();

function onloadSetting() {
    
    if (userConfig.color == undefined) {
        
        userConfig.color = colorCatcher();
        
        if (userConfig.color == "#000000") {
            
            userConfig.color = randomColor();
            colorChanger(userConfig.color); 
            
        } else {
            
            colorChanger(userConfig.color); 
            
        }
    }    

    if (userConfig.snow === true) {

        document.getElementById("snow").style.display = "block";
        document.getElementById("snow-btn-img").src = "images/icons/snow_true.svg";
        
    }
}

function snowHide() {
    // This will check if is snowing right now
    if (userConfig.snow === false) {
        
        // Hide snow
        document.getElementById("snow").style.display = "block";
        
        // Change icon
        document.getElementById("snow-btn-img").src = "images/icons/snow_true.svg";
        return userConfig.snow = true;
    } else {
        // Hide snow
        document.getElementById("snow").style.display = "none";
        
        // Change icon
        document.getElementById("snow-btn-img").src = "images/icons/snow_false.svg";
        return userConfig.snow = false;
    }
}


// This function catching user input from color input
function colorCatcher() {

    userConfig.color = document.getElementById("color-input").value;
    console.log("New color: "+userConfig.color);

    return userConfig.color;

}

// This function define color variable for css in document
function colorChanger(input = userConfig.color) {

    document.documentElement.style.setProperty('--setColor', input);
}

// Random color generator
function randomColor() {
    
    // Define random number variable
    let randomNum;
    
    // Define random color hex code variable
    let randomColorHex = "#";
    
    for (let i = 1; i <= 3; ++i) {
        
        // Genarate number "0" or "1"
        randomNum = Math.round(Math.random());
        
        // Number 0 is for "0" and number 1 is for "f"
        if (randomNum === 0) {
            randomColorHex = randomColorHex + "0";
        } else {
            randomColorHex = randomColorHex + "f";
        }
        
        // If will be the random color black, this will regenerate the color to better color
        if (randomColorHex === "#000") {
            randomColorHex = "#";
            i = 0;
            // console.log("Illegal random color detected.")
        }
        
    }
    
    console.log("Random color: " + randomColorHex);
    
    return randomColorHex;
}

// This will load new color after load of document
window.onload = colorChanger();

/****************************** URL COPY ******************************/

let url

// This function will creat url from user settings (snow... and stuff like that)
function urlParams() {

    url = urlCleaner(document.URL)
    return url = url + "?c=" + userConfig.color.slice(1) + "&s=" + userConfig.snow;
}

// This function cleans the url from old params, this will make link useful on github hosting and local host
function urlCleaner(input) {

    // Find the "?"
    let paramsFind = input.indexOf("?");

    // If was "?" found, delete the params 
    if (paramsFind !== -1) {
        return input.slice(0, paramsFind);
    }

    // Return non-changed url
    return input;

    // Delete the params and return
}

// This function save into user's clipboard whatever u want
function copy(input) {
    navigator.clipboard.writeText(input);
    console.log("Link copied: " + input);
}

/****************************** YEAR ******************************/

// Get the 
const date = new Date();

function dateDisplay() {

    // Set year and month
    let year = date.getFullYear();
    let month = date.getMonth();

    if (month < 11 ) {

        // Normal year display
        document.getElementById("heading-text").innerHTML = "PF" + year;
        document.getElementById("title").innerHTML = "PF" + year;
    } else {
        year = ++year;

        // Add one year before New year
        document.getElementById("heading-text").innerHTML = "PF" + year;
        document.getElementById("title").innerHTML = "PF" + year;
    }
}

/****************************** ONLOAD ******************************/

// Place here evrything what u want start afster load of window
window.onload = function(){

    onloadSetting();
    dateDisplay()
}
