interface ItemBase {
  id: string;
  label: string;
}

export interface Folder extends ItemBase {
  type: "folder";

  children: Set<Item>;
}

export interface File extends ItemBase {
  type: "file";
}

export type Item = File | Folder;
