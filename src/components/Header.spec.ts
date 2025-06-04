import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "./Header.vue";

describe("ShellbarComponent", () => {
  it('shows title as "Build" for home-view', () => {
    const wrapper = mount(Header, {
      props: { activeView: "home-view" },
    });
    expect(wrapper.find("ui5-shellbar").attributes("primary-title")).toBe("Build");
  });

  it("renders action buttons when activeView is application-view", () => {
    const wrapper = mount(Header, {
      props: { activeView: "application-view" },
    });
    expect(wrapper.find('ui5-button[tooltip="Go to IDE View"]').exists()).toBe(true);
    expect(wrapper.find("ui5-segmented-button").exists()).toBe(true);
  });

  it("hides action buttons for chat-view", () => {
    const wrapper = mount(Header, {
      props: { activeView: "chat-view" },
    });
    expect(wrapper.find('ui5-button[tooltip="Go to IDE View"]').exists()).toBe(false);
  });

  it('emits "change-view" when IDE button is clicked', async () => {
    const wrapper = mount(Header, {
      props: { activeView: "application-view" },
    });

    await wrapper.find('ui5-button[tooltip="Go to IDE View"]').trigger("click");
    expect(wrapper.emitted("change-view")).toBeTruthy();
    expect(wrapper.emitted("change-view")![0]).toEqual(["ide-view"]);
  });

  it('emits "toggle-view" when a segmented button item is clicked', async () => {
    const wrapper = mount(Header, {
      props: { activeView: "application-view" },
    });

    const items = wrapper.findAll("ui5-segmented-button-item");
    await items[0].trigger("click");
    expect(wrapper.emitted("toggle-view")).toBeTruthy();
    expect(wrapper.emitted("toggle-view")![0]).toEqual(["preview"]);
  });
});
