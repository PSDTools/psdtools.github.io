/**
 * The main script.
 */

import { clearData, clearAll, setData } from "./scripts/storage.js";

declare global {
  interface Window {
    hsmsSwap: () => void;
    getCookies: () => void;
    classAmount: () => void;
    help: () => void;
    loadgpa: () => void;
    loadgpahelp: () => void;
    clearData: () => void;
    clearAll: () => void;
    w3Toggle: (open: boolean) => void;
    darkMode: () => void;
    rTH: () => void;
    prTH: () => void;
    oTH: () => void;
    yTH: () => void;
    lTH: () => void;
    cTH: () => void;
    bTH: () => void;
    pTH: () => void;
    piTH: () => void;
  }
}


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
window.openNav = () => {
  document.getElementById("mySidenav").style.width = "100%";
};

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
window.closeNav = () => {
  document.getElementById("mySidenav").style.width = "0%";
};

// Swaps High school and Middle school
function hsmsSwap() {
  var checked = document.getElementById("hsmsInput").checked;
  if (document.getElementById("hsmsInput").checked == true) {
    document.getElementById("gradeLvl").innerHTML = "High School";

    localStorage.setItem("gradestorage", checked);
    document.getElementById("numOfClasses").value = courses.length;
    for (let itr = 1; itr < courses.length + 1; itr++) {
      document.getElementById(
        `typeId${itr}`
      ).innerHTML = `	 <form>	<select class="blacktxt" id="cltyp${itr}">
		    <option value="1">No-Weight</option>
		    <option value="2">Honors</option>
	    </select>
	  </form>`;
      document.getElementById(`typeId${itr}`).value = 1;
    }
  } else {
    document.getElementById("gradeLvl").innerHTML = "Middle School";
    localStorage.setItem("gradestorage", checked);
    if (courses != null) {
      for (let itr = 1; itr < courses.length + 1; itr++) {
        document.getElementById(`typeId${itr}`).innerHTML = null;
      }
    }
  }
}
window.hsmsSwap = hsmsSwap;

// create Course function
function createCourse(num: number): void {
  tempElementId = `temp${String(num)}`;
  tempElementIdNext = `temp${String(num + 1)}`;
  // tempElementIdAlsoNext = `temp${String(num + 2)}`;
  // creates html elements in the courses class
  document.getElementById(tempElementId).innerHTML = `
	<div class="pt-4 pb-4 lg:text-2xl text-lg">
	<div id="input-con-div" class="">
	  <input style="width:150px;"class="hover:scale-105 placeholder-white blacktxt" placeholder="Class ${num}:" oninput="loadgpa();" id="cl${num}txt" type="text" required=""/>
	   <span style="float:right;" id="typeId${num}">
	  <form>
	 	<select oninput="loadgpa();" class="hover:scale-105 blacktxt" id="cltyp${num}">
		    <option value="1">No-Weight</option>
		    <option value="2">Honors</option>
	    </select>
	  </form>
  </span>

	 <input type="range" min="0" max="4" value="4" class="hover:scale-105 slider" style="float:right; width:50%;" id="slide${num}" oninput="document.getElementById('cl${num}').value = document.getElementById('slide${num}').value;loadgpa();">
	  <select class="hover:scale-105 blacktxt" oninput="document.getElementById('slide${num}').value = document.getElementById('cl${num}').value;loadgpa();" style="float:right;-webkit-appearance: none;" id="cl${num}">
		  <option value="4">A</option>
		  <option value="3">B</option>
      <option value="2">C</option>
      <option value="1">D</option>
      <option value="0">F</option>
      <option value="5">N/A</option>
    </select>

	 <!-- <label id="cl${num}label">Class ${num}</label> -->
	</div>
  <!--<p>Grade:</p>-->
 </div>
	<div class="selectionbox" id="${tempElementIdNext}">`;
}

window.getstorage = () => {
  // Called on pageload
  // Pulls storage from localStorage
  var color = localStorage.getItem("color");
  var shade = localStorage.getItem("shade");
  var gradestorage = localStorage.getItem("gradestorage");
  var arraystorage = localStorage.getItem("arraystorage");
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

  // remove N/A from addition
  for (const course of courses) {
    if (course.letterGrade === 5) {
      courseLen = courseLen - 1;
    } else {
      // adds to pregpa
      if (course.classType === "2") {
        if (course.letterGrade === 0) {
          pregpa = pregpa + course.letterGrade;
        } else {
          pregpa = pregpa + 1 + course.letterGrade;
        }
      } else {
        pregpa = pregpa + course.letterGrade;
      }
    }
  }

  if (gradestorage == "true") {
    document.getElementById("hsmsInput").checked = true;
    var checked = true; // FIXME (no var)
    document.getElementById("gradeLvl").innerHTML = "High School";
  } else if (gradestorage == "false") {
    document.getElementById("hsmsInput").checked = false;
    var checked = false; // FIXME (no var)
    document.getElementById("gradeLvl").innerHTML = "Middle School";
  } else {
    // Modal that pops up on first start
    document.getElementById("id01").style.display = "block";
    hsmsSwap();
  }

  if (arraystorage == null) {
    // if storage don't exist
    classAmount();
  } else {
    // if storage do exist
    fromstorage(arraystorage);
    loadgpa();
  }
};

window.classAmount = () => {
  // if storage don't exist
  // shows save text
  document.getElementById("saved")!.innerHTML = "Saved!";
  setTimeout(saveRemove, 1000);

  // save cookies
  const arraycookie = JSON.stringify(courses);
  setData(arraycookie);
}
window.loadgpa = loadgpa;

function classAmount(): void {
  courses = []; // if cookies don't exist, create the array

  // get textbox with number of classes
  classAmountNum = Math.abs(
    parseInt(
      (document.getElementById("numOfClasses") as HTMLInputElement).value,
    ),
  );

  if (
    classAmountNum === 0 ||
    Number.isNaN(classAmountNum) ||
    classAmountNum > 256
  ) {
    // stops NaN/0/null on numOfClasses textbox

    classAmountNum = 7;
  }

  // creates classes for number of iterations
  for (let itr = 0; itr < classAmountNum; itr++) {
    courses.push(new Course(itr + 1));
    createCourse(itr + 1);
  }
  if (!hsmsInput.checked) {
    for (let itr = 1; itr < courses.length + 1; itr++) {
      // loops through all course classes and removes the <span id="typeId"></span> (honors dropdown)
      document.getElementById(`typeId${itr}`)!.innerHTML = "";
    }
  }
  // calculates and saves the gpa
  loadgpa();
  // sets the gpa text to ""
  document.getElementById("gpa")!.innerHTML = "";
}
window.classAmount = classAmount;

function fromstorage(arraystorage) {
  // not to be confused with getstorage()
  courses = JSON.parse(arraystorage);
  // creates courses from array data after it is pulled from storage
  if (courses != null) {
    for (var itr = 0; itr < courses.length; itr++) {
      createCourse(courses[itr].classNum);
      createstorageCourse(
        courses[itr].classNum,
        courses[itr].letterGrade,
        courses[itr].classText,
        courses[itr].classType,
        itr
      );
    }
    for (let itr = 0; itr < courses.length; itr++) {
      var tempLGID = "cl".concat("", String(itr + 1)); // FIXME (no var)
      var tempCTID = "cl".concat("", String(itr + 1) + "txt"); // FIXME (no var)
      var tempCTYID = `cltyp${String(itr + 1)}`; // FIXME (no var)

  for (const [itr, course] of courses.entries()) {
    createCourse(course.classNum);
    createCookieCourse(
      course.classNum,
      course.letterGrade,
      course.classText,
      course.classType,
      itr,
    );
  }
  for (const [itr, course] of courses.entries()) {
    tempLGID = `cl${String(itr + 1)}`;
    tempCTID = `cl${String(itr + 1)}txt`;
    tempCTYID = `cltyp${String(itr + 1)}`;

    (document.getElementById(tempLGID) as HTMLInputElement).value = String(
      course.letterGrade,
    );
    (document.getElementById(tempCTID) as HTMLInputElement).value =
      course.classText;
    (document.getElementById(tempCTYID) as HTMLInputElement).value =
      course.classType;
  }
  if (!hsmsInput.checked) {
    for (let itr = 1; itr < courses.length + 1; itr++) {
      // removes typeId <span> element from courses objects
      document.getElementById(`typeId${itr}`)!.innerHTML = "";
    }
  }
}

function createstorageCourse(classNum, letterGrade, classText, classType, itr) {
  // Populates course object data

  // Easter Egg
  switch (color) {
    case "red": {
      element.classList.add("redModebg");

      break;
    }
    case "orange": {
      element.classList.add("orangeModebg");

      break;
    }
    case "yellow": {
      element.classList.add("yellowModebg");

      break;
    }
    case "lime": {
      element.classList.add("limeModebg");

      break;
    }
    case "cyan": {
      element.classList.add("cyanModebg");

      break;
    }
    case "blue": {
      element.classList.add("blueModebg");

      break;
    }
    case "purple": {
      element.classList.add("purpleModebg");

      break;
    }
    case "pink": {
      element.classList.add("pinkModebg");

      break;
    }
    case "pinkred": {
      element.classList.add("pinkredModebg");

      break;
    }
    default: {
      // Do nothing
      break;
    }
  }

  if (gradecookie === "true") {
    hsmsInput.checked = true;
    checked = true;
    gradeLvl.innerHTML = high;
    modalClass.innerHTML = high;
  } else if (gradecookie === "false") {
    hsmsInput.checked = false;
    checked = false;
    gradeLvl.innerHTML = middle;
    modalClass.innerHTML = middle;
  } else {
    // Modal that pops up on first start
    document.getElementById("id01")!.style.display = "block";
    hsmsSwap();
  }

  if (arraycookie === null) {
    // if cookies don't exist
    classAmount();
  } else {
    // if cookies do exist
    fromCookies(arraycookie);
    loadgpa();
  }
}
window.getCookies = getCookies;

function help(): void {
  window.location.href = "help.html";
}
window.help = help;

function loadgpahelp(): void {
  window.location.href = "index.html";
}
window.loadgpahelp = loadgpahelp;

  if (gradecookie === "true") {
    hsmsInput.checked = true;
    checked = true;
    gradeLvl.innerHTML = high;
    modalClass.innerHTML = high;
  } else if (gradecookie === "false") {
    hsmsInput.checked = false;
    checked = false;
    gradeLvl.innerHTML = middle;
    modalClass.innerHTML = middle;
  } else {
    // Modal that pops up on first start
    document.getElementById("id01")!.style.display = "block";
    hsmsSwap();
  }

  if (arraycookie === null) {
    // if cookies don't exist
    classAmount();
  } else {
    // if cookies do exist
    fromCookies(arraycookie);
    loadgpa();
  }
}
window.getCookies = getCookies;

    // shows save text
    document.getElementById("saved").innerHTML = "Saved!";
    setTimeout(saveRemove, 3000);

    // save storage
    var arraystorage = JSON.stringify(courses);
    localStorage.setItem("arraystorage", arraystorage, 365);
  }
  // Remove "Saved!" Text
  function saveRemove() {
    document.getElementById("saved").innerHTML = "";
  }
};
// clears class storage data
window.clearData = () => {
  localStorage.setItem("arraystorage", null, -1);
  location.reload();
};
// clears all website storage data
window.clearAll = () => {
  localStorage.setItem("gradestorage", null, -1);
  localStorage.setItem("color", null, -1);
  localStorage.setItem("shade", null, -1);
  window.clearData();
};


// Dark Mode
window.darkMode = (): void => {
  const element = document.body;
  element.classList.toggle("darkModebg");
  element.classList.toggle("lightModebg");

  const c = document.getElementById("c")!;
  c.classList.toggle("darkMode");
  c.classList.toggle("lightMode");

  const c2 = document.getElementById("c2")!;
  c2.classList.toggle("darkMode");
  c2.classList.toggle("lightMode");

  if (c.classList.contains("darkMode")) {
    document.getElementById("darkModeButton")!.innerHTML = "Light Mode";
    localStorage.setItem("shade", "dark");
  } else if (!element.classList.contains("lightMode")) {
    document.getElementById("darkModeButton")!.innerHTML = "Dark Mode";
    localStorage.setItem("shade", "light");
  }
};

/** This is the Easter Egg.
 *
 * [Context](https://www.google.com/search?q=Konami+Code).
 */
function remColors(): void {
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
  classes.forEach((c: string): void => {
    let element: HTMLElement | null = document.body;
    if (element.classList.contains(c)) {
      element.classList.remove(c);
    }
    element = document.getElementById("c")!;
    if (element.classList.contains(c)) {
      element.classList.remove(c);
    }
    element = document.getElementById("c2")!;
    if (element.classList.contains(c)) {
      element.classList.remove(c);
    }
  });
}

let keys = "";
function onkeydown(e: KeyboardEvent): void {
  const code = e.key;
  switch (code) {
    case "ArrowUp": {
      // up key
      keys += "1";

      break;
    }
    case "ArrowDown": {
      // down key
      keys += "2";

      break;
    }
    case "ArrowLeft": {
      // left key
      keys += "3";

      break;
    }
    case "ArrowRight": {
      // right key
      keys += "4";

      break;
    }
    case "a": {
      // B key
      keys += "6";

      break;
    }
    case "b": {
      // A key
      keys += "5";

      break;
    }
    case "Enter": {
      // Start (enter) key
      keys += "7";

      break;
    }
    default: {
      // Do nothing
      break;
    }
  }

  const sequence = "11223434567";
  if (keys === sequence) {
    window.alert("You Found It!");
    document.getElementById("id02")!.style.display = "block";
    remColors();
  }
}
window.onkeydown = onkeydown;

// Button Theme Changing Functions
window.rTH = (): void => {
  remColors();
  const element = document.body;
  element.classList.add("redModebg");
  localStorage.setItem("color", "red");
};
window.oTH = (): void => {
  remColors();
  const element = document.body;
  element.classList.add("orangeModebg");
  localStorage.setItem("color", "orange");
};
window.yTH = (): void => {
  remColors();
  const element = document.body;
  element.classList.add("yellowModebg");
  localStorage.setItem("color", "yellow");
};
window.lTH = (): void => {
  remColors();
  const element = document.body;
  element.classList.add("limeModebg");
  localStorage.setItem("color", "lime");
};
window.cTH = (): void => {
  remColors();
  const element = document.body;
  element.classList.add("cyanModebg");
  localStorage.setItem("color", "cyan");
};
window.bTH = (): void => {
  remColors();
  const element = document.body;
  element.classList.add("blueModebg");
  localStorage.setItem("color", "blue");
};
window.pTH = (): void => {
  remColors();
  const element = document.body;
  element.classList.add("purpleModebg");
  localStorage.setItem("color", "purple");
};
window.piTH = (): void => {
  remColors();
  const element = document.body;
  element.classList.add("pinkModebg");
  localStorage.setItem("color", "pink");
};
window.prTH = (): void => {
  remColors();
  const element = document.body;
  element.classList.add("pinkredModebg");
  localStorage.setItem("color", "pinkred");
};

export {};
