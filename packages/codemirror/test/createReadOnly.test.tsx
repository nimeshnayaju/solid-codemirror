import { describe, expect, it, vi, afterEach } from "vitest";
import { screen, render } from "solid-testing-library";
import { CodeMirror } from "../src";

describe("createReadOnly", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("is default false", async () => {
    const { unmount } = render(() => <CodeMirror />);

    const div = (await screen.findByRole("textbox")) as HTMLDivElement;
    expect(div.getAttribute("contenteditable")).toBe("true");

    unmount();
  });

  it("can be set to true", async () => {
    const { unmount } = render(() => <CodeMirror readOnly={true} />);
    const div = (await screen.findByRole("textbox")) as HTMLDivElement;
    expect(div.getAttribute("contenteditable")).toBe("false");

    unmount();
  });
});
