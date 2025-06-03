import type { View } from "src/types/View";

const layout: { id: string; layout: string; views: View[] } = {
  id: "home-view",
  layout: "one-column",
  views: [
    {
      id: "home",
      src: "/src/iframes/HomeIframe.vue",
      position: "main",
    },
  ],
};

export default layout;
