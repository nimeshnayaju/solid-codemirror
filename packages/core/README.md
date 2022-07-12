<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-codemirror&background=tiles&project=core" alt="Core">
</p>

# @solid-codemirror/core

Provides a `createCodeMirror` function that takes in a `ref` object and attaches a `CodeMirror` view to it.

## Demo

https://solid-codemirror.vercel.app/

## Installation

```bash
yarn add @solid-codemirror/core @codemirror/state @codemirror/view
# or
npm i @solid-codemirror/core @codemirror/state @codemirror/view
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

> **Info** Extensions in `@codemirror/core` are wrapped inside an editor [Comparment](https://codemirror.net/docs/ref/#state.Compartment). Compartments enable [dynamic reconfiguration](https://codemirror.net/examples/config/) (partially reconfigure a tree of extensions) of the editor.

## `CodeMirrorProps`

You can control the CodeMirror editor instance through the following props. **All props are optional.**

| Prop            | Type                           | Description                                                                    |
| --------------- | ------------------------------ | ------------------------------------------------------------------------------ |
| `value`         | `string`                       | The initial value of the editor                                                |
| `onValueChange` | `(value: string) => void`      | Called whenever the editor code value changes                                  |
| `onEditorMount` | `(editor: EditorView) => void` | Called when the editor first mounts, receiving the current EditorView instance |

### Definition

```ts
function createCodeMirror(
  props: {
    value?: string;
    onValueChange?: (value: string) => void;
    onEditorMount?: (editor: EditorView) => void;
  }
  ref: Accessor<HTMLDivElement | undefined>
): {
  createExtension: (extension: Extension) => (extension: Extension) => void;
};
```

## License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
