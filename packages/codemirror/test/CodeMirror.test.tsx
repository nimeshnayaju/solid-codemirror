import { describe, test, expect, it, vi, afterEach } from "vitest";
import { fireEvent, screen, render } from "solid-testing-library";
import { createRoot } from "solid-js";
import { CodeMirror } from "../src";

describe("createCodeMirror", () => {
  it("renders", async () => {
    const { container, unmount } = render(() => <CodeMirror />);
    expect(container.innerHTML).toMatchSnapshot();
    unmount();
  });
});
