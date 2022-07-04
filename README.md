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

## Configure Line Numbers / Read Only / WrapLine / Theme / Extensions

```tsx
import { CodeMirror } from "@solid-codemirror/codemirror";
import { basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

export default function App() {
  return (
    <CodeMirror
      value="Hello World 🌎"
      showLineNumbers={true}
      readOnly={false}
      wrapLine={true}
      theme={oneDark}
      extensions={[basicSetup, python()]}
    />
  );
}
```

For more information on the usage of the `CodeMirror` component, check out [@solid-codemirror/codemirror](https://github.com/nimeshnayaju/solid-codemirror/tree/main/packages/codemirror).

## Advanced usage

### Want more control over your `CodeMirror` component? Create your custom component using the `createCodeMirror` function.

```bash
yarn add @solid-codemirror/core
# or
npm i @solid-codemirror/core
```

```tsx
import { CodeMirrorProps, createCodeMirror } from "@solid-codemirror/core";
import { lineNumbers } from "@codemirror/view";

export function CustomCodeMirror(props: CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;

  const { createExtension } = createCodeMirror(props, () => ref);

  const reconfigureLineNumbers = createExtension(lineNumbers());

  return (
    <>
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
    </>
  );
}
```

For more information on the usage of the `createCodeMirror` function, check out [@solid-codemirror/core](https://github.com/nimeshnayaju/solid-codemirror/tree/main/packages/core).

## License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
