import type { LayoutLoad } from "./$types";
import type { Folder } from "./treeview.ts";

interface Data {
  root: Folder;
}

export const load: LayoutLoad = (): Data => {
  // Example file tree structure
  const folder: Folder = {
    children: new Set([
      {
        children: new Set([
          {
            children: new Set([]),
            id: "4",
            label: "Jacksonville",
            type: "folder",
          },
          { children: new Set([]), id: "6", label: "Miami", type: "folder" },
          {
            children: new Set([
              { id: "10", label: "Disney World", type: "file" },
              { id: "11", label: "Universal Studio", type: "file" },
              { id: "12", label: "Sea World", type: "file" },
            ]),
            id: "5",
            label: "Orlando",
            type: "folder",
          },
        ]),
        id: "2",
        label: "Florida",
        type: "folder",
      },
      {
        children: new Set([
          {
            children: new Set([]),
            id: "7",
            label: "San Francisco",
            type: "folder",
          },
          {
            children: new Set([]),
            id: "8",
            label: "Los Angeles",
            type: "folder",
          },
          {
            children: new Set([]),
            id: "9",
            label: "Sacramento",
            type: "folder",
          },
        ]),
        id: "3",
        label: "California",
        type: "folder",
      },
    ]),
    id: "1",
    label: "USA",
    type: "folder",
  };

  return { root: folder };
};
