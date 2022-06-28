import { createSignal } from "solid-js";
import { CodeMirror1 } from "./CodeMirror1";
import { CodeMirror2 } from "./CodeMirror2";

export default function App() {
  const [value, setValue] = createSignal("Hello World 🌎");
  const [showLineNumbers, setShowLineNumbers] = createSignal(false);

  return (
    <>
      <button onClick={() => setValue("Hi")}>Set code</button>
      <button onClick={() => setValue("Hello World 🌎")}>Reset</button>

      {/* CodeMirror Example 1 */}
      <CodeMirror1 value={value()} />

      {/* CodeMirror Example 2 */}
      <CodeMirror2 value={value()} showLineNumbers={showLineNumbers()} />
      <button
        onClick={() => setShowLineNumbers(showLineNumbers() ? false : true)}
      >
        Toggle Show line numbers
      </button>
    </>
  );
}
