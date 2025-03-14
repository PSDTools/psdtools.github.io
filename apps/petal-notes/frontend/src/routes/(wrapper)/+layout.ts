import type { LayoutLoad } from "./$types";
import type { Folder } from "./treeview.ts";

interface Data {
  root: Folder;
}

export const load: LayoutLoad = async ({ fetch }): Promise<Data> => {
  console.log("Fetching file tree...");
  const response = await fetch("http://localhost:5000/files");
  const fileTree: string[] = (await response.json()) as string[];
  console.log("File tree received:", fileTree);
  const root: Folder = {
    id: "root",
    label: "Root",
    type: "folder",
    children: new Set(
      fileTree.map((file) => ({ id: file, label: file, type: "file" })),
    ),
  };
  console.log("Data initialized:", { root });
  return { root };
};
