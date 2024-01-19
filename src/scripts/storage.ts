const arraystorage = "arraystorage";
const gradestorage = "gradestorage";
const colorstorage = "color";
const shadestorage = "shade";

/** Clears class storage data. */
function clearData(): void {
  localStorage.removeItem(arraystorage);
  location.reload();
}

/** Clears all website storage data. */
function clearAll(): void {
  localStorage.clear();
  window.clearData();
}

/** Sets the storage data. */
function setData(value: string): void {
  localStorage.setItem(arraystorage, value);
}

/** Gets the storage data. */
function getData(): string | null {
  return localStorage.getItem(arraystorage);
}

/** Sets the grade. */
function setGrade(value: string): void {
  localStorage.setItem(gradestorage, value);
}

/** Gets the grade. */
function getGrade(): string | null {
  return localStorage.getItem(gradestorage);
}

/** Sets the theme. */
function setColor(value: string): void {
  localStorage.setItem(colorstorage, value);
}

/** Gets the theme. */
function getColor(): string | null {
  return localStorage.getItem(colorstorage);
}

/** Sets the dark/light mode. */
function setShade(value: string): void {
  localStorage.setItem(shadestorage, value);
}

/** Gets the dark/light mode. */
function getShade(): string | null {
  return localStorage.getItem(shadestorage);
}

export {
  clearData,
  clearAll,
  setData,
  getData,
  setGrade,
  getGrade,
  setColor,
  getColor,
  setShade,
  getShade,
};
