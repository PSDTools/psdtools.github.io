/**
 * The main script.
 */

import "./styles/global.css";
import { registerSW } from "virtual:pwa-register";
import { type Course, newCourse } from "./data/data-types.js";
import { getElementByIdTyped as getElementById } from "./data/utils.js";
import {
  clearAll,
  clearData,
  getData,
  getGrade,
  setData,
  setGrade,
} from "./scripts/storage.js";

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
const hsmsInput = getElementById("hsmsInput", HTMLInputElement)!;
const gradeLvl = getElementById("gradeLvl", HTMLElement)!;

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
  const classlist = getElementById("mySidenav", HTMLDivElement)?.classList;
  const w100 = "w-full";
  const w0 = "w-0";

  classlist?.add(open ? w100 : w0);
  classlist?.remove(open ? w0 : w100);
}
window.toggleNav = toggleNav;

function getTypeIds(): NodeListOf<HTMLSpanElement> {
  return document.querySelectorAll<HTMLSpanElement>('[id^="typeId"]');
}

/**
 * Swaps the High School and the Middle School.
 */
async function hsmsSwap(): Promise<void> {
  const { checked } = hsmsInput;

  if (checked) {
    gradeLvl.innerHTML = high;

    await setGrade(String(checked));
    getElementById("numOfClasses", HTMLInputElement)!.value = String(
      courses.length,
    );

    for (const element of getTypeIds()) {
      element.innerHTML = `<form>
        <select class="blacktxt" id="cltyp${element.id.slice(6)}">
          <option value="1">No-Weight</option>
          <option value="2">Honors</option>
        </select>
      </form>`;
    }
  } else {
    gradeLvl.innerHTML = middle;
    await setGrade(String(checked));

    for (const element of getTypeIds()) {
      element.innerHTML = "";
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
  getElementById(tempElementId, HTMLDivElement)!.innerHTML = `<div
      oninput="loadgpa();"
      class="pt-4 pb-4 lg:text-2xl text-lg"
    >
      <div id="input-con-div" class="">
        <input
          class="hover:scale-105 w-36 placeholder-white blacktxt"
          placeholder="Class ${num}:"
          oninput="loadgpa();"
          id="cl${num}txt"
          type="text"
          required=""
        />
        <span class="float-right" id="typeId${num}">
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
          class="hover:scale-105 slider float-right w-1/2"
          id="slide${num}"
          oninput="getElementById('cl${num}').value = getElementById('slide${num}').value;loadgpa();"
        />
        <select
          class="hover:scale-105 blacktxt float-right appearance-none"
          oninput="getElementById('slide${num}').value = getElementById('cl${num}').value;loadgpa();"
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
function saveRemove(): void {
  const element = getElementById("saved", HTMLElement);

  if (element !== undefined) {
    element.innerHTML = "";
  }
}

/**
 * Saves values to the array.
 */
async function loadgpa(): Promise<void> {
  // set vars
  let pregpa = 0;
  let courseLen = courses.length;

  tempLGID = "";
  tempCTID = "";
  tempCTYID = "";

  // save classes to array
  for (const [itr, course] of courses.entries()) {
    tempLGID = `cl${itr + 1}`;
    tempCTID = `cl${itr + 1}txt`;
    tempCTYID = `cltyp${itr + 1}`;

    course.letterGrade = Number(
      getElementById(tempLGID, HTMLSelectElement)!.value,
    );

    course.classText = getElementById(tempCTID, HTMLInputElement)!.value;
  }

  // remove N/A from addition
  for (const course of courses) {
    if (course.letterGrade === 5) {
      courseLen -= 1;
    } else {
      // adds to pregpa
      if (course.classType === "2" && hsmsInput.checked) {
        if (course.letterGrade === 0) {
          pregpa += course.letterGrade;
        } else {
          pregpa += 1 + course.letterGrade;
        }
      } else {
        pregpa += course.letterGrade;
      }
    }
  }

  // Divide.
  const gpa = pregpa / courseLen;
  // Round.
  const roundedgpa = Math.round(gpa * 100) / 100;

  getElementById("gpa", HTMLHeadingElement)!.innerHTML =
    `Your GPA is a: ${roundedgpa}`;

  // shows save text
  getElementById("saved", HTMLParagraphElement)!.innerHTML = "Saved!";
  setTimeout(saveRemove, 1000);

  // save storage
  await setData(courses);
  for (const [itr] of courses.entries()) {
    getElementById(`slide${itr + 1}`, HTMLInputElement)!.value = getElementById(
      `cl${itr + 1}`,
      HTMLSelectElement,
    )!.value;
  }
}
window.loadgpa = loadgpa;

async function classAmount(): Promise<void> {
  courses = []; // if storage don't exist, create the array

  // get textbox with number of classes
  classAmountNum = Math.abs(
    parseInt(getElementById("numOfClasses", HTMLInputElement)!.value),
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
    // loops through all course classes and removes the honors dropdowns
    for (const element of getTypeIds()) {
      element.innerHTML = "";
    }
  }

  // calculates and saves the gpa
  await loadgpa();
  // sets the gpa text to ""
  getElementById("gpa", HTMLHeadingElement)!.innerHTML = "";
}
window.classAmount = classAmount;

/**
 * Populates course object data.
 */
function createStorageCourse(classNum: number): void {
  const num = classNum;

  tempElementId = `temp${num}`;
  tempElementIdNext = `temp${num + 1}`;
}

/**
 * Not to be confused with {@link getStorage}.
 */
function fromStorage(arraystorage: Course[]): void {
  courses = arraystorage;
  // creates courses from array data after it is pulled from storage

  for (const course of courses) {
    createCourse(course.classNum);
    createStorageCourse(course.classNum);
  }
  for (const [itr] of courses.entries()) {
    tempLGID = `cl${itr + 1}`;
    tempCTID = `cl${itr + 1}txt`;
    tempCTYID = `cltyp${itr + 1}`;

    for (const course of courses) {
      createCourse(course.classNum);
      createStorageCourse(course.classNum);
    }

    for (const [itr2, course] of courses.entries()) {
      tempLGID = `cl${itr2 + 1}`;
      tempCTID = `cl${itr2 + 1}txt`;
      tempCTYID = `cltyp${itr2 + 1}`;

      getElementById(tempLGID, HTMLSelectElement)!.value = String(
        course.letterGrade,
      );
      getElementById(tempCTID, HTMLInputElement)!.value = course.classText;
      getElementById(tempCTYID, HTMLSelectElement)!.value = course.classType;
    }

    if (!hsmsInput.checked) {
      for (const element of getTypeIds()) {
        element.innerHTML = "";
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
