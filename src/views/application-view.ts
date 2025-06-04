import type { ViewLayout } from "src/types/view";

const layout: ViewLayout = {
  id: "application-view",
  columns: 2,
  views: [
    { id: "preview", src: "src/assets/example-application-iframe.html", position: 1 },
    { id: "overview", src: "src/assets/example-application-overview-iframe.html", position: 1, display: false },
    { id: "chat", src: "src/assets/example-chat-iframe.html", position: 2 },
  ],
};

export default layout;
