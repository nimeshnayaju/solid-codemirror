<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-codemirror&background=tiles&project=%20" alt="solid-codemirror">
</p>

# solid-codemirror

A set of libraries to integrate CodeMirror to any SolidJS app. This repository contains two packages:

- [@solid-codemirror/core](https://github.com/nimeshnayaju/solid-codemirror/tree/main/packages/core)

- [@solid-codemirror/codemirror](https://github.com/nimeshnayaju/solid-codemirror/tree/main/packages/codemirror)

## Demo

https://solid-codemirror.vercel.app/

## Installation

```bash
yarn add @solid-codemirror/codemirror @codemirror/state @codemirror/view
# or
npm i @solid-codemirror/codemirror @codemirror/state @codemirror/view
```

> **Note** The [@codemirror/state](https://github.com/codemirror/state) and [@codemirror/view](https://github.com/codemirror/state) libraries are flagged as peerDependencies and are recommeneded to be installed alongside this package.

## Basic Usage

```tsx
import { CodeMirror } from "@solid-codemirror/codemirror";

export default function App() {
  return <CodeMirror />;
}
```

## Configure Line Numbers / Read Only / Line Wrapping

```tsx
import { CodeMirror } from "@solid-codemirror/codemirror";

export default function App() {
  return <CodeMirror showLineNumbers={true} readOnly={false} wrapLine={true} />;
}
```

## Configure theme

```tsx
import { CodeMirror } from "@solid-codemirror/codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

export default function App() {
  return <CodeMirror theme={oneDark} />;
}
```

## Configure Extensions

```tsx
import { CodeMirror } from "@solid-codemirror/codemirror";
import { basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

export default function App() {
  return <CodeMirror extensions={[basicSetup, python()]} />;
}
```

## Register callbacks on editor value change or editor mount

```tsx
import { CodeMirror } from "@solid-codemirror/codemirror";
import type { EditorView } from "@codemirror/view";

export default function App() {
  const onValueChange = (value: string) => {
    console.log(value);
  };

  const onEditorMount = (view: EditorView) => {
    console.log(view);
  };

  return (
    <CodeMirror onEditorMount={onEditorMount} onValueChange={onValueChange} />
  );
}
```

## Controlling the `CodeMirror` component

You can control the `CodeMirror` component through the following props. **All props are optional.**

| Prop              | Type                           | Description                                                                    |
| ----------------- | ------------------------------ | ------------------------------------------------------------------------------ |
| `value`           | `string`                       | The initial value of the editor                                                |
| `onValueChange`   | `(value: string) => void`      | Called whenever the editor code value changes                                  |
| `onEditorMount`   | `(editor: EditorView) => void` | Called when the editor first mounts, receiving the current EditorView instance |
| `showLineNumbers` | `boolean`                      | Whether to display line numbers                                                |
| `wrapLine`        | `boolean`                      | Whether to wrap lines                                                          |
| `readOnly`        | `boolean`                      | Whether to set the editor to read-only                                         |
| `theme`           | `Extension`                    | The CodeMirror theme extension to use                                          |
| `extensions`      | `Extension[]`                  | An array of CodeMirror extensions to use                                       |

For more information on the usage of the `CodeMirror` component, check out [@solid-codemirror/codemirror](https://github.com/nimeshnayaju/solid-codemirror/tree/main/packages/codemirror).
\
&nbsp;
\
&nbsp;

# Advanced usage

### Want more control over your `CodeMirror` component? Create your custom component using the `createCodeMirror` function.

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

> **Info** The `@solid-codemirror/codemirror` package is based on `@codemirror/core`. You can view the [source code](https://github.com/nimeshnayaju/solid-codemirror/tree/main/packages/codemirror) of the library here.

For more information on the usage of the `createCodeMirror` function, check out [@solid-codemirror/core](https://github.com/nimeshnayaju/solid-codemirror/tree/main/packages/core).

## License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
