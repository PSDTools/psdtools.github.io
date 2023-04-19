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

let checked: boolean;
let tempLGID: string;
let tempCTID: string;
let tempCTYID: string;
let tempElementId: string;
let tempElementIdNext: string;
let tempElementIdAlsoNext: string;
let courses: Course[] = [];
let classAmountNum = 0;
const high = "High School";
const middle = "Middle School";

window.clearData = clearData;
window.clearAll = clearAll;

class Course {
  letterGrade: number;
  classText: string;
  classNum: number;
  classType: string;

  /** Create `Course` class. */
  constructor(num: number) {
    this.letterGrade = 5;
    this.classText = "";
    this.classNum = num;
    this.classType = "1";
  }
}

// Swaps High school and Middle school
function hsmsSwap(): void {
  checked = (document.getElementById("hsmsInput") as HTMLInputElement).checked;
  if ((document.getElementById("hsmsInput") as HTMLInputElement).checked) {
    document.getElementById("gradeLvl")!.innerHTML = high;
    document.getElementById("modalClass")!.innerHTML = high;

    localStorage.setItem("gradecookie", String(checked));
    (document.getElementById("numOfClasses") as HTMLInputElement).value =
      String(courses.length);
    for (let itr = 1; itr < courses.length + 1; itr++) {
      (
        document.getElementById(`typeId${itr}`) as HTMLInputElement
      ).innerHTML = `
      <p>Type:</p>
		  <form>
        <select class="dropmenu" id="cltyp${itr}">
          <option value="1">N/A</option>
          <option value="2">Honors</option>
        </select>
		  </form>`;
    }
  } else {
    document.getElementById("gradeLvl")!.innerHTML = middle;
    document.getElementById("modalClass")!.innerHTML = middle;
    localStorage.setItem("gradecookie", String(checked));
    for (let itr = 1; itr < courses.length + 1; itr++) {
      document.getElementById(`typeId${itr}`)!.innerHTML = "";
    }
  }
}
window.hsmsSwap = hsmsSwap;

// create Course function
function createCourse(num: number): void {
  tempElementId = `temp${String(num)}`;
  tempElementIdNext = `temp${String(num + 1)}`;
  tempElementIdAlsoNext = `temp${String(num + 2)}`;
  // creates html elements in the courses class
  document.getElementById(tempElementId)!.innerHTML = `
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

/**  Remove "Saved!" text. */
function saveRemove() {
  document.getElementById("saved")!.innerHTML = "";
}

/**
 * Saves values to the array.
 *
 *
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

    if ((document.getElementById("hsmsInput") as HTMLInputElement).checked) {
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
  if (!(document.getElementById("hsmsInput") as HTMLInputElement).checked) {
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

/**Populates course object data. */
function createCookieCourse(
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
 * Not to be confused with `getCookies()`.
 */
function fromCookies(arraycookie: string): void {
  courses = JSON.parse(arraycookie);
  // creates courses from array data after it is pulled from cookies

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
  if (!(document.getElementById("hsmsInput") as HTMLInputElement).checked) {
    for (let itr = 1; itr < courses.length + 1; itr++) {
      // removes typeId <span> element from courses objects
      document.getElementById(`typeId${itr}`)!.innerHTML = "";
    }
  }
}

/** Called `onPageload`.
 *
 * Pulls cookies from `localStorage`.
 */
function getCookies(): void {
  const color = localStorage.getItem("color");
  const shade = localStorage.getItem("shade");
  const gradecookie = localStorage.getItem("gradecookie");
  const arraycookie = localStorage.getItem("arraycookie");
  const element = document.body;
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

  if (gradecookie === "true") {
    (document.getElementById("hsmsInput") as HTMLInputElement).checked = true;
    checked = true;
    document.getElementById("gradeLvl")!.innerHTML = high;
    document.getElementById("modalClass")!.innerHTML = high;
  } else if (gradecookie === "false") {
    (document.getElementById("hsmsInput") as HTMLInputElement).checked = false;
    checked = false;
    document.getElementById("gradeLvl")!.innerHTML = middle;
    document.getElementById("modalClass")!.innerHTML = middle;
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

/**
 * The side nav bar.
 */
function w3Toggle(open: boolean): void {
  const x = document.getElementById("mySidebar")!;
  if (open) {
    x.style.width = "30%";
    x.style.fontSize = "40px";
    x.style.paddingTop = "10%";
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
window.w3Toggle = w3Toggle;

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
  console.debug(`keys: ${keys}, code: ${code}, sequence: ${sequence}`);
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
