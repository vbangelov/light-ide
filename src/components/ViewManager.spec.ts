import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ViewManager from "./ViewManager.vue";

vi.stubGlobal("window", Object.create(window));
window.rpc = {
  registerMethod: vi.fn(),
};

vi.mock("/src/views/chat-view.ts", () => ({
  default: {
    id: "chat-view",
    columns: 1,
    views: [
      {
        id: "chat",
        src: "src/assets/example-chat-iframe.html",
        position: 1,
      },
    ],
  },
}));

describe("ViewManager.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(async () => {
    wrapper = mount(ViewManager, {
      props: {
        activeView: "chat-view",
        toggleView: "",
      },
      global: {
        stubs: { IFrameHost: true },
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 100)); // wait for async load
  });

  it("applies correct column class for one-column layout", () => {
    expect(wrapper.classes()).toContain("grid-cols-1");
  });
});
