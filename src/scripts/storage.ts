import { createStorage, type Storage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexedb";
import type { Course } from "../data/data-types";

const storage: Storage = createStorage({
  driver: indexedDbDriver({ base: "app:" }),
});

const arraystorage = "arraystorage";
const gradestorage = "gradestorage";
const colorstorage = "color";
const shadestorage = "shade";

/** Clears class storage data. */
async function clearData(): Promise<void> {
  await storage.removeItem(arraystorage);
  location.reload();
}

/** Clears all website storage data. */
async function clearAll(): Promise<void> {
  await storage.clear();
  location.reload();
}

/** Sets the storage data. */
async function setData(value: Course[] | true): Promise<void> {
  await storage.setItem(arraystorage, value);
}

/** Gets the storage data. */
async function getData(): Promise<Course[] | true | null> {
  return storage.getItem(arraystorage);
}

/** Sets the grade. */
async function setGrade(value: string): Promise<void> {
  await storage.setItem(gradestorage, value);
}

/** Gets the grade. */
async function getGrade(): Promise<string | null> {
  return storage.getItem(gradestorage);
}

/** Sets the theme. */
async function setColor(value: string): Promise<void> {
  await storage.setItem(colorstorage, value);
}

/** Gets the theme. */
async function getColor(): Promise<string | null> {
  return storage.getItem(colorstorage);
}

/** Sets the dark/light mode. */
async function setShade(value: string): Promise<void> {
  await storage.setItem(shadestorage, value);
}

/** Gets the dark/light mode. */
async function getShade(): Promise<string | null> {
  return storage.getItem(shadestorage);
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
