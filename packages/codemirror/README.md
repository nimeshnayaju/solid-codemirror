<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-codemirror&background=tiles&project=codemirror" alt="Codemirror">
</p>

# @solid-codemirror/codemirror

CodeMirror 6 component for SolidJS

## Demo

https://solid-codemirror.vercel.app/

## Installation

```bash
yarn add @solid-codemirror/codemirror
# or
npm i @solid-codemirror/codemirror
```

> **Note** The [@codemirror/state](https://github.com/codemirror/state) and [@codemirror/view](https://github.com/codemirror/state) libraries are flagged as peer dependencies and are recommeneded to be installed alongside this package.

## Known issue with `Vite`

> **Warning** You may encounter the following error if you're using Vite as your bundling tool:
>
> ```bash
> Error: Unrecognized extension value in extension set ([object Object]). This sometimes happens because multipleinstances of @codemirror/state are loaded, breaking instanceof checks.
> ```
>
> This error can be fixed by adding the following configuration option to your `vite.config.{js,ts}` file.
>
> ```typescript
> export default defineConfig({
>   // Your configuration
>   optimizeDeps: {
>     // Add both @codemirror/state and @codemirror/view to included deps for optimization
>     include: ["@codemirror/state", "@codemirror/view"],
>   },
> });
> ```

## Basic Usage

```tsx
import { CodeMirror } from "@solid-codemirror/codemirror";

export default function App() {
  return <CodeMirror />;
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

## License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
