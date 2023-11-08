"use strict";
const ellipseR = 10;
const ellipser = 5;
const divs = {
  1: "first",
  2: "second",
  3: "third",
  4: "fourth",
  5: "fifth",
  6: "sixth",
  7: "seventh",
};

swapDivs();
const originalContent = [];
for (let i = 1; i <= 7; i++) {
  originalContent[i] = document.getElementsByClassName(divs[i])[0].innerHTML;
}

function swapDivs() {
  // task 1
  let div4 = document.getElementsByClassName("fourth")[0];
  let div5 = document.getElementsByClassName("fifth")[0];
  let temp = div4.innerHTML;
  div4.innerHTML = div5.innerHTML;
  div5.innerHTML = temp;
}

function calculateEllipseArea() {
  // task 2
  let area = Math.PI * ellipseR * ellipser;
  let div3 = document.getElementsByClassName("third")[0];
  div3.innerHTML += "The area of the ellipse is: " + area;
}

calculateEllipseArea();

function countWords() {
  // task 3
  let text = document.getElementById("text").value;
  let words = text.split(/\s+/).filter(function (word) {
    return word.length > 0;
  });

  let wordCount = words.length;
  alert("Word count: " + wordCount);
  document.cookie = "wordCount=" + wordCount;
}

window.onload = function () {
  // task 3
  if (
    document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("wordCount="))
  ) {
    let deleteData = confirm("Do you want to delete the data from cookies?");

    if (deleteData) {
      document.cookie =
        "wordCount=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      location.reload();
    } else {
      alert("Cookies are present. Please reload the page.");
    }
  }

  // task 4
  let div3 = document.getElementsByClassName("third")[0];
  let div4 = document.getElementsByClassName("fourth")[0];
  let div5 = document.getElementsByClassName("fifth")[0];

  if (localStorage.getItem("div3Alignment") != null) {
    div3.style.textAlign = localStorage.getItem("div3Alignment");
  }
  if (localStorage.getItem("div4Alignment") != null) {
    div4.style.textAlign = localStorage.getItem("div4Alignment");
  }
  if (localStorage.getItem("div5Alignment") != null) {
    div5.style.textAlign = localStorage.getItem("div5Alignment");
  }

  document.addEventListener("dblclick", function () {
    if (document.getElementById("div3AlignCheck").checked) {
      div3.style.textAlign = "left";
      div3.style.alignItems = "start";
      localStorage.setItem("div3Alignment", "left");
    } else {
      div3.style.textAlign = "";
      div3.style.alignItems = "";
      localStorage.setItem("div3Alignment", null);
    }
    if (document.getElementById("div4AlignCheck").checked) {
      div4.style.textAlign = "left";
      localStorage.setItem("div4Alignment", "left");
    } else {
      div4.style.textAlign = "";
      localStorage.setItem("div4Alignment", null);
    }
    if (document.getElementById("div5AlignCheck").checked) {
      div5.style.textAlign = "left";
      localStorage.setItem("div5Alignment", "left");
    } else {
      div5.style.textAlign = "";
      localStorage.setItem("div5Alignment", null);
    }
  });

  // task 5 after reload get from local storage
  for (let i = 1; i <= 7; i++) {
    let savedContent = localStorage.getItem("div" + i + "Content");
    if (savedContent) {
      let divContent = document.getElementsByClassName(divs[i])[0];
      divContent.innerHTML = "<i>" + savedContent + "</i>";
      divContent.innerHTML +=
        '<button id ="jsReset" onclick="resetContent(' +
        i +
        ')">Reset</button>';
    }
  }

  // task 5 load content of div into textarea
  document.getElementById("divSelect").addEventListener("change", function () {
    let divId = this.value;
    if (divId) {
      let div = document.getElementsByClassName(divs[divId])[0];
      if (!document.getElementById("js_form")) {
        if (!div.querySelector("#jsReset")) {
          let formHtml = `<form id="js_form"><textarea id="editContent" rows="4"
          cols="50">${div.innerHTML}</textarea><button onclick="saveContent(${divId})">Save</button></form>`;
          div.innerHTML += formHtml;
        }
      } else {
        document.getElementsByClassName(divs[3])[0].innerHTML +=
          "<p id='jsWarning' style='color: red;'>There is already an edit form in the document</p>";
        setTimeout(function () {
          document.getElementById("jsWarning").remove();
        }, 5000);
      }
    }
  });
};

function saveContent(divId) {
  // task 5 Save the content of the textarea to local storage and update the div
  if (divId) {
    let newContent = document.getElementById("editContent").value;
    localStorage.setItem("div" + divId + "Content", newContent);
    document.getElementsByClassName(divs[divId])[0].innerHTML =
      "<i>" + newContent + "</i>";
    // document.getElementById("js_form").remove();
    document.getElementsByClassName(divs[divId])[0].innerHTML +=
      '<button id="jsReset" onclick="resetContent(' +
      divId +
      ')">Reset</button>';
  }
}

function resetContent(divId) {
  // task 5 remove the saved content from local storage and reset the div
  localStorage.removeItem("div" + divId + "Content");
  document.getElementsByClassName(divs[divId])[0].innerHTML =
    originalContent[divId];
}
