const startButton = document.getElementById("startTimer");
const active = document.getElementById("activeTimers");
displayNoTimetTxt();
// add listener event on button
startButton.addEventListener("click", timerFunction);
let activeTimer = false;

function timerFunction() {
  // get values of hh, mm, ss to convert number
  const hour = parseInt(document.getElementById("hours").value) || 0;
  const minute = parseInt(document.getElementById("minutes").value) || 0;
  const second = parseInt(document.getElementById("seconds").value) || 0;

  // calculate the total seconds
  const totalSeond = hour * 3600 + minute * 60 + second;
  if (totalSeond > 0) {
    createNewTime(totalSeond);
    activeTimer = true;
    removeTimers();
  }
}

function createNewTime(totalSeond) {
  // create multiple timer section
  const timeContainer = document.createElement("div");
  timeContainer.classList.add("timer-container");

  // create left timer section and add inner text
  const timerLeft = document.createElement("div");
  timerLeft.classList.add("timer-left");
  timerLeft.innerText = "Time Left :";

  // create display timer element
  const timerElement = document.createElement("div");
  timerElement.classList.add("timer");

  // create a container for timer control buttons
  const timerControls = document.createElement("div");
  timerControls.classList.add("timer-controls");

  // create the 'Stop Timer' button
  const stopButton = document.createElement("button");
  stopButton.classList.add("control-button", "delete-button");
  stopButton.textContent = "Delete";

  // create the 'Delete' button, Initially, hide the delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("control-button", "stop-button");
  deleteButton.textContent = "Stop";
  deleteButton.style.display = "none";

  let timerInterval;
  // update timer to display each seconds
  function updateTimerDisplay() {
    totalSeond--;
    if (totalSeond < 0) {
      clearInterval(timerInterval);
      timerElement.classList.add("timer-ended");
      timeContainer.classList.add("delete-button");
      timerElement.textContent = "Timer Is Up!";
      stopButton.style.display = "none";
      deleteButton.style.display = "inline";
      timerLeft.style.display = "none";
      // play the audio alert at end of the time
      playAudio();
    } else {
      timerElement.textContent = formatTime(totalSeond);
    }
  }

  // add click event listener to the 'Stop Timer' button
  stopButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timeContainer.remove();
    activeTimer = false;
    if (active.children.length === 0) {
      displayNoTimetTxt();
    }
  });

  // add event listener remove the timer container
  deleteButton.addEventListener("click", () => {
    timeContainer.remove();
    if (active.children.length === 0) {
      displayNoTimetTxt();
    }
  });

  timerInterval = setInterval(updateTimerDisplay, 1000);

  // append timer control elements to the timer container
  timerControls.appendChild(stopButton);
  timerControls.appendChild(deleteButton);

  // append timer elements to the timer container
  timeContainer.appendChild(timerLeft);
  timeContainer.appendChild(timerElement);
  timeContainer.appendChild(timerControls);

  // append the timer container to the 'activeTimers' element
  active.appendChild(timeContainer);
}

function displayNoTimetTxt() {
  const timerTxt = document.createElement("p");
  timerTxt.classList.add("timers-text");
  timerTxt.textContent = "You have no timers currently!";
  timerTxt.style.fontSize = "14px";
  active.appendChild(timerTxt);
}

function removeTimers() {
  // remove the "You have no timers currently!" text on new timer button click
  const timersTxt = active.querySelector(".timers-text");
  if (timersTxt) {
    timersTxt.remove();
  }
}
// play the audio on when timer ends
function playAudio() {
  const audio = new Audio("./alert.mp3"); // file path of audio
  audio.play();
}

function formatTime(second) {
  const h = Math.floor(second / 3600);
  const m = Math.floor((second % 3600) / 60);
  const s = second % 60;
  return `${h.toString().padStart(2, "0")} : ${m
    .toString()
    .padStart(2, "0")} : ${s.toString().padStart(2, "0")} `;
}
