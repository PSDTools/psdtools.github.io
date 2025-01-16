import { createStorage, type Storage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexedb";

import type { Shade } from "./data-types.ts";
import type { ProfilesList } from "./schemas.ts";

interface StorageData {
  profiles: ProfilesList;
  shade: Shade;
}

const storage: Storage<StorageData> = createStorage({
  driver: indexedDbDriver({ base: "map:" }),
});

const profilesStorage = "profiles";
const shadeStorage = "shade";

/** Clears all website storage data. */
async function clearAll(): Promise<void> {
  await storage.clear();
  globalThis.location.reload();
}

/** Sets the storage data. */
async function setProfiles(value: ProfilesList): Promise<void> {
  await storage.setItem(profilesStorage, value);
}

/** Gets the storage data. */
async function getProfiles(): Promise<ProfilesList | null> {
  return await storage.getItem(profilesStorage);
}

/** Sets the grade. */
async function setShade(value: Shade): Promise<void> {
  await storage.setItem(shadeStorage, value);
}

/** Gets the grade. */
async function getShade(): Promise<Shade | null> {
  return await storage.getItem(shadeStorage);
}

export { clearAll, getProfiles, getShade, setProfiles, setShade };
