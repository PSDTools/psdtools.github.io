// Swaps High school and Middle school
function hsmsSwap() {
  var checked = document.getElementById("hsmsInput").checked;
  if (document.getElementById("hsmsInput").checked == true) {
    document.getElementById("gradeLvl").innerHTML = "High School";
    document.getElementById("modalClass").innerHTML = "High School";

    localStorage.setItem("gradecookie", checked);
    document.getElementById("numOfClasses").value = courses.length;
    for (let itr = 1; itr < courses.length + 1; itr++) {
      document.getElementById(`typeId${itr}`).innerHTML = `
      <p>Type:</p>
		  <form>
        <select class="dropmenu" id="cltyp${itr}">
          <option value="1">N/A</option>
          <option value="2">Honors</option>
        </select>
		  </form>`;
    }
  } else {
    document.getElementById("gradeLvl").innerHTML = "Middle School";
    document.getElementById("modalClass").innerHTML = "Middle School";
    localStorage.setItem("gradecookie", checked);
    if (courses != null) {
      for (let itr = 1; itr < courses.length + 1; itr++) {
        document.getElementById(`typeId${itr}`).innerHTML = null;
      }
    }
  }
}

var courses = [];
var classAmountNum = 0;
// create Course class
class Course {
  constructor(num) {
    this.letterGrade = 5;
    this.classText = "";
    this.classNum = num;
    this.classType = "1";
  }
}

// create Course function
function createCourse(num) {
  var tempElementId = "temp".concat("", String(num));
  var tempElementIdNext = "temp".concat("", String(num + 1));
  var tempElementIdAlsoNext = "temp".concat("", String(num + 2));
  // creates html elements in the courses class
  document.getElementById(tempElementId).innerHTML = `
	<div id="input-con-div" class="input-container lightModeInput">
	  <input id="cl${num}txt" type="text" required=""/>
	  <label id="cl${num}label">Class ${num}</label>
	</div>
  <span id="typeId${num}">
    <p>Type:</p>
	  <form>
	    <select class="dropmenu" id="cltyp${num}">
		    <option value="1">N/A</option>
		    <option value="2">Honors</option>
	    </select>
	  </form>
  </span>
  <p>Grade:</p>
	<form>
	  <select class="dropmenu SM" id="cl${num}">
		  <option value="4">A</option>
		  <option value="3">B</option>
      <option value="2">C</option>
      <option value="1">D</option>
      <option value="0">F</option>
      <option value="5">N/A</option>
    </select>
	  <br><br>
	</form>
	<div class="selectionbox" id="${tempElementIdNext}">`;
}

function getCookies() {
  // Called on pageload
  // Pulls cookies from localStorage
  var color = localStorage.getItem("color");
  var shade = localStorage.getItem("shade");
  var gradecookie = localStorage.getItem("gradecookie");
  var arraycookie = localStorage.getItem("arraycookie");
  // sets top header, slider, and dark mode to correct values
  if (shade == "dark") {
    var element = document.body;
    element.classList.toggle("darkModebg");
    element.classList.toggle("lightModebg");
    var c = document.getElementById("c");
    c.classList.toggle("darkMode");
    c.classList.toggle("lightMode");
    var c2 = document.getElementById("c2");
    c2.classList.toggle("darkMode");
    c2.classList.toggle("lightMode");
    document.getElementById("darkModeButton").innerHTML = "Light Mode";
  }

  // Easter Egg
  if (color == "red") {
    var element = document.body;
    element.classList.add("redModebg");
  } else if (color == "orange") {
    var element = document.body;
    element.classList.add("orangeModebg");
  } else if (color == "yellow") {
    var element = document.body;
    element.classList.add("yellowModebg");
  } else if (color == "lime") {
    var element = document.body;
    element.classList.add("limeModebg");
  } else if (color == "cyan") {
    var element = document.body;
    element.classList.add("cyanModebg");
  } else if (color == "blue") {
    var element = document.body;
    element.classList.add("blueModebg");
  } else if (color == "purple") {
    var element = document.body;
    element.classList.add("purpleModebg");
  } else if (color == "pink") {
    var element = document.body;
    element.classList.add("pinkModebg");
  } else if (color == "pinkred") {
    var element = document.body;
    element.classList.add("pinkredModebg");
  }

  if (gradecookie == "true") {
    document.getElementById("hsmsInput").checked = true;
    checked = true;
    document.getElementById("gradeLvl").innerHTML = "High School";
    document.getElementById("modalClass").innerHTML = "High School";
  } else if (gradecookie == "false") {
    document.getElementById("hsmsInput").checked = false;
    checked = false;
    document.getElementById("gradeLvl").innerHTML = "Middle School";
    document.getElementById("modalClass").innerHTML = "Middle School";
  } else {
    // Modal that pops up on first start
    document.getElementById("id01").style.display = "block";
    hsmsSwap();
  }

  if (arraycookie == null) {
    // if cookies don't exist
    classAmount();
  } else {
    // if cookies do exist
    fromCookies(arraycookie);
    loadgpa();
  }
}

function classAmount() {
  // if cookies don't exist

  // create array
  courses = [];

  // get textbox with number of classes
  classAmountNum = Math.abs(
    parseInt(document.getElementById("numOfClasses").value)
  );

  if (classAmountNum == parseInt(0)) {
    // stops NaN/0/null on numOfClasses textbox

    classAmountNum = 7;
  } else if (classAmountNum.isNaN == true) {
    classAmountNum = 7;
  } else if (classAmountNum == null) {
    classAmountNum = 7;
  } else if (classAmountNum > 256) {
    classAmountNum = 7;
  }

  // creates classes for number of iterations
  for (let itr = 0; itr < classAmountNum; itr++) {
    courses.push(new Course(itr + 1));
    createCourse(itr + 1);
  }
  if (document.getElementById("hsmsInput").checked == false) {
    for (let itr = 1; itr < courses.length + 1; itr++) {
      // loops through all course classes and removes the <span id="typeId"></span> (honors dropdown)
      document.getElementById(`typeId${itr}`).innerHTML = null;
    }
  }
  // calculates and saves the gpa
  loadgpa();
  // sets the gpa text to ""
  document.getElementById("gpa").innerHTML = "";
}

function fromCookies(arraycookie) {
  // not to be confused with getCookies()
  courses = JSON.parse(arraycookie);
  // creates courses from array data after it is pulled from cookies
  if (courses != null) {
    for (var itr = 0; itr < courses.length; itr++) {
      createCourse(courses[itr].classNum);
      createCookieCourse(
        courses[itr].classNum,
        courses[itr].letterGrade,
        courses[itr].classText,
        courses[itr].classType,
        itr
      );
    }
    for (let itr = 0; itr < courses.length; itr++) {
      tempLGID = "cl".concat("", String(itr + 1));
      tempCTID = "cl".concat("", String(itr + 1) + "txt");
      tempCTYID = `cltyp${String(itr + 1)}`;

      document.getElementById(tempLGID).value = courses[itr].letterGrade;
      document.getElementById(tempCTID).value = courses[itr].classText;
      document.getElementById(tempCTYID).value = courses[itr].classType;
    }
    if (document.getElementById("hsmsInput").checked == false) {
      for (let itr = 1; itr < courses.length + 1; itr++) {
        // removes typeId <span> element from courses objects
        document.getElementById(`typeId${itr}`).innerHTML = null;
      }
    }
  }
}

function createCookieCourse(classNum, letterGrade, classText, classType, itr) {
  // Populates course object data

  let num = classNum;

  var tempElementId = "temp".concat("", String(num));
  var tempElementIdNext = "temp".concat("", String(num + 1));

  document.getElementById(tempElementId).value = classText;

  document.getElementById(tempElementIdNext).value = classNum;
}

function help() {
  window.location.href = "help.html";
}
function loadgpahelp() {
  window.location.href = "index.html";
}

function loadgpa() {
  // Saves values to the array
  if (courses != null) {
    // set var
    var pregpa = 0;
    var courseLen = courses.length;

    var tempLGID = "";
    var tempCTID = "";
    var tempCTYID = "";

    // save classes to array

    for (let itr = 0; itr < courses.length; itr++) {
      tempLGID = "cl".concat("", String(itr + 1));
      tempCTID = "cl".concat("", String(itr + 1)) + "txt";
      tempCTYID = "cltyp".concat("", String(itr + 1));

      courses[itr].letterGrade = document.getElementById(tempLGID).value;

      courses[itr].classText = document.getElementById(tempCTID).value;

      if (document.getElementById("hsmsInput").checked != false) {
        tempCTYID = `cltyp${String(itr + 1)}`;
        courses[itr].classType = document.getElementById(tempCTYID).value;
      }
    }

    // remove N/A from addition
    for (let itr = 0; itr < courses.length; itr++) {
      if (courses[itr].letterGrade == 5) {
        var courseLen = courseLen - 1;
      } else {
        // adds to pregpa
        if (courses[itr].classType == "2") {
          if (courses[itr].letterGrade == "0") {
            var pregpa = pregpa + parseInt(courses[itr].letterGrade);
          } else {
            var pregpa = pregpa + 1 + parseInt(courses[itr].letterGrade);
          }
        } else {
          var pregpa = pregpa + parseInt(courses[itr].letterGrade);
        }
      }
    }
    // divide
    gpa = pregpa / courseLen;

    // round
    var gpa = gpa.toFixed(2);

    document.getElementById("gpa").innerHTML = `Your GPA is a: ${gpa}`;

    // shows save text
    document.getElementById("saved").innerHTML = "Saved!";
    setTimeout(saveRemove, 1000);

    // save cookies
    var arraycookie = JSON.stringify(courses);
    localStorage.setItem("arraycookie", arraycookie, 365);
  }
  // Remove "Saved!" Text
  function saveRemove() {
    document.getElementById("saved").innerHTML = "";
  }
}
// clears class cookie data
function clearData() {
  localStorage.setItem("arraycookie", null, -1);
  location.reload();
}
// clears all website cookie data
function clearAll() {
  localStorage.setItem("arraycookie", null, -1);
  localStorage.setItem("gradecookie", null, -1);
  localStorage.setItem("color", null, -1);
  localStorage.setItem("shade", null, -1);
}

//  Side nav bar
function w3_open() {
  var x = document.getElementById("mySidebar");
  x.style.width = "30%";
  x.style.fontSize = "40px";
  x.style.paddingTop = "10%";
  x.style.display = "block";
}
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}
// Dark Mode
function darkMode() {
  var element = document.body;
  element.classList.toggle("darkModebg");
  element.classList.toggle("lightModebg");

  var c = document.getElementById("c");
  c.classList.toggle("darkMode");
  c.classList.toggle("lightMode");

  var c2 = document.getElementById("c2");
  c2.classList.toggle("darkMode");
  c2.classList.toggle("lightMode");

  if (c.classList.contains("darkMode") == true) {
    document.getElementById("darkModeButton").innerHTML = "Light Mode";
    localStorage.setItem("shade", "dark", 365);
  } else if (element.classList.contains("lightMode") == false) {
    document.getElementById("darkModeButton").innerHTML = "Dark Mode";
    localStorage.setItem("shade", "light", 365);
  }
}
// Easter Egg
// Context: https://www.google.com/search?q=Konami+Code

function remColors() {
  const classes = [
    "redModebg",
    "orangeModebg",
    "yellowModebg",
    "limeModebg",
    "cyanModebg",
    "blueModebg",
    "purpleModebg",
    "pinkModebg",
    "pinkredModebg",
  ];
  classes.forEach((c) => {
    var element = document.body;
    if (element.classList.contains(c)) {
      element.classList.remove(c);
    }
    var element = document.getElementById("c");
    if (element.classList.contains(c)) {
      element.classList.remove(c);
    }
    var element = document.getElementById("c2");
    if (element.classList.contains(c)) {
      element.classList.remove(c);
    }
  });
}

var keys = "";
window.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  if (code === 38) {
    // up key
    keys += "1";
  } else if (code === 40) {
    // down key
    keys += "2";
  } else if (code === 37) {
    // left key
    keys += "3";
  } else if (code === 39) {
    // right key
    keys += "4";
  } else if (code === 66) {
    // B key
    keys += "5";
  } else if (code === 65) {
    // A key
    keys += "6";
  } else if (code === 13) {
    // Start (enter) key
    keys += "7";
  }
  if (keys == "11223434567") {
    // sequence
    console.log(keys);
    alert("You Found It!");
    document.getElementById("id02").style.display = "block";
    remColors();
  }
};
// Button Theme Changing Functions
function rTH() {
  remColors();
  var element = document.body;
  element.classList.add("redModebg");
  localStorage.setItem("color", "red", 365);
}
function oTH() {
  remColors();
  var element = document.body;
  element.classList.add("orangeModebg");
  localStorage.setItem("color", "orange", 365);
}
function yTH() {
  remColors();
  var element = document.body;
  element.classList.add("yellowModebg");
  localStorage.setItem("color", "yellow", 365);
}
function lTH() {
  remColors();
  var element = document.body;
  element.classList.add("limeModebg");
  localStorage.setItem("color", "lime", 365);
}
function cTH() {
  remColors();
  var element = document.body;
  element.classList.add("cyanModebg");
  localStorage.setItem("color", "cyan", 365);
}
function bTH() {
  remColors();
  var element = document.body;
  element.classList.add("blueModebg");
  localStorage.setItem("color", "blue", 365);
}
function pTH() {
  remColors();
  var element = document.body;
  element.classList.add("purpleModebg");
  localStorage.setItem("color", "purple", 365);
}
function piTH() {
  remColors();
  var element = document.body;
  element.classList.add("pinkModebg");
  localStorage.setItem("color", "pink", 365);
}
function prTH() {
  remColors();
  var element = document.body;
  element.classList.add("pinkredModebg");
  localStorage.setItem("color", "pinkred", 365);
}
