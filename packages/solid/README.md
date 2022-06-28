<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-codemirror&background=tiles&project=core" alt="Core">
</p>

# @solid-codemirror/core

## Demo

https://solid-codemirror.vercel.app/

## Installation

```bash
yarn add @solid-codemirror/core
# or
npm i @solid-codemirror/core
```

## Basic Usage

```tsx
import { CodeMirrorProps, createCodeMirror } from "@solid-codemirror/core";

export default function CodeMirror(props: CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;

  createCodeMirror(props, () => ref);

  return <div ref={ref} />;
}
```

## Add Extension

```tsx
import { CodeMirrorProps, createCodeMirror } from "@solid-codemirror/core";
import { lineNumbers } from "@codemirror/view";

export default function App(props: CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;

  const { createExtension } = createCodeMirror(props, () => ref);

  createExtension(lineNumbers());

  return <div ref={ref} />;
}
```

## Reconfigure Extension

```tsx
import { CodeMirrorProps, createCodeMirror } from "@solid-codemirror/core";
import { lineNumbers } from "@codemirror/view";

export default function App(props: CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;

  const { createExtension } = createCodeMirror(props, () => ref);

  const reconfigureLineNumbers = createExtension(lineNumbers());

  return (
    <div>
      <div ref={ref} />

      {/* Buttons to show/hide line numbers */}
      <div>
        <button onClick={() => reconfigureLineNumbers([])}>
          Hide line numbers
        </button>
        <button onClick={() => reconfigureLineNumbers(lineNumbers())}>
          Show line numbers
        </button>
      </div>
    </div>
  );
}
```

## License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
