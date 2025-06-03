import type { View } from "src/types/View";

const layout: { id: string; layout: string; views: View[] } = {
  id: "application-view",
  layout: "two-column",
  views: [
    {
      id: "preview",
      src: "/src/iframes/ApplicationIframe.vue",
      position: "main",
    },
    {
      id: "overview",
      src: "/src/iframes/ApplicationOverviewIframe.vue",
      position: "main",
      display: false,
    },
    {
      id: "chat",
      src: "/src/iframes/ChatIframe.vue",
      position: "right",
    },
  ],
};

export default layout;
