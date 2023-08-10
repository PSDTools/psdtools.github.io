/**
 * The main script.
 */


import "./styles/global.css";
import { clearData, clearAll, setData } from "./scripts/storage.js";

declare global {
  interface Window {
    hsmsSwap: () => void;
    classAmount: () => void;
    help: () => void;
    loadgpa: () => void;
    loadgpahelp: () => void;
    clearData: () => void;
    clearAll: () => void;
    toggleNav: (open: boolean) => void;
    getStorage: () => void;
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

class Course {
  letterGrade: number;
  classText: string;
  classNum: number;
  classType: string;

  /**
   * Create `Course` class.
   */
  constructor(num: number) {
    this.letterGrade = 5;
    this.classText = "";
    this.classNum = num;
    this.classType = "1";
  }
}

let courses: Course[] = [];
let classAmountNum = 0;

let tempLGID = "";
let tempCTID = "";
let tempCTYID = "";
let tempElementId = "";
let tempElementIdNext = "";
// let tempElementIdAlsoNext = "";

const high = "High School";
const middle = "Middle School";
const hsmsInput = document.getElementById("hsmsInput") as HTMLInputElement;
const gradeLvl = document.getElementById("gradeLvl")!;
const element = document.body;

window.clearData = clearData;
window.clearAll = clearAll;

/**
 * Toggle the navigation.
 * If it's going to open:
 * - Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to the body.
 * - Otherwise, set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of the body to white.
 *
 * @param open - If you want to open the sidebar (defaults to close).
 */
function toggleNav(open: boolean): void {
  document.getElementById("mySidenav")!.style.width = open ? "100%" : "0%";
}
window.toggleNav = toggleNav;

/**
 * Swaps the High School and the Middle School.
 */
function hsmsSwap(): void {
  const checked = hsmsInput.checked;
  if (checked) {
    gradeLvl.innerHTML = high;

    localStorage.setItem("gradestorage", String(checked));
    (document.getElementById("numOfClasses") as HTMLInputElement).value =
      String(courses.length);
    for (let itr = 1; itr < courses.length + 1; itr++) {
      document.getElementById(
        `typeId${itr}`,
      )!.innerHTML = `<form>	<select class="blacktxt" id="cltyp${itr}">
		    <option value="1">No-Weight</option>
		    <option value="2">Honors</option>
	    </select>
	    </form>`;
      (document.getElementById(`typeId${itr}`) as HTMLInputElement).value = "1";
    }
  } else {
    gradeLvl.innerHTML = middle;
    localStorage.setItem("gradestorage", String(checked));
    for (let itr = 1; itr < courses.length + 1; itr++) {
      document.getElementById(`typeId${itr}`)!.innerHTML = "";
    }
  }
}
window.hsmsSwap = hsmsSwap;

/**
 * Create a `Course`.
 */
function createCourse(num: number): void {
  tempElementId = `temp${String(num)}`;
  tempElementIdNext = `temp${String(num + 1)}`;
  // tempElementIdAlsoNext = `temp${String(num + 2)}`;

  // creates html elements in the courses class
  document.getElementById(tempElementId)!.innerHTML = `
	<div oninput="loadgpa();" class="pt-4 pb-4 lg:text-2xl text-lg">
	<div id="input-con-div" class="">
	  <input style="width:150px;"class="hover:scale-105 placeholder-white blacktxt" placeholder="Class ${num}:" oninput="loadgpa();" id="cl${num}txt" type="text" required=""/>
	   <span style="float:right;" id="typeId${num}">
	  <form>
	 	<select class="hover:scale-105 blacktxt" id="cltyp${num}">
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

/**
 * Remove "Saved!" text.
 */
function saveRemove() {
  document.getElementById("saved")!.innerHTML = "";
}

/**
 * Saves values to the array.
 */
function loadgpa(): void {
  // set vars
  let pregpa = 0;
  let courseLen: number = courses.length;

  tempLGID = "";
  tempCTID = "";
  tempCTYID = "";

  // save classes to array
  for (const [itr, course] of courses.entries()) {
    tempLGID = `cl${String(itr + 1)}`;
    tempCTID = `cl${String(itr + 1)}txt`;
    tempCTYID = `cltyp${String(itr + 1)}`;

    course.letterGrade = Number(
      (document.getElementById(tempLGID) as HTMLInputElement).value,
    );

    course.classText = (
      document.getElementById(tempCTID) as HTMLInputElement
    ).value;

    if (hsmsInput.checked) {
      tempCTYID = `cltyp${String(itr + 1)}`;
      course.classType = (
        document.getElementById(tempCTYID) as HTMLInputElement
      ).value;
    }
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

  // divide
  let gpa: number | string = pregpa / courseLen;

  // round
  gpa = gpa.toFixed(2);

  document.getElementById("gpa")!.innerHTML = `Your GPA is a: ${gpa}`;

  // shows save text
  document.getElementById("saved")!.innerHTML = "Saved!";
  setTimeout(saveRemove, 1000);

  // save storage
  const arraystorage = JSON.stringify(courses);
  setData(arraystorage);
  for (const [itr] of courses.entries()) {
    (document.getElementById(`slide${itr+1}`) as HTMLInputElement).value = (document.getElementById(`cl${itr+1}`) as HTMLInputElement).value
  }
}
window.loadgpa = loadgpa;

function classAmount(): void {
  courses = []; // if storage don't exist, create the array

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
    classAmountNum = 7; // stops NaN/0/null on numOfClasses textbox
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

/**
 * Populates course object data.
 */
function createStorageCourse(
  classNum: number,
  _letterGrade: number,
  classText: string,
  _classType: string,
  _itr: number,
): void {
  const num = classNum;

  tempElementId = `temp${String(num)}`;
  tempElementIdNext = `temp${String(num + 1)}`;

  (document.getElementById(tempElementId) as HTMLInputElement).value =
    classText;
  (document.getElementById(tempElementIdNext) as HTMLInputElement).value =
    String(classNum);
}

/**
 * Not to be confused with `getStorage()`.
 */
function fromStorage(arraystorage: string) {
  courses = JSON.parse(arraystorage);
  // creates courses from array data after it is pulled from storage

  for (const [itr, course] of courses.entries()) {
    createCourse(course.classNum);
    createStorageCourse(
      course.classNum,
      course.letterGrade,
      course.classText,
      course.classType,
      itr,
    );
  }
  for (let itr = 0; itr < courses.length; itr++) {
    tempLGID = `cl${String(itr + 1)}`;
    tempCTID = `cl${String(itr + 1)}txt`;
    tempCTYID = `cltyp${String(itr + 1)}`;

    for (const [itr2, course] of courses.entries()) {
      createCourse(course.classNum);
      createStorageCourse(
        course.classNum,
        course.letterGrade,
        course.classText,
        course.classType,
        itr2,
      );
    }

    for (const [itr2, course] of courses.entries()) {
      tempLGID = `cl${String(itr2 + 1)}`;
      tempCTID = `cl${String(itr2 + 1)}txt`;
      tempCTYID = `cltyp${String(itr2 + 1)}`;

      (document.getElementById(tempLGID) as HTMLInputElement).value = String(
        course.letterGrade,
      );
      (document.getElementById(tempCTID) as HTMLInputElement).value =
        course.classText;
      (document.getElementById(tempCTYID) as HTMLInputElement).value =
        course.classType;
    }

    if (!hsmsInput.checked) {
      for (let itr2 = 1; itr2 < courses.length + 1; itr2++) {
        // removes typeId <span> element from courses objects
        document.getElementById(`typeId${itr + 1}`)!.innerHTML = "";
      }
    }
  }
}

/**
 * Called on pageload.
 *
 * Pulls storage from `localStorage`.
 */
function getStorage(): void {
  const color = localStorage.getItem("color");
  const shade = localStorage.getItem("shade");
  const gradestorage = localStorage.getItem("gradestorage");
  const arraystorage = localStorage.getItem("arraystorage");
  if (!arraystorage) {
    localStorage.setItem("arraystorage", "true");
  }
  // sets top header, slider, and dark mode to correct values
  if (shade === "dark") {
    element.classList.toggle("darkModebg");
    element.classList.toggle("lightModebg");
    const c = document.getElementById("c")!;
    c.classList.toggle("darkMode");
    c.classList.toggle("lightMode");
    const c2 = document.getElementById("c2")!;
    c2.classList.toggle("darkMode");
    c2.classList.toggle("lightMode");
    document.getElementById("darkModeButton")!.innerHTML = "Light Mode";
  }

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

  if (gradestorage === "true") {
    hsmsInput.checked = true;
    // let checked = true;
    gradeLvl.innerHTML = high;
  } else if (gradestorage === "false") {
    hsmsInput.checked = false;
    // let checked = false;
    gradeLvl.innerHTML = middle;
  }
  if (arraystorage === null) {
    // if storage don't exist
    classAmount();
  } else {
    // if storage does exist
    fromStorage(arraystorage);
    loadgpa();
  }
  hsmsSwap();
}
window.getStorage = getStorage;

function help(): void {
  window.location.href = "help.html";
}
function loadgpahelp(): void {
  window.location.href = "index.html";
}
window.help = help;
window.loadgpahelp = loadgpahelp;

/** This is...Dark Mode. */
function darkMode(): void {
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
}
window.darkMode = darkMode;

/**
 * This is the Easter Egg.
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
    if (element.classList.contains(c)) {
      element.classList.remove(c);
    }
    const element2 = document.getElementById("c")!;
    if (element2.classList.contains(c)) {
      element2.classList.remove(c);
    }
    const element3 = document.getElementById("c2")!;
    if (element3.classList.contains(c)) {
      element3.classList.remove(c);
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
  element.classList.add("redModebg");
  localStorage.setItem("color", "red");
};
window.oTH = (): void => {
  remColors();
  element.classList.add("orangeModebg");
  localStorage.setItem("color", "orange");
};
window.yTH = (): void => {
  remColors();
  element.classList.add("yellowModebg");
  localStorage.setItem("color", "yellow");
};
window.lTH = (): void => {
  remColors();
  element.classList.add("limeModebg");
  localStorage.setItem("color", "lime");
};
window.cTH = (): void => {
  remColors();
  element.classList.add("cyanModebg");
  localStorage.setItem("color", "cyan");
};
window.bTH = (): void => {
  remColors();
  element.classList.add("blueModebg");
  localStorage.setItem("color", "blue");
};
window.pTH = (): void => {
  remColors();
  element.classList.add("purpleModebg");
  localStorage.setItem("color", "purple");
};
window.piTH = (): void => {
  remColors();
  element.classList.add("pinkModebg");
  localStorage.setItem("color", "pink");
};
window.prTH = (): void => {
  remColors();
  element.classList.add("pinkredModebg");
  localStorage.setItem("color", "pinkred");
};

export {};
