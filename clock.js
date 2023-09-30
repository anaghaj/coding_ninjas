var currTime = document.getElementById('currentTiming');
var btnStop;
let alarmDiv,newDiv,hoursDiv,minsDiv,secondDiv;//setting all variables
let alarmInterval;//for setting the interval for alarm time
const subMainDiv=document.querySelector('.subMain');
const setH = document.getElementById('alarmHours');//variable to access hours field
const setM = document.getElementById('alarmMins');//variable to access Minutes field
const setAP = document.getElementById('amOrPm');//variable to access am or pm field
var sound = new Audio("clock-alarm.mp3");
sound.loop = true;

//function to format time
function formatTime(time){
    
    //to preceed 0 before 1 to 9
    if(time<10)
        time='0'+time;

    return time;
}

//function to display clock
function timeUpdate(){
    var date=new Date(),hours=date.getHours(),amOrPm, minute=date.getMinutes(), seconds=date.getSeconds();

    //to convert to 12hours clock
    if(hours>12)
        hours=hours-12;

    //to find am or pm
    if(date.getHours()<12)
        amOrPm="AM";
    else
        amOrPm="PM"

    //formating the time

    currTime.innerText=formatTime(hours)+":"+formatTime(minute)+":"+formatTime(seconds)+" "+amOrPm;
}

setInterval(timeUpdate,1000);//to update each second

//function to set hours in setting alarm
function setHours(){
    for(var i = 1; i <= 12; i++) {//to set till 12
        var option = document.createElement('option');
        option.text = option.value = formatTime(i);
        setH.append(option);
    }
}

setHours();//call directly

//function to set Minutes in setting alarm
function setMins(){
    for(var i = 0; i < 60; i++) {//to set till 59
        var option = document.createElement('option');
        option.text = option.value = formatTime(i);
        setM.append(option);
    }
}

setMins();//call directly

//function to stop Alarm
function stopAlarm(){
    sound.pause();
    resetAlarm();//to reset once alarm is stoped
    subMainDiv.removeChild(document.querySelector('.stopBtn'));// to remove the  stop button added during alarm time
}

function createStopButton(){
     //to create a stop button
        console.log("here");
        btnStop = document.createElement('button');
        btnStop.className="stopBtn";
        btnStop.innerText="Stop Alarm";
        btnStop.addEventListener('click',stopAlarm);
        subMainDiv.removeChild(document.querySelector('.paraAlarm'));// to remove the text added with alarm time
        subMainDiv.append(btnStop);
        //console.log(btnStop.classList);

}

//function to set alarm
function setAlarm(){
    
    var selectedHour = setH.options[setH.selectedIndex].value;
    var selectedMin = setM.options[setM.selectedIndex].value;
    var selectedAP = setAP.options[setAP.selectedIndex].value;

    //disabling the alarm seting feature inorder not to set any others till the current alarm is completed
    setH.disabled=true;
    setM.disabled=true;
    setAP.disabled=true;
    document.getElementById('setAlarm').disabled=true;
    document.getElementById('resetAlarm').disabled=false;

    var alarmTime = selectedHour + ":" + selectedMin + ":00 " + selectedAP;
    console.log('alarmTime:' + alarmTime);

    //to add text with alarm timing
    var p=document.createElement('p');
    p.innerText="Alarm set for : "+ alarmTime;
    p.className='paraAlarm';
    subMainDiv.append(p);

    //var currentTime=hours+":"+date.getMinutes()+":"+date.getSeconds()+" "+amOrPm;
    console.log('currentTime:' + currTime.innerText);

    alarmInterval = setInterval(function(){
        if(alarmTime==currTime.innerText){
            console.log("its time");
            sound.play();
            document.getElementById('resetAlarm').disabled=true;// need to disable reset alarm as well
            createStopButton();
        }
    },1000);
}

function resetAlarm(){
    clearInterval(alarmInterval);//to clear the alarm alerady set
    setH.disabled=false;
    setM.disabled=false;
    setAP.disabled=false;
    document.getElementById('setAlarm').disabled=false;
    document.getElementById('resetAlarm').disabled=true;
    if(document.querySelector('.paraAlarm'))//to check if its already present
        subMainDiv.removeChild(document.querySelector('.paraAlarm'));// to remove the text added with alarm time
}
