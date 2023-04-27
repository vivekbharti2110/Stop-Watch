//stopWatch code logic in Vanilla JS by $YASH
'use strict';

let startButton = document.getElementById("start");

let resetButton = document.getElementById("reset");

let stopButton = document.getElementById("stop");

let extraMessage = document.getElementById("extra-message");

let lapList = document.getElementById("lap-list");

let stateOfWatch = "Not Running"; 

let intervalId = null;

let lapCount = 0;
let stop = () => {
    //stop the setInterval() call made when start button is pressed
    if(intervalId != null)
        clearInterval(intervalId);
    //marking stateofWatch as stopped
    stateOfWatch = "Stopped"; 
    //resetting value of extra message
    extraMessage.innerText = "";

};
let updateElement = (element, data) => {
    let htmlElement = document.getElementById(element);
    //rendering element, if value of data is 2 digit number then render it directly
    if(data > 9)
        htmlElement.innerText = data;
    
    //if not then render data with 0 prefix
    else
        htmlElement.innerText = "0" + data;
    
}
let extraMessageSender= (message) => {
    extraMessage.innerText = message;
    //extra message set to disappear after 5 seconds
    setTimeout(() => {
        extraMessage.innerText = "";
    }, 5000);
}
//Handling start button functionality
startButton.addEventListener("click", () => {
    //checking if startButton is clicked or not
    if(stateOfWatch === "Not Running" || stateOfWatch === "Stopped"){
        //fetching current values of hour, min, second and parsing them to integer for arithmetical use
        //i.e. to start the timer from where it was stopped
        let hrInfo = parseInt(document.getElementById("hr").innerText);
        let minInfo = parseInt(document.getElementById("min").innerText);
        let secInfo = parseInt(document.getElementById("sec").innerText);
        //fetching id of the setInterval() call in variable `intervalId`, so that setInterval() function call
        //can be stopped using clearInterval() call
        //setting up setInterval () to make call to the callback function after 1 second interval  
        intervalId = setInterval(() => {
            secInfo ++;
            //if 60seconds are up then set seconds to 0 and incerment min
            if(secInfo == 60){
                secInfo = 0;
                minInfo ++;
            }
            //if 60 minutes are up then set minutes to 0 and increment hour
            if(minInfo == 60){
                minInfo = 0;
                hrInfo ++;
            }
            updateElement("sec", secInfo);
            updateElement("min", minInfo);
            updateElement("hr", hrInfo);
        }, 1000);

        //marking stateofWatch as running
        stateOfWatch = "Running";
    }
    //if startButton is clicked once then it should not invoke setInterval() twice
    else{
        //alert("timer is already running");
       
        extraMessageSender("timer is already running");

    }
});
//Handling stop button functionality
stopButton.addEventListener("click", ()=>{
    if(stateOfWatch === "Running"){
        startButton.innerText = "resume";
        stop();
        lapCount++;
        let hrInfo = parseInt(document.getElementById("hr").innerText);
        let minInfo = parseInt(document.getElementById("min").innerText);
        let secInfo = parseInt(document.getElementById("sec").innerText);
        const li = document.createElement('li');
        li.innerHTML = `Lap Number ${lapCount} at ${hrInfo}hr:${minInfo}min:${secInfo}sec`;
        lapList.append(li);
    }else{
        extraMessageSender("timer is not running");
    }
});
//Handling reset button functionality
resetButton.addEventListener("click", () => {
    //resetting the values of hour, minutes, seconds
    updateElement("sec", 0);
    updateElement("min", 0);
    updateElement("hr", 0);
    //restting Lap List
    lapCount = 0;
    lapList.innerHTML = `<h3>Lap List</h3>`;
    startButton.innerText = "start";
    stop();
    //resetting state of Watch
    stateOfWatch = "Not Running"
});
