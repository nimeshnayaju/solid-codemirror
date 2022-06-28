import { CodeMirrorProps, createCodeMirror } from "@solid-codemirror/core";
import { lineNumbers } from "@codemirror/view";

export function CodeMirror1(props: CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;

  const { createExtension } = createCodeMirror(props, () => ref);

  const reconfigureLineNumbers = createExtension(lineNumbers());

  return (
    <>
      <div ref={ref} {...props} />

      {/* Buttons to show/hide line numbers */}
      <div>
        <button onClick={() => reconfigureLineNumbers([])}>
          Hide line numbers
        </button>
        <button onClick={() => reconfigureLineNumbers(lineNumbers())}>
          Show line numbers
        </button>
      </div>
    </>
  );
}
