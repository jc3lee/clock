const myName = document.getElementById("username")
const myFocus = document.getElementById("currentFocus")
const myTime = document.getElementById("currentTime")
const myGreet = document.getElementById("greeting")
const mainBg = document.querySelector(".mainBg")
myName.addEventListener("keypress", setName)
myName.addEventListener("blur", setName)
myFocus.addEventListener("keypress", setFocus)
myFocus.addEventListener("blur", setFocus)

function updateTime() {
  let date = new Date()
  let hours = date.getHours()
  let mins = date.getMinutes()
  let secs = date.getSeconds()
  hours -= 2
  if (hours < 0) {
    hours += 23
  }
  let amPm = hours < 12 ? "AM" : "PM"
  hours = hours % 12 || 12
  myTime.innerHTML = `${addZero(hours)}:${addZero(mins)}:${addZero(secs)} ${amPm}`
  if (mins && secs === 0) {
    updateGreetAndBack()
  }
  setTimeout(updateTime, 1000)
}

function updateGreetAndBack() {
  console.log("updated greet")
  let date = new Date()
  let hours = date.getHours()
  document.body.style.color = "black"

  if (hours > 18 || hours < 5) {
    myGreet.textContent = "Good Evening,"
    mainBg.classList.remove("morning", "afternoon")
    mainBg.classList.add("evening")
    document.body.style.color = "white"
  } else if (hours < 12) {
    myGreet.textContent = "Good Morning,"
    mainBg.classList.remove("evening", "afternoon")
    mainBg.classList.add("morning")
  } else {
    myGreet.textContent = "Good Afternoon,"
    mainBg.classList.remove("morning", "evening")
    mainBg.classList.add("afternoon")
  }
}

function updateText() {
  let nameText = !localStorage.getItem("name") ? "[Enter Name]" : localStorage.getItem("name")
  let focusText = !localStorage.getItem("focus") ? "[Enter Focus]" : localStorage.getItem("focus")
  myName.innerHTML = nameText
  myFocus.innerHTML = focusText
}

function addZero(nbString) {
  return parseInt(nbString, 10) < 10 ? `0${nbString}` : nbString
}

function setName(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText)
      myName.blur()
    }
  } else {
    localStorage.setItem("name", e.target.innerText)
  }
}

function setFocus(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText)
      myFocus.blur()
    }
  } else {
    localStorage.setItem("focus", e.target.innerText)
  }
}

updateTime()
updateGreetAndBack()
updateText()