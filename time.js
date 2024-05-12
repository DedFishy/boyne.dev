const time_element = document.getElementById("clock-time");

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm.toUpperCase();
    return strTime;
  }

function calcTime(offset) {
// create Date object for current location
var d = new Date();

// convert to msec
// subtract local time zone offset
// get UTC time in msec
var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

// create new Date object for different city
// using supplied offset
var nd = new Date(utc + (3600000*offset));

// return time as a string
return nd
}

function update_time() {
    const date = calcTime(-4);
    time_element.innerHTML = formatAMPM(date);
}

update_time()

setInterval(update_time, 1000*60)