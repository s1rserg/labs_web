const anim = document.getElementById("anim");
const squareSize = 30;
const delay = 50;
let redStep;
let greenStep;
let redSquare;
let greenSquare;
let redDirection;
let greenDirection;
let animationTimeoutId;
let messageNumber;
let messageNumber2;
const logContainer = document.getElementById("log");
const logEntry = document.createElement("div");

function createAnim() {
  let posX = Math.floor(Math.random() * (anim.clientWidth - 1.5 * squareSize));
  let posY = Math.floor(Math.random() * (anim.clientHeight - 1.5 * squareSize));
  redSquare.style.left = `${posX}px`;
  redSquare.style.top = `${posY}px`;

  posX = Math.floor(Math.random() * (anim.clientWidth - 1.5 * squareSize));
  posY = Math.floor(Math.random() * (anim.clientHeight - 1.5 * squareSize));
  greenSquare.style.left = `${posX}px`;
  greenSquare.style.top = `${posY}px`;

  anim.appendChild(redSquare);
  anim.appendChild(greenSquare);
}

function animateSquares() {
  let redM = "",
    greenM = "";
  posX = parseInt(redSquare.style.left);
  posY = parseInt(redSquare.style.top);
  if (
    posX + redDirection.x <= 0 ||
    posX + redDirection.x >= anim.clientWidth - squareSize
  ) {
    redM = "red collided with left/right wall";
    redDirection.x = -redDirection.x;
  } else if (
    posY + redDirection.y <= 0 ||
    posY + redDirection.y >= anim.clientHeight - squareSize
  ) {
    redM = "red collided with top/bottom wall";
    redDirection.y = -redDirection.y;
  } else {
    redDirection = changeDirectionClockwise(redDirection, maxStepRed);
  }
  redM += `red walked x: ${redDirection.x}px, y: ${redDirection.y}px`;
  redSquare.style.left = `${posX + redDirection.x}px`;
  redSquare.style.top = `${posY + redDirection.y}px`;

  posX = parseInt(greenSquare.style.left);
  posY = parseInt(greenSquare.style.top);
  if (
    posX + greenDirection.x <= 0 ||
    posX + greenDirection.x >= anim.clientWidth - squareSize
  ) {
    greenM = "green collided with left/right wall";
    greenDirection.x = -greenDirection.x;
  } else if (
    posY + greenDirection.y <= 0 ||
    posY + greenDirection.y >= anim.clientHeight - squareSize
  ) {
    greenM = "green collided with top/bottom wall";
    greenDirection.y = -greenDirection.y;
  } else {
    greenDirection = changeDirectionClockwise(greenDirection, maxStepGreen);
  }
  greenM += `green walked x: ${greenDirection.x}px, y: ${greenDirection.y}px`;
  log(redM + greenM);
  greenSquare.style.left = `${posX + greenDirection.x}px`;
  greenSquare.style.top = `${posY + greenDirection.y}px`;
  if (!collisionDetected()) {
    animationTimeoutId = setTimeout(animateSquares, delay);
  } else {
    document.getElementById("start").style.display = "none";
    document.getElementById("reload").style.display = "inline-block";
    log("Collision detected.");
  }
}

function changeDirectionClockwise(direction, maxStep) {
  if (direction.x != 0) {
    if (direction.x < 0) {
      // left to up
      direction.y = direction.x;
      direction.x = 0;
    } else {
      // right to down
      direction.y = direction.x;
      direction.x = 0;
    }
  } else {
    if (direction.y < 0) {
      // up to right
      direction.x = -direction.y;
      direction.y = 0;
    } else {
      // down to left
      direction.x = -direction.y;
      direction.y = 0;
    }
  }
  if (Math.abs(direction.x) == maxStep || Math.abs(direction.y) == maxStep) {
    return direction;
  }
  if (direction.x != 0) {
    if (direction.x < 0 && direction.x > -maxStep) {
      direction.x -= 1;
    } else if (direction.x < maxStep) {
      direction.x += 1;
    }
  } else {
    if (direction.y < 0 && direction.y > -maxStep) {
      direction.y -= 1;
    } else if (direction.y < maxStep) {
      direction.y += 1;
    }
  }
  return direction;
}

function collisionDetected() {
  const redRect = redSquare.getBoundingClientRect();
  const greenRect = greenSquare.getBoundingClientRect();

  return (
    redRect.left < greenRect.right &&
    redRect.right > greenRect.left &&
    redRect.top < greenRect.bottom &&
    redRect.bottom > greenRect.top
  );
}

function createSquare(color) {
  const square = document.createElement("div");
  square.className = `square ${color}`;
  square.style.width = `${squareSize}px`;
  square.style.height = `${squareSize}px`;
  square.style.position = "absolute";
  return square;
}

function startAnimation() {
  animationRunning = true;
  animateSquares();
}

function stopAnimation() {
  animationRunning = false;
  clearTimeout(animationTimeoutId);
}

function reloadAnimation() {
  animationRunning = false;
  clearLog();
  createAnim();
  startAnimation();
}

document.getElementById("play").addEventListener("click", function () {
  messageNumber = 1;
  messageNumber2 = 1;
  localStorage.clear();
  document.getElementById("fifth").innerHTML = "";
  deleteDB();
  this.disabled = true;
  work.style.display = "block";
  anim.innerHTML = "";
  animationRunning = false;
  maxStepRed = Math.floor(anim.clientHeight / 3) - 10;
  maxStepGreen = Math.floor(anim.clientHeight / 3) - 30;
  redDirection = { x: 10, y: 0 };
  greenDirection = { x: 10, y: 0 };
  redSquare = createSquare("red");
  greenSquare = createSquare("green");
  setTimeout(function () {
    log("Play button clicked");
  }, 200);
  createAnim();
});

document.getElementById("start").addEventListener("click", function () {
  log("Start button clicked");
  if (!animationRunning) {
    startAnimation();
    document.getElementById("reload").style.display = "none";
  }
  this.disabled = true;
});

document.getElementById("reload").addEventListener("click", function () {
  log("Reload button clicked");
  redDirection = { x: 10, y: 0 };
  greenDirection = { x: 10, y: 0 };
  reloadAnimation();
  document.getElementById("start").disabled = true;
  document.getElementById("start").style.display = "inline-block";
  this.style.display = "none";
});

document.getElementById("close").addEventListener("click", function () {
  log("Close button clicked");
  stopAnimation();
  document.getElementById("play").disabled = false;
  document.getElementById("start").disabled = false;
  document.getElementById("work").style.display = "none";
  readMessagesAndSendToPHP();
  setTimeout(function () {
    fetchDataAndCreateTable("fifth");
  }, 1000);
});

function log(message) {
  logEntry.textContent = message;
  logContainer.innerHTML = "";
  logContainer.appendChild(logEntry);
  saveMessageToLocalStorage(message);
  sendOneMessageDB(message);
}

function clearLog() {
  const logContainer = document.getElementById("log");
  logContainer.innerHTML = "";
}

function saveMessageToLocalStorage(messageText) {
  const currentTime = new Date();
  const utcOffset = 2 * 60;
  const localTime = new Date(currentTime.getTime() + utcOffset * 60 * 1000);
  const messageKey = `m${messageNumber}`;
  const messageInfo = {
    number: messageNumber,
    text: messageText,
    timestamp: localTime.toISOString(),
  };
  localStorage.setItem(messageKey, JSON.stringify(messageInfo));
  messageNumber++;
}

function readMessagesAndSendToPHP() {
  const messagesArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("m")) {
      const messageInfo = JSON.parse(localStorage.getItem(key));
      messagesArray.push(messageInfo);
    }
  }
  messagesArray.sort((a, b) => {
    const keyA = parseInt(a.number, 10);
    const keyB = parseInt(b.number, 10);
    return keyA - keyB;
  });

  insertDB(messagesArray);
}

function insertDB(inputArray) {
  const chunkSize = 10;
  const totalChunks = Math.ceil(inputArray.length / chunkSize);

  function processChunk(chunkIndex) {
    const start = chunkIndex * chunkSize;
    const end = Math.min((chunkIndex + 1) * chunkSize, inputArray.length);
    const chunkData = inputArray.slice(start, end);
    const jsonString = JSON.stringify(chunkData);

    fetch(`database.php?action=insert&data=${encodeURIComponent(jsonString)}`, {
      method: "POST",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(
          `Chunk ${chunkIndex + 1}/${totalChunks} sent. Response:`,
          data
        );
        if (chunkIndex < totalChunks - 1) {
          processChunk(chunkIndex + 1);
        } else {
          console.log("All chunks processed successfully.");
        }
      })
      .catch((error) => {
        console.error(`Error sending chunk ${chunkIndex + 1}:`, error);
      });
  }
  processChunk(0);
}

function deleteDB() {
  fetch("database.php?action=delete")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      if (data && data.length > 0) {
        try {
          const jsonData = JSON.parse(data);
          console.log(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}

function sendOneMessageDB(messageText) {
  const currentTime = new Date();
  const utcOffset = 2 * 60;
  const localTime = new Date(currentTime.getTime() + utcOffset * 60 * 1000);
  const messageInfo = {
    number: messageNumber2,
    text: messageText,
    timestamp: localTime.toISOString(),
  };
  messageNumber2++;
  var jsonString = JSON.stringify(messageInfo);

  fetch(`database.php?action=insert2&data=${encodeURIComponent(jsonString)}`)
    .then((response) => response.text())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => console.error("Error:", error));
}

async function fetchDataAndCreateTable(containerId) {
  const container = document.getElementById(containerId);
  const dataFromDB1 = await fetchDataFromDatabase(
    "database.php?action=retrieve&db=2"
  );
  setTimeout(async function () {
    const dataFromDB2 = await fetchDataFromDatabase(
      "database.php?action=retrieve&db=1"
    );
    const combinedData = combineData(dataFromDB1, dataFromDB2);
    const table = createTable(combinedData);
    container.appendChild(table);
  }, 1000);
}

async function fetchDataFromDatabase(databaseUrl) {
  try {
    const response = await fetch(databaseUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function combineData(dataFromDB1, dataFromDB2) {
  const combinedData = [];
  const maxLength = Math.max(dataFromDB1.length, dataFromDB2.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < dataFromDB1.length) {
      combinedData.push(dataFromDB1[i]);
    }
    if (i < dataFromDB2.length) {
      combinedData.push(dataFromDB2[i]);
    }
  }

  return combinedData;
}

function createTable(data) {
  const table = document.createElement("table");
  const headerRow = table.insertRow(0);
  const headers = ["Number", "Message", "Timestamp"];

  headers.forEach((headerText, index) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  data.forEach((rowData) => {
    const row = table.insertRow(-1);
    const cells = ["number", "message", "time"];

    cells.forEach((cellName) => {
      const cell = row.insertCell(-1);
      cell.textContent = rowData[cellName];
    });
  });

  return table;
}
