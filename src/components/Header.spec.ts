import { describe, it, expect, vi } from "vitest";
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
    expect(wrapper.find("ui5-button[tooltip='Open BAS']").exists()).toBe(true);
    expect(wrapper.find("ui5-button[tooltip='Open Hybrid mode']").exists()).toBe(true);
    expect(wrapper.find("ui5-segmented-button").exists()).toBe(true);
  });

  it("hides action buttons for chat-view", () => {
    const wrapper = mount(Header, {
      props: { activeView: "chat-view" },
    });
    expect(wrapper.find("ui5-button[tooltip='Open BAS']").exists()).toBe(false);
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

  it("calls window.open with BAS URL when Open BAS button is clicked", async () => {
    (window as any).H2O_URL = "https://example.com";
    (window as any).WORKSPACE_ID = "ws-test";

    const windowOpen = vi.spyOn(window, "open").mockImplementation(() => null);

    const wrapper = mount(Header, {
      props: { activeView: "application-view" },
    });

    await wrapper.find("ui5-button[tooltip='Open BAS']").trigger("click");

    expect(windowOpen).toHaveBeenCalledWith(
      "https://example.com/index.html#ws-test?folder=/home/user/projects",
      "_blank",
    );
  });

  it("calls window.open with Hybrid URI when Open Hybrid mode button is clicked", async () => {
    (window as any).H2O_URL = "https://example.com";
    (window as any).WORKSPACE_ID = "ws-test";

    const windowOpen = vi.spyOn(window, "open").mockImplementation(() => null);

    const wrapper = mount(Header, {
      props: { activeView: "application-view" },
    });

    await wrapper.find("ui5-button[tooltip='Open Hybrid mode']").trigger("click");

    expect(windowOpen).toHaveBeenCalledWith(
      "vscode://SAPOSS.app-studio-toolkit/open?landscape=example.com&devspaceid=ws-test&folderpath=/home/user/projects",
      "_blank",
    );
  });
});
