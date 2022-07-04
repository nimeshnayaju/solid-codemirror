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

## Basic Usage

```tsx
import { CodeMirror } from "@solid-codemirror/codemirror";

export default function App() {
  return <CodeMirror />;
}
```

## Controlling the `CodeMirror` component

You can control the `CodeMirror` component through the following props. **All props are optional.**

| Prop            | Type                    | Description                                       |
| --------------- | ----------------------- | ------------------------------------------------- |
| `value`         | string                  | The initial value for the codemirror state        |
| `onValueChange` | (value: string) => void | Called when the codemirror state value is updated |
| `lineNumber`    | boolean                 | Whether to display line numbers                   |
| `wrapLine`      | boolean                 | Whether to wrap lines                             |
| `readOnly`      | boolean                 | Whether to set the editor to read-only            |
| `theme`         | Extension               | The CodeMirror theme extension                    |
| `extensions`    | Extension[]             | An array of CodeMirror extensions                 |

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

## License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
