import { createSignal } from "solid-js";
import { CodeMirror } from "@solid-codemirror/codemirror";
import { CodeMirror1 } from "./CodeMirror1";
import { CodeMirror2 } from "./CodeMirror2";
import { basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

export default function App() {
  const [value, setValue] = createSignal("Hello World 🌎");
  const [showLineNumbers, setShowLineNumbers] = createSignal(true);
  const [readOnly, setReadOnly] = createSignal(false);
  const [wrapLine, setWrapLine] = createSignal(false);

  return (
    <>
      <button onClick={() => setValue("Hi")}>Set code</button>
      <button onClick={() => setValue("Hello World 🌎")}>Reset</button>

      {/* CodeMirror Example 1 */}
      <div>
        <h2>Example 1</h2>
        <CodeMirror1 value={value()} onValueChange={setValue} />
      </div>

      {/* CodeMirror Example 2 */}
      <div>
        <h2>Example 2</h2>
        <CodeMirror2
          value={value()}
          onValueChange={setValue}
          showLineNumbers={showLineNumbers()}
        />
      </div>

      <button
        onClick={() => setShowLineNumbers(showLineNumbers() ? false : true)}
      >
        Toggle Show line numbers
      </button>

      {/* CodeMirror Example 3 */}
      <div>
        <h2>Example 3</h2>
        <CodeMirror
          value={value()}
          onValueChange={setValue}
          showLineNumbers={showLineNumbers()}
          readOnly={readOnly()}
          wrapLine={wrapLine()}
          extensions={[basicSetup, python()]}
          theme={oneDark}
        />

        <button onClick={() => setReadOnly(readOnly() ? false : true)}>
          Toggle Read Only
        </button>
        <button onClick={() => setWrapLine(wrapLine() ? false : true)}>
          Toggle Wrap Line
        </button>
      </div>
    </>
  );
}
