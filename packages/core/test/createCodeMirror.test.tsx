import { describe, expect, it, vi, afterEach } from "vitest";
import { fireEvent, screen, render } from "solid-testing-library";
import { createCodeMirror, CodeMirrorProps } from "../src";
import { createRoot } from "solid-js";
import { EditorView } from "@codemirror/view";

function CodeMirror(props: CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;

  createCodeMirror(props, () => ref);

  return <div ref={ref} />;
}

describe("createCodeMirror", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("handles default", () => {
    createRoot(async (dispose) => {
      let ref: HTMLDivElement | undefined;
      const { createExtension } = createCodeMirror({}, () => ref);
      expect(typeof createExtension).toBe("function");

      dispose();
    });
  });

  it("handles default value", async () => {
    const { unmount } = render(() => <CodeMirror value="test" />);

    const div = (await screen.findByRole("textbox")) as HTMLDivElement;

    expect(div.textContent).toBe("test");

    unmount();
  });

  it("can be controlled on value change", async () => {
    const onChangeMock = vi.fn().mockImplementation((code) => {});

    const { unmount } = render(() => (
      <CodeMirror onValueChange={onChangeMock} />
    ));

    const div = (await screen.findByRole("textbox")) as HTMLDivElement;

    await fireEvent.change(div, { target: { textContent: "test" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("test");

    unmount();
  });

  it("can be controlled on editor mount", async () => {
    const onEditorMountMock = vi.fn().mockImplementation((editor) => {});

    const { unmount } = render(() => (
      <CodeMirror onEditorMount={onEditorMountMock} />
    ));

    expect(onEditorMountMock).toHaveBeenCalledTimes(1);
    expect(onEditorMountMock).toHaveBeenCalledWith(expect.any(EditorView));

    unmount();
  });
});
