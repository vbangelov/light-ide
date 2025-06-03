import type { View } from "src/types/View";

const layout: { id: string; layout: string; views: View[] } = {
  id: "chat-view",
  layout: "one-column",
  views: [
    {
      id: "chat",
      src: "/src/iframes/ChatIframe.vue",
      position: "main",
    },
  ],
};

export default layout;
