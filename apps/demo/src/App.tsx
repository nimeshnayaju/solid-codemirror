import { createSignal } from "solid-js";
import CodeMirror from "./CodeMirror";

export default function App() {
  const [value, setValue] = createSignal("Hello World 🌎");

  return (
    <>
      <CodeMirror value={value()} />
      <button onClick={() => setValue("Hi")}>Set code</button>
      <button onClick={() => setValue("Hello World 🌎")}>Reset</button>
    </>
  );
}
