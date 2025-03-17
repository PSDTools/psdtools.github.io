import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { LoroDoc } from "loro-crdt";

interface Data {
  content: LoroDoc;
}

export const load: PageLoad = async ({ fetch, params }): Promise<Data> => {
  console.log("Fetching note content for path:", params.path);
  const response = await fetch(`http://localhost:5000/file/${params.path}`);

  if (!response.ok) {
    console.error("Note not found:", response.status);
    throw error(response.status, "Note not found");
  }

  const data = await response.text(); // Use `.text()` if the server returns plain text
  console.log("Note content received:", data);
  
    // Convert plain markdown to a LoroDoc instance.
    const doc = new LoroDoc();
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    doc.import(encodedData);

  return { content: doc };
};
