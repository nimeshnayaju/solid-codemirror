import { describe, expect, it, vi, afterEach } from "vitest";
import { screen, render } from "solid-testing-library";
import { CodeMirror } from "../src";

describe("createLineNumbers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("is default false", async () => {
    const { unmount } = render(() => <CodeMirror />);
    // TODO
    unmount();
  });

  it("can be set to true", async () => {
    const { unmount } = render(() => <CodeMirror wrapLine={true} />);
    // TODO
    unmount();
  });
});
