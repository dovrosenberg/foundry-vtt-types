// just run constructor, no tests needed

import { expectTypeOf } from "vitest";

const folderExport = new FolderExport({
  title: "title",
  content: "content",
  buttons: {},
});
expectTypeOf(folderExport).toEqualTypeOf<FolderExport>();
