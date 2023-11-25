function createGlitchText(values, page) {
  const style = document.createElement("style");
  style.innerHTML = `
        @keyframes glitch {
            0%, 14% {
                text-shadow: 0.05em 0 0 ${values.shadowColor1},
                -0.05em -0.025em 0 ${values.shadowColor2},
                -0.025em 0.05em ${values.shadowColor3};
            }
            15%, 49% {
                text-shadow: -0.05em -0.025em 0 ${values.shadowColor1},
                0.025em 0.025em 0 ${values.shadowColor2},
                -0.05em -0.05em 0 ${values.shadowColor3};
            }
            50%, 99% {
                text-shadow: 0.025em 0.05em 0 ${values.shadowColor1},
                0.05em 0 0 ${values.shadowColor2},
                0 -0.05em 0 ${values.shadowColor3};
            }
            100% {
                text-shadow: -0.025em 0 0 ${values.shadowColor1},
                -0.025em -0.025em 0 ${values.shadowColor2},
                -0.025em -0.05em 0 ${values.shadowColor3};
            }
        }
    `;
  document.head.appendChild(style);

  const glitchContainer = document.getElementsByClassName("glitch")[0];
  glitchContainer.innerHTML = "";
  glitchContainer.innerHTML =
    '<span aria-hidden="true" class="glitch-span">' +
    values.text +
    "</span>" +
    values.text +
    '<span aria-hidden="true" class="glitch-span">' +
    values.text +
    "</span>";
  const span1 = document.getElementsByClassName("glitch-span")[0];
  const span2 = document.getElementsByClassName("glitch-span")[1];

  glitchContainer.style.fontSize = values.textSize + "rem";
  glitchContainer.style.fontWeight = values.textWeight;
  glitchContainer.style.textTransform = "uppercase";
  glitchContainer.style.position = "relative";
  glitchContainer.style.color = values.textColor;
  glitchContainer.style.animation = `glitch ${values.animationTime1}ms infinite`;

  span1.style.animation = `glitch ${values.animationTime2}ms infinite`;
  span1.style.clipPath = "polygon(0 0, 100% 0, 100% 45%, 0 45%)";
  span1.style.transform = `translate(${values.offsetX1}em, ${values.offsetX1}em)`;
  span1.style.opacity = "0.8";
  span1.style.position = "absolute";
  span1.style.top = "0";
  span1.style.left = "0";

  span2.style.animation = `glitch ${values.animationTime3}ms infinite`;
  span2.style.clipPath = "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)";
  span2.style.transform = `translate(${values.offsetX2}em, ${values.offsetX2}em)`;
  span2.style.opacity = "0.8";
  span2.style.position = "absolute";
  span2.style.top = "0";
  span2.style.left = "0";
  if (page == 1) {
    insertDB(values);
  }
}

function submitForm() {
  var text = document.getElementById("text").value;
  var textSize = document.getElementById("textSize").value;
  var textWeight = document.getElementById("textWeight").value;
  var textColor = document.getElementById("textColor").value;
  var shadowColor1 = document.getElementById("shadowColor1").value;
  var shadowColor2 = document.getElementById("shadowColor2").value;
  var shadowColor3 = document.getElementById("shadowColor3").value;
  var animationTime1 = document.getElementById("animationTime1").value;
  var animationTime2 = document.getElementById("animationTime2").value;
  var animationTime3 = document.getElementById("animationTime3").value;
  var offsetX1 = document.getElementById("offsetX1").value;
  if (!validateOffset(offsetX1)) return;
  var offsetY1 = document.getElementById("offsetY1").value;
  if (!validateOffset(offsetY1)) return;
  var offsetX2 = document.getElementById("offsetX2").value;
  if (!validateOffset(offsetX2)) return;
  var offsetY2 = document.getElementById("offsetY2").value;
  if (!validateOffset(offsetY2)) return;

  createGlitchText(
    {
      text: text,
      textSize: textSize,
      textWeight: textWeight,
      textColor: textColor,
      shadowColor1: shadowColor1,
      shadowColor2: shadowColor2,
      shadowColor3: shadowColor3,
      animationTime1: animationTime1,
      animationTime2: animationTime2,
      animationTime3: animationTime3,
      offsetX1: offsetX1,
      offsetY1: offsetY1,
      offsetX2: offsetX2,
      offsetY2: offsetY2,
    },
    1
  );
}

function validateOffset(inputField) {
  parseInt(inputField);
  if (inputField < -0.05 || inputField > 0.05) {
    alert("Please enter an offset between -0.05 and 0.05.");
    return false;
  }
  return true;
}

function insertDB(inputObject) {
  var jsonString = JSON.stringify(inputObject);
  fetch(`database.php?action=insert&data=${encodeURIComponent(jsonString)}`)
    .then((response) => response.text())
    .then(data)
    .catch((error) => console.error("Error:", error));
}

function retrieveDB() {
  fetch("database.php?action=retrieve")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        const formattedData = data[0];
        createGlitchText(formattedData, 2);
      }
    })
    .catch((error) => console.error("Error in retrieveDB:", error));
}
