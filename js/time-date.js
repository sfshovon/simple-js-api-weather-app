const displayTime = document.querySelector(".display-time");
// Time
function showTime() {
  let time = new Date();
  displayTime.innerText = time.toLocaleTimeString("en-US", { hour12: true });
  setTimeout(showTime, 1000);
}

showTime();

// Day & Date 
function updateDate() {
  let today = new Date();

  let dayName = today.getDay(),
      dayNum = today.getDate(),
      month = today.getMonth(),
      year = today.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dateTime = ["day", "daynum", "month", "year"];
  const value = [dayWeek[dayName], dayNum, months[month], year];
  for (let i = 0; i < dateTime.length; i++) {
    document.getElementById(dateTime[i]).firstChild.nodeValue = value[i];
  }
}

updateDate();
