/** Clears class storage data. */
function clearData(): void {
  localStorage.removeItem("arraystorage");
  location.reload();
}

/** Clears all website storage data. */
function clearAll(): void {
  localStorage.removeItem("gradestorage");
  localStorage.removeItem("color");
  localStorage.removeItem("shade");
  window.clearData();
}

function setData(arraystorage: string): void {
  localStorage.setItem("arraystorage", arraystorage);
}

export { clearData, clearAll, setData };
