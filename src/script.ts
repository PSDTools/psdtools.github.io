/**
 * The main script.
 */

import "./styles/global.css";

import { registerSW } from "virtual:pwa-register";
import {
  clearData,
  clearAll,
  setData,
  setGrade,
  getData,
  getGrade,
} from "./scripts/storage.js";
import { type Course, newCourse } from "./data/data-types.js";

declare global {
  interface Window {
    hsmsSwap: () => Promise<void>;
    classAmount: () => Promise<void>;
    loadgpa: () => Promise<void>;
    clearData: () => Promise<void>;
    clearAll: () => Promise<void>;
    toggleNav: (open: boolean) => void;
    startApp: () => Promise<void>;
    darkMode: () => Promise<void>;
  }
}

let courses: Course[] = [];
let classAmountNum = 0;

let tempLGID = "";
let tempCTID = "";
let tempCTYID = "";
let tempElementId = "";
let tempElementIdNext = "";

const high = "High School";
const middle = "Middle School";
const hsmsInput = document.getElementById("hsmsInput") as HTMLInputElement;
const gradeLvl = document.getElementById("gradeLvl")!;

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
async function hsmsSwap(): Promise<void> {
  const checked = hsmsInput.checked;

  if (checked) {
    gradeLvl.innerHTML = high;

    await setGrade(String(checked));
    (document.getElementById("numOfClasses") as HTMLInputElement).value =
      String(courses.length);
    for (let itr = 1; itr < courses.length + 1; itr++) {
      const element = document.getElementById(`typeId${itr}`)!;

      if (element instanceof HTMLInputElement) {
        element.innerHTML = `<form>
          <select class="blacktxt" id="cltyp${itr}">
            <option value="1">No-Weight</option>
            <option value="2">Honors</option>
          </select>
        </form>`;
        element.value = "1";
      }
    }
  } else {
    gradeLvl.innerHTML = middle;
    await setGrade(String(checked));
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
  tempElementId = `temp${num}`;
  tempElementIdNext = `temp${num + 1}`;

  // creates html elements in the courses class
  document.getElementById(tempElementId)!.innerHTML = `<div
      oninput="loadgpa();"
      class="pt-4 pb-4 lg:text-2xl text-lg"
    >
      <div id="input-con-div" class="">
        <input
          style="width:150px;"
          class="hover:scale-105 placeholder-white blacktxt"
          placeholder="Class ${num}:"
          oninput="loadgpa();"
          id="cl${num}txt"
          type="text"
          required=""
        />
        <span style="float:right;" id="typeId${num}">
          <form>
            <select class="hover:scale-105 blacktxt" id="cltyp${num}">
              <option value="1">No-Weight</option>
              <option value="2">Honors</option>
            </select>
          </form>
        </span>

        <input
          type="range"
          min="0"
          max="4"
          value="4"
          class="hover:scale-105 slider"
          style="float:right; width:50%;"
          id="slide${num}"
          oninput="document.getElementById('cl${num}').value = document.getElementById('slide${num}').value;loadgpa();"
        />
        <select
          class="hover:scale-105 blacktxt"
          oninput="document.getElementById('slide${num}').value = document.getElementById('cl${num}').value;loadgpa();"
          style="float:right;-webkit-appearance: none;"
          id="cl${num}"
        >
          <option value="4">A</option>
          <option value="3">B</option>
          <option value="2">C</option>
          <option value="1">D</option>
          <option value="0">F</option>
          <option value="5">N/A</option>
        </select>
      </div>
    </div>
    <div class="selectionbox" id="${tempElementIdNext}"></div>`;
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
async function loadgpa(): Promise<void> {
  // set vars
  let pregpa = 0;
  let courseLen: number = courses.length;

  tempLGID = "";
  tempCTID = "";
  tempCTYID = "";

  // save classes to array
  for (const [itr, course] of courses.entries()) {
    tempLGID = `cl${itr + 1}`;
    tempCTID = `cl${itr + 1}txt`;
    tempCTYID = `cltyp${itr + 1}`;

    course.letterGrade = Number(
      (document.getElementById(tempLGID) as HTMLInputElement).value,
    );

    course.classText = (
      document.getElementById(tempCTID) as HTMLInputElement
    ).value;

    if (hsmsInput.checked) {
      tempCTYID = `cltyp${itr + 1}`;
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
      if (course.classType === "2" && hsmsInput.checked) {
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

  // Divide.
  const gpa = pregpa / courseLen;
  // Round.
  const roundedgpa = Math.round(gpa * 100) / 100;

  document.getElementById("gpa")!.innerHTML = `Your GPA is a: ${roundedgpa}`;

  // shows save text
  document.getElementById("saved")!.innerHTML = "Saved!";
  setTimeout(saveRemove, 1000);

  // save storage
  await setData(courses);
  for (const [itr] of courses.entries()) {
    (document.getElementById(`slide${itr + 1}`) as HTMLInputElement).value = (
      document.getElementById(`cl${itr + 1}`) as HTMLInputElement
    ).value;
  }
}
window.loadgpa = loadgpa;

async function classAmount(): Promise<void> {
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
    courses.push(newCourse({ classNum: itr + 1 }));
    createCourse(itr + 1);
  }
  if (!hsmsInput.checked) {
    for (let itr = 1; itr < courses.length + 1; itr++) {
      // loops through all course classes and removes the <span id="typeId"></span> (honors dropdown)
      document.getElementById(`typeId${itr}`)!.innerHTML = "";
    }
  }
  // calculates and saves the gpa
  await loadgpa();
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
): void {
  const num = classNum;

  tempElementId = `temp${num}`;
  tempElementIdNext = `temp${num + 1}`;

  (document.getElementById(tempElementId) as HTMLInputElement).value =
    classText;
  (document.getElementById(tempElementIdNext) as HTMLInputElement).value =
    String(classNum);
}

/**
 * Not to be confused with `getStorage()`.
 */
function fromStorage(arraystorage: Course[]) {
  courses = arraystorage;
  // creates courses from array data after it is pulled from storage

  for (const course of courses) {
    createCourse(course.classNum);
    createStorageCourse(course.classNum, course.letterGrade, course.classText);
  }
  for (let itr = 0; itr < courses.length; itr++) {
    tempLGID = `cl${itr + 1}`;
    tempCTID = `cl${itr + 1}txt`;
    tempCTYID = `cltyp${itr + 1}`;

    for (const course of courses) {
      createCourse(course.classNum);
      createStorageCourse(
        course.classNum,
        course.letterGrade,
        course.classText,
      );
    }

    for (const [itr2, course] of courses.entries()) {
      tempLGID = `cl${itr2 + 1}`;
      tempCTID = `cl${itr2 + 1}txt`;
      tempCTYID = `cltyp${itr2 + 1}`;

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
 * Called on page load.
 *
 * Pulls data from storage.
 */
async function getStorage(): Promise<void> {
  const gradestorage = await getGrade();
  const arraystorage = await getData();

  if (!arraystorage) {
    await setData(true);
  }

  if (gradestorage === "true") {
    hsmsInput.checked = true;
    gradeLvl.innerHTML = high;
  } else if (gradestorage === "false") {
    hsmsInput.checked = false;
    gradeLvl.innerHTML = middle;
  }
  if (arraystorage === null) {
    // if storage doesn't exist
    await classAmount();
  } else if (arraystorage === true) {
    // if storage does exist, but is empty
    return;
  } else {
    // if storage does exist
    fromStorage(arraystorage);
    await loadgpa();
  }
  if (gradestorage === "false") {
    await hsmsSwap();
  }
}

async function updateSw(): Promise<void> {
  await registerSW({
    onRegisteredSW(swUrl, r) {
      const intervalMS = 60 * 60 * 1000;

      r &&
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setInterval(async (): Promise<void> => {
          if (r.installing !== null) {
            return;
          }

          if (Object.hasOwn(navigator, "connection") && !navigator.onLine) {
            return;
          }

          const resp = await fetch(swUrl, {
            cache: "no-store",
            headers: {
              cache: "no-store",
              "cache-control": "no-cache",
            },
          });

          if (resp.status === 200) {
            await r.update();
          }
        }, intervalMS);
    },
  })(true);
}

async function startApp(): Promise<void> {
  await updateSw();
  await getStorage();
}

window.startApp = startApp;
