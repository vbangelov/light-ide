import type { View } from "src/types/View";

const layout: { id: string; layout: string; views: View[] } = {
  id: "ide-view",
  layout: "one-column",
  views: [
    {
      id: "ide-editor",
      src: "/src/iframes/IdeEditorIframe.vue",
      position: "main",
    },
  ],
};

export default layout;
