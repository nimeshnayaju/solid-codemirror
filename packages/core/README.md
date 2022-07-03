<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-codemirror&background=tiles&project=core" alt="Core">
</p>

# @solid-codemirror/core

Provides a `createCodeMirror` function that takes in a `ref` object and attaches a `CodeMirror` view to it.

## Demo

https://solid-codemirror.vercel.app/

## Installation

```bash
yarn add @solid-codemirror/core
# or
npm i @solid-codemirror/core
```

## `createCodeMirror`

Attaches a `CodeMirror` view to the specified `ref` object and returns a object with a `createExtension` method to add extension compartments to the codemirror state instance.

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

### Definition

```ts
function createCodeMirror(
  props: {
    value?: string;
    onValueChange?: (value: string) => void;
  },
  ref: Accessor<HTMLDivElement | undefined>
): {
  createExtension: (extension: Extension) => (extension: Extension) => void;
};
```

## License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
