import type { ViewLayout } from "src/types/view";

const layout: ViewLayout = {
  id: "chat-view",
  columns: 1,
  views: [
    {
      id: "chat",
      src: "src/assets/example-chat-iframe.html",
      position: 1,
    },
  ],
};

export default layout;
