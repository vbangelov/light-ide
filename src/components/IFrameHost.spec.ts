// IframeView.test.ts
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import IframeView from "./IFrameHost.vue";

describe("IframeView", () => {
  it("renders an iframe with the correct src", () => {
    const testSrc = "https://example.com";
    const wrapper = mount(IframeView, {
      props: {
        src: testSrc,
      },
    });

    const iframe = wrapper.find("iframe");
    expect(iframe.exists()).toBe(true);
    expect(iframe.attributes("src")).toBe(testSrc);
    expect(iframe.classes()).toContain("w-full");
    expect(iframe.classes()).toContain("h-full");
    expect(iframe.classes()).toContain("border-none");
  });
});
