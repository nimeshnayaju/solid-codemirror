<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-codemirror&background=tiles&project=codemirror" alt="Codemirror">
</p>

# @solid-codemirror/core

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

## Configure Line Numbers/Read Only/WrapLine/Extensions

```tsx
import { CodeMirror } from "@solid-codemirror/codemirror";
import { basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";

export default function App() {
  return (
    <CodeMirror
      value="Hello World 🌎"
      showLineNumbers={true}
      readOnly={false}
      wrapLine={true}
      extensions={[basicSetup, python()]}
    />
  );
}
```

## License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
