
const newYearsDate = '1 Jan 2022';

const daysel = document.getElementById('days');
const hoursel = document.getElementById('hours');
const minsel = document.getElementById('mins');
const secsel = document.getElementById('secs');

function countdown(){
    const newYears = new Date(newYearsDate);
    const currentDate = new Date();

    const diff = newYears - currentDate;

    const totalSeconds = diff / 1000;
    const days = Math.floor(totalSeconds/3600/24);
    const hours = Math.floor(totalSeconds/3600)%24;
    const minutes = Math.floor(totalSeconds/60)%60;
    const seconds = Math.floor(totalSeconds)%60;
    
    console.log(days,hours,minutes,seconds);

    daysel.innerHTML = days;
    hoursel.innerHTML = formatTime(hours);
    minsel.innerHTML = formatTime(minutes);
    secsel.innerHTML = formatTime(seconds);

}

function formatTime(time){
    return time < 10 ? `0${time}`: time;
}

// countdown();
setInterval(() => {
    countdown();    
}, 1000);