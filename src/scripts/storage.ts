/** Clears class storage data. */
function clearData(): void {
  localStorage.removeItem("arraycookie");
  location.reload();
}

/** Clears all website storage data. */
function clearAll(): void {
  localStorage.removeItem("gradecookie");
  localStorage.removeItem("color");
  localStorage.removeItem("shade");
  window.clearData();
}

function setData(arraycookie: string): void {
  localStorage.setItem("arraycookie", arraycookie);
}

export { clearData, clearAll, setData };
