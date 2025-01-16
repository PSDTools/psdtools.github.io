import { createStorage, type Storage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexedb";

import type { Course } from "../data/data-types";

interface StorageData {
  arraystorage: Course[];
  gradestorage: string;
}

const storage: Storage<StorageData> = createStorage<StorageData>({
  driver: indexedDbDriver({ base: "gpa:" }),
});

const arraystorage = "arraystorage";
const gradestorage = "gradestorage";

/** Clears class storage data. */
async function clearData(): Promise<void> {
  await storage.removeItem(arraystorage);
  globalThis.location.reload();
}

/** Clears all website storage data. */
async function clearAll(): Promise<void> {
  await storage.clear();
  globalThis.location.reload();
}

/** Sets the storage data. */
async function setData(value: Course[]): Promise<void> {
  await storage.setItem(arraystorage, value);
}

/** Gets the storage data. */
async function getData(): Promise<Course[] | null> {
  return await storage.getItem(arraystorage);
}

/** Sets the grade. */
async function setGrade(value: string): Promise<void> {
  await storage.setItem(gradestorage, value);
}

/** Gets the grade. */
async function getGrade(): Promise<string | null> {
  return await storage.getItem(gradestorage);
}

export { clearAll, clearData, getData, getGrade, setData, setGrade };
